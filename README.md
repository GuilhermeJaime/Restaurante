<div align="center">

# Kwanza Grill

**Sabores de Angola, apresentados de uma nova forma.**

Website responsivo para um restaurante de cozinha angolana contemporânea em Luanda,
feito apenas com HTML, CSS e JavaScript, sem frameworks nem build.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsivo](https://img.shields.io/badge/Design-Responsivo-c88a3d?style=for-the-badge)

[**Ver demonstração**](https://o-teu-utilizador.github.io/kwanza-grill/) ·
[Reportar um problema](https://github.com/o-teu-utilizador/kwanza-grill/issues)

</div>

<!--
  Depois de guardares uma captura de ecrã em docs/preview.png,
  remove as marcas de comentário desta secção:

<p align="center">
  <img src="docs/preview.png" alt="Pré-visualização do site Kwanza Grill" width="900" />
</p>
-->

---

## Sobre o projeto

O Kwanza Grill é uma página única (*one-page*) que apresenta o restaurante, a carta, o espaço e permite fazer reservas. O foco está num visual editorial e acolhedor: tipografia serifada, tons de creme, dourado, ferrugem e verde-escuro, inspirados na paleta da cozinha angolana.

## Funcionalidades

- **Totalmente responsivo**: desktop, tablet e telemóvel, com menu em ecrã inteiro no mobile.
- **Navbar inteligente**: fixa no topo, ganha fundo com desfoque ao fazer scroll e destaca a secção atual.
- **Carta com filtros**: Todos, Entradas, Principais e Sobremesas, com animação ao trocar de categoria.
- **Formulário de reserva com validação**:
  - telefone válido;
  - datas a partir de hoje;
  - horário de atendimento (11:00 – 22:30);
  - máximo de 8 pessoas por reserva online;
  - erros em tempo real e resumo da reserva no fim.
- **Animações subtis**: entrada do hero, elementos que aparecem ao fazer scroll, zoom nas fotos dos pratos.
- **Acessível**: link para saltar o menu, foco visível, atributos ARIA e respeito pela preferência `prefers-reduced-motion`.
- **Leve**: sem dependências, imagens com carregamento lento (*lazy loading*).

## Estrutura

```
kwanza-grill/
├── index.html    # Estrutura e conteúdo da página
├── style.css     # Estilos, layout responsivo e animações
├── script.js     # Menu mobile, filtros, scroll, validação do formulário
└── README.md
```

## Como executar

Não é preciso instalar nada.

```bash
# 1. Clonar o repositório
git clone https://github.com/o-teu-utilizador/kwanza-grill.git
cd kwanza-grill

# 2. Abrir no browser (ou fazer duplo clique em index.html)
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Se preferires um servidor local:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Publicar no GitHub Pages

1. Faz *push* do projeto para o GitHub.
2. Vai a **Settings → Pages**.
3. Em **Source**, escolhe **Deploy from a branch**, seleciona a branch `main` e a pasta `/ (root)`.
4. Guarda. Passado um minuto, o site fica disponível em
   `https://o-teu-utilizador.github.io/kwanza-grill/`.

## Personalização

| O que mudar | Onde |
| --- | --- |
| Cores e fontes | Variáveis `:root` no início de `style.css` (`--gold`, `--rust`, `--green`, `--serif`, `--sans`) |
| Pratos e preços | Cartões `.food-card` em `index.html` (secção `#menu`) |
| Telefone, email e morada | Secções `#reservar`, `#contacto` e o rodapé em `index.html` |
| Horário de atendimento | Texto em `index.html` e regra `time` em `script.js` |
| Limite de pessoas | Atributo `max` do campo `guests` e regra `guests` em `script.js` |

> O telefone (`+244 9XX XXX XXX`) e o email (`ola@kwanzagrill.ao`) são fictícios. Substitui-os pelos dados reais.

## Próximos passos

- [ ] Enviar as reservas por WhatsApp, email ou API
- [ ] Mapa real (Google Maps ou OpenStreetMap)
- [ ] Versão em inglês
- [ ] Imagens próprias do restaurante

## Créditos

- Fotografias: [Unsplash](https://unsplash.com)
- Tipografia: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) e [Inter](https://fonts.google.com/specimen/Inter), via Google Fonts
- Design original criado no Figma Make e convertido para HTML, CSS e JavaScript

## Licença

Distribuído sob a licença MIT. Consulta o ficheiro `LICENSE` para mais informações.
