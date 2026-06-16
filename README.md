# Amifec Alimentos — Site Institucional

Site institucional da **Amifec Alimentos**, indústria brasileira de derivados de mandioca fundada em 2005, com sede em Nova Londrina (PR) e filiais em Cidade Gaúcha e Maria Helena.

> *"Qualidade que se põe à mesa, desde 2005."*

---

## 📋 Sobre o projeto

Página única (single-page) responsiva, em HTML5 + CSS3 + JavaScript puro (sem frameworks), apresentando:

- **Hero** com carrossel de imagens e efeito parallax
- **História** da empresa e fundadores
- **Produtos** (polvilho, fécula, amidos, mix para pão de queijo, etc.)
- **Filiais** (Nova Londrina, Cidade Gaúcha, Maria Helena)
- **Processo de produção** ilustrado passo a passo
- **Mercado, clientes e exportação**
- **Sustentabilidade e meio ambiente**
- **FAQ, formulário de contato e jogo "Desafio Amifec"**
- **Modo escuro**, animações de scroll, preloader

---

## 🗂️ Estrutura

```
amifec-site/
├── index.html      # Estrutura e conteúdo
├── style.css       # Estilos e design system
├── script.js       # Interações (preloader, menu, parallax, FAQ, jogo)
├── README.md       # Este arquivo
└── (imagens)       # .webp / .png / .jpeg referenciados no HTML
```

### Imagens esperadas na raiz

- `Logo-da-Amifec-1-1024x810.png`, `logo amifec.jfif`, `ami.jfif`
- Hero: `mandioca.webp`, `farinha.jpeg`, `Bolo-de-tapioca.webp`, `pão de queijoooo 2.0.jpeg`, `Polvilhoo.Capa.png`, `tapioca.jpeg`, `polvilho (pão de queijo).jpg`
- Fundadores: `Nossos-Fundadores-01.png`
- Filiais: `nova londrina.webp`, `cidade gaúcha.webp`, `maria helena.webp`
- Processo: `separacao.webp`, `lavamento.webp`, `maquinas.webp`, `armazenamento.webp`
- Produtos: `FECULA-1-KG.png`, `POLVILHO-DOCE-1-KG.png`, `POLVILHO-AZEDO-1-KG.png`, `FARINHA-BRANCA-1-KG (1).png`, `MIX-PARA-PAO-DE-QUEIJO-1-KG.png`, `Tapioca.png`

---

## 🚀 Como executar

Por ser um site estático, basta abrir `index.html` no navegador. Para evitar problemas de CORS com fontes e ícones, recomenda-se servir via servidor local:

```bash
# Opção 1 — Python
python3 -m http.server 8080

# Opção 2 — Node
npx serve .

# Opção 3 — PHP
php -S localhost:8080
```

Acesse: <http://localhost:8080>

---

## 🎨 Design system

Definido em `:root` no `style.css`:

- **Cores:** verde principal `#2e7d32`, dourado `#c9a227`, vermelho `#c62828`
- **Fontes:** Plus Jakarta Sans (UI) + Lora (serif para destaques)
- **Radius / sombras / transições** padronizados via CSS variables
- **Modo escuro** ativado pela classe `body.dark`

---

## 🖼️ Ajustes de imagens (esta versão)

Adicionados ao final do `style.css` para garantir que as imagens **caibam** corretamente sem corte ou deformação:

- **Fundadores** — `object-fit: contain` com fundo bege suave (retrato exibido inteiro, sem cortar rostos)
- **Processo de produção** — `aspect-ratio: 16/10` consistente em todos os passos
- **Galeria/filiais** — `aspect-ratio: 4/3` para uniformidade
- **Produtos** — `object-fit: contain` para que as embalagens apareçam por completo

---

## 📦 Dependências externas (CDN)

- [Google Fonts](https://fonts.google.com) — Plus Jakarta Sans, Lora
- [Lucide Icons](https://lucide.dev) — ícones SVG

---

## 📞 Contato

**Amifec Alimentos**
Rod. PR 182, Km 03 — Nova Londrina/PR — CEP 87860-000
📞 +55 (44) 3432-1080 · ✉️ amifec@amifec.com.br
🌐 <https://www.amifec.com.br>

---

© Amifec Alimentos — Todos os direitos reservados.
