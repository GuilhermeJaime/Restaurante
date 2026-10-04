(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero: entrada ---------- */
  const hero = $(".hero");
  requestAnimationFrame(() => hero.classList.add("is-ready"));

  /* ---------- Navbar: fundo ao fazer scroll ---------- */
  const navbar = $(".navbar");
  const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const toggle = $(".menu-toggle");
  const mobileMenu = $(".mobile-menu");

  function setMenu(open) {
    toggle.classList.toggle("is-open", open);
    mobileMenu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("no-scroll", open);
  }

  toggle.addEventListener("click", () => setMenu(!toggle.classList.contains("is-open")));
  $$("a", mobileMenu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  matchMedia("(min-width: 761px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  /* ---------- Link ativo conforme a secção visível ---------- */
  const navLinks = $$(".navbar__links a");
  const sections = $$("main section[id]");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.removeAttribute("aria-current"));
      const link = navLinks.find((a) => a.getAttribute("href") === `#${entry.target.id}`);
      if (link) link.setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => spy.observe(s));

  /* ---------- Revelar elementos ao entrar no ecrã ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el, i) => {
      // pequeno desfasamento entre cartões da mesma linha
      if (el.classList.contains("food-card")) el.style.transitionDelay = `${(i % 3) * 80}ms`;
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Filtros do menu ---------- */
  const filterBtns = $$(".filters button");
  const cards = $$(".food-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      cards.forEach((card) => {
        const show = filter === "Todos" || card.dataset.category === filter;
        card.hidden = !show;
        card.classList.remove("is-entering");
        if (show) {
          card.style.transitionDelay = "0ms";
          card.classList.add("is-visible");
          void card.offsetWidth; // reinicia a animação
          card.classList.add("is-entering");
        }
      });
    });
  });

  /* ---------- Imagens com falha: fundo neutro em vez de ícone quebrado ---------- */
  $$("img").forEach((img) => {
    img.addEventListener("error", () => { img.style.visibility = "hidden"; }, { once: true });
  });

  /* ---------- Formulário de reserva ---------- */
  const form = $("#reservation-form");
  const success = $("#reservation-success");
  const summary = $("#reservation-summary");
  const dateInput = form.elements.date;

  const pad = (n) => String(n).padStart(2, "0");
  const now = new Date();
  dateInput.min = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const rules = {
    name: (v) => (v.trim().length < 2 ? "Indique o seu nome." : ""),
    phone: (v) => (/^\+?[\d\s]{9,16}$/.test(v.trim()) ? "" : "Indique um telefone válido."),
    date: (v) => {
      if (!v) return "Escolha uma data.";
      return v < dateInput.min ? "Escolha uma data a partir de hoje." : "";
    },
    time: (v) => {
      if (!v) return "Escolha uma hora.";
      return v < "11:00" || v > "22:30" ? "Atendemos entre as 11:00 e as 22:30." : "";
    },
    guests: (v) => {
      const n = Number(v);
      if (!v) return "Indique o número de pessoas.";
      if (!Number.isInteger(n) || n < 1) return "Mínimo de 1 pessoa.";
      return n > 8 ? "Para mais de 8 pessoas, ligue-nos." : "";
    },
  };

  function setError(input, message) {
    const field = input.closest(".field");
    field.classList.toggle("field--error", !!message);
    field.querySelector("small").textContent = message;
    input.setAttribute("aria-invalid", String(!!message));
  }

  function validate(input) {
    const message = rules[input.name](input.value);
    setError(input, message);
    return !message;
  }

  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => validate(input));
    input.addEventListener("input", () => {
      if (input.closest(".field--error")) validate(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = Object.keys(rules).map((n) => form.elements[n]);
    const results = inputs.map(validate);
    const firstInvalid = inputs[results.indexOf(false)];
    if (firstInvalid) return firstInvalid.focus();

    const [y, m, d] = form.elements.date.value.split("-");
    const guests = Number(form.elements.guests.value);
    summary.innerHTML = "";
    [
      ["Nome", form.elements.name.value.trim()],
      ["Data", `${d}/${m}/${y}`],
      ["Hora", form.elements.time.value],
      ["Pessoas", `${guests} ${guests === 1 ? "pessoa" : "pessoas"}`],
    ].forEach(([label, value]) => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = label;
      dd.textContent = value; // textContent evita injeção de HTML
      summary.append(dt, dd);
    });

    form.hidden = true;
    success.hidden = false;
  });

  $("#new-reservation").addEventListener("click", () => {
    form.reset();
    $$(".field", form).forEach((f) => {
      f.classList.remove("field--error");
      f.querySelector("small").textContent = "";
    });
    success.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });

  /* ---------- Rodapé: ano atual ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
