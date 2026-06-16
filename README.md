# Amifec Alimentos — Site Institucional

Site institucional da **Amifec Alimentos**, indústria brasileira de alimentos sediada em Nova Londrina/PR, fundada em 2005. Apresenta a empresa, seus produtos (polvilho azedo, mistura para pão de queijo, fécula de mandioca e amido de milho), história, valores, filiais e canais de contato.

> "Qualidade que se põe à mesa, desde 2005 — do Paraná para o Brasil e para o mundo."

---

## 🌐 Sobre o projeto

Site estático (HTML + CSS + JS puro), responsivo, com foco em performance, SEO e identidade visual da marca. Inclui também um mini-game institucional ("Desafio Amifec").

- **Idioma:** Português (Brasil)
- **Tipo:** Landing page institucional single-page
- **Domínio:** [www.amifec.com.br](https://www.amifec.com.br)

---

## 📁 Estrutura de arquivos

```
.
├── index.html            # Estrutura e conteúdo do site
├── style.css             # Estilos (design system, responsivo, dark mode)
├── script.js             # Interações, animações e jogo "Desafio Amifec"
├── ami.jfif              # Imagem usada em Open Graph / Twitter Card
└── logo amifec.jfif      # Logotipo / favicon
```

---

## ✨ Funcionalidades

- 🎨 **Design system completo** — paleta institucional (verde, dourado), tipografia (Plus Jakarta Sans + Lora), sombras, gradientes e radius padronizados via CSS variables
- 🌙 **Modo escuro** (dark mode)
- ⚡ **Preloader** animado
- 🎯 **Parallax** sutil no hero (scroll + mouse)
- 👁️ **Scroll reveal** com efeito stagger nos grids
- 📱 **Menu mobile** responsivo
- ❓ **FAQ** interativo (accordion)
- 📩 **Formulário de contato**
- 🎮 **Jogo "Desafio Amifec"** — minigame institucional integrado
- 🔍 **SEO otimizado** — meta tags, Open Graph, Twitter Cards, JSON-LD (Schema.org Organization)
- ♿ **Acessibilidade** — respeita `prefers-reduced-motion`
- 🎨 **Ícones** via [Lucide](https://lucide.dev/)

---

## 🎨 Paleta de cores

| Token             | Cor       |
|-------------------|-----------|
| Verde principal   | `#2e7d32` |
| Verde escuro      | `#1b5e20` |
| Verde claro       | `#66bb6a` |
| Dourado           | `#c9a227` |
| Laranja           | `#f57c00` |
| Vermelho          | `#c62828` |

---

## 🚀 Como rodar localmente

Por se tratar de um site 100% estático, basta abrir o `index.html` no navegador. Para evitar problemas com caminhos relativos e fontes/CDNs, recomenda-se servir via um servidor local:

```bash
# Opção 1: Python
python3 -m http.server 8000

# Opção 2: Node (npx)
npx serve .

# Opção 3: PHP
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

---

## 🌍 Deploy

Como é estático, pode ser hospedado em qualquer serviço:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Hospedagem tradicional (FTP)

Basta enviar todos os arquivos da raiz para o servidor.

---

## 📞 Contato

**Amifec Alimentos**
📍 Rod. PR 182, Km 03 — Nova Londrina/PR — CEP 87860-000
📞 +55 (44) 3432-1080
✉️ amifec@amifec.com.br
🌐 [www.amifec.com.br](https://www.amifec.com.br)

---

© 2005–2025 Amifec Alimentos. Todos os direitos reservados.
