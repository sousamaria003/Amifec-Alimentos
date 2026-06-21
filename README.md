# Amifec Alimentos — Site Institucional

Arquivos estáticos do site institucional da **Amifec Alimentos** (HTML, CSS e JavaScript).

---

## 📦 Conteúdo do ZIP

```
amifec-site/
├── index.html   # Estrutura e conteúdo do site
├── style.css    # Estilos completos, responsivos e modo escuro
└── script.js    # Interatividade: menu, scroll, carrossel, FAQ, etc.
```

---

## 🚀 Como usar

1. Extraia o ZIP.
2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Para publicar online, envie os três arquivos para o seu servidor de hospedagem estática (ex: Vercel, Netlify, GitHub Pages, cPanel, etc.).

> **Nota:** o site utiliza imagens e fontes externas carregadas via CDN. Certifique-se de que os ativos locais (logos, fotos de produtos, etc.) estejam na mesma pasta que o `index.html` caso deseje hospedar tudo junto.

---

## 🖼️ Ajustes recentes

### 1. Seção "🌱 Estrutura e Meio Ambiente"
- O vídeo foi movido para **abaixo do texto**, ocupando a largura centralizada da seção.
- Está responsivo para todos os tamanhos de tela (desktop, tablet e mobile), utilizando `clamp()` para altura fluida.

### 2. Seção "Linha de Produtos Amifec"
- As imagens dos produtos foram ajustadas para se adaptar corretamente em todos os dispositivos.
- Utilizado `object-fit: contain` e proporções responsivas (`4:3` em desktop/tablet e `1:1` em telas pequenas).
- Centralização e padding interno garantem que as imagens não fiquem cortadas ou distorcidas.

---

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (variáveis, flexbox, grid, media queries, animações)
- JavaScript vanilla
- Lucide Icons (CDN)
- Chart.js (CDN)

---

## 📱 Responsividade

O layout se adapta aos principais breakpoints:
- **Desktop:** telas acixo de 1024px
- **Tablet:** até 768px
- **Mobile:** até 480px

---

## ✉️ Contato

Amifec Alimentos  
Site: https://www.amifec.com.br  
E-mail: amifec@amifec.com.br  
Telefone: +55 44 3301-5533
