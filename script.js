/* ============================================
   AMIFEC ALIMENTOS - SCRIPT PRINCIPAL
   Preloader, menu, scroll, FAQ, formulário,
   animações e JOGO Desafio Amifec (completo)
   ============================================ */

// ===== PRELOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1500);
});

// ===== LUCIDE ICONS (renderiza assim que disponível) =====
function renderLucide() {
    if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
    } else {
        setTimeout(renderLucide, 100);
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderLucide);
} else {
    renderLucide();
}

// ===== CURSOR CUSTOMIZADO removido =====

// ===== PARALLAX NO HERO =====
(function parallaxHero() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const heroVisual = document.querySelector('.hero-visual');
    const heroContent = document.querySelector('.hero-content');
    const floats = document.querySelectorAll('.floating-food');
    if (!heroVisual) return;

    // Parallax no scroll
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > window.innerHeight) return;
        if (heroVisual) heroVisual.style.transform = `translateY(${y * 0.15}px)`;
    }, { passive: true });

    // Parallax no movimento do mouse (sutil)
    const hero = document.querySelector('.hero');
    if (!hero) return;
    hero.addEventListener('mousemove', (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        floats.forEach((f, i) => {
            const intensidade = 12 + (i * 3);
            f.style.transform = `translate(${dx * intensidade}px, ${dy * intensidade}px)`;
        });
    });
    hero.addEventListener('mouseleave', () => {
        floats.forEach(f => f.style.transform = '');
    });
})();

// ===== SCROLL REVEAL / STAGGER =====
(function scrollReveal() {
    // Marca automaticamente todos os grids principais como stagger
    const seletoresStagger = [
        '.mvv-grid', '.produtos-grid', '.dept-grid', '.filiais-grid',
        '.diferenciais-grid', '.cases-grid', '.impacto-grid', '.acoes-grid',
        '.sumario-grid', '.depoimentos-grid', '.swot-grid', '.pdca-ciclo',
        '.visao-timeline', '.visao-metas', '.faturamento-cards', '.mercado-stats',
        '.sustenta-numeros', '.clientes-logos', '.dre-graficos', '.matriz-blocos'
    ];
    seletoresStagger.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('reveal-stagger'));
    });

    // Marca section-titles, subtitles, dre-wrapper etc. com reveal simples
    const seletoresSimples = [
        '.section-title', '.section-subtitle', '.section-tag',
        '.dre-wrapper', '.matriz-detalhes', '.conclusao-box',
        '.detalhe-content', '.admin-bloco', '.timeline-item',
        '.faq-item', '.contato-grid', '.cobertura-stat'
    ];
    seletoresSimples.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
    });

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => obs.observe(el));
})();

// ===== ANO ATUAL NO RODAPÉ =====
document.getElementById('ano').textContent = new Date().getFullYear();

// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Fecha o menu mobile ao clicar em qualquer link (mas não nos toggles de dropdown)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
        // fecha todos dropdowns também
        document.querySelectorAll('.nav-dropdown.open').forEach(d => {
            d.classList.remove('open');
            const btn = d.querySelector('.nav-dropdown-toggle');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    });
});

// ===== DROPDOWNS DO NAVBAR =====
(function navDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    if (!dropdowns.length) return;

    dropdowns.forEach(dd => {
        const btn = dd.querySelector('.nav-dropdown-toggle');
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const jaAberto = dd.classList.contains('open');
            // fecha todos antes
            dropdowns.forEach(d => {
                d.classList.remove('open');
                const b = d.querySelector('.nav-dropdown-toggle');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
            if (!jaAberto) {
                dd.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Hover no desktop também abre (com delay para não ser irritante)
    if (matchMedia('(hover: hover)').matches && window.innerWidth >= 900) {
        let hoverTimeout;
        dropdowns.forEach(dd => {
            dd.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                dropdowns.forEach(d => {
                    if (d !== dd) d.classList.remove('open');
                });
                dd.classList.add('open');
                const btn = dd.querySelector('.nav-dropdown-toggle');
                if (btn) btn.setAttribute('aria-expanded', 'true');
            });
            dd.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    dd.classList.remove('open');
                    const btn = dd.querySelector('.nav-dropdown-toggle');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                }, 180);
            });
        });
    }

    // Click-outside fecha
    document.addEventListener('click', () => {
        dropdowns.forEach(d => {
            d.classList.remove('open');
            const b = d.querySelector('.nav-dropdown-toggle');
            if (b) b.setAttribute('aria-expanded', 'false');
        });
    });
    // ESC fecha
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdowns.forEach(d => {
                d.classList.remove('open');
                const b = d.querySelector('.nav-dropdown-toggle');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
        }
    });
})();

// ===== SCROLL SPY (active state no menu conforme a seção visível) =====
(function scrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navAnchors.length) return;

    // Mapeia href → elemento âncora
    const mapa = new Map();
    navAnchors.forEach(a => mapa.set(a.getAttribute('href').replace('#',''), a));

    // Quais dropdowns contêm cada link
    const dropdownDe = new Map();
    document.querySelectorAll('.nav-dropdown').forEach(dd => {
        dd.querySelectorAll('a[href^="#"]').forEach(a => {
            dropdownDe.set(a.getAttribute('href').replace('#',''), dd.querySelector('.nav-dropdown-toggle'));
        });
    });

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting && e.intersectionRatio > 0.25) {
                // Remove active de todos
                navAnchors.forEach(a => a.classList.remove('active'));
                document.querySelectorAll('.nav-dropdown-toggle.active')
                    .forEach(t => t.classList.remove('active'));
                // Adiciona ao link da seção atual
                const link = mapa.get(e.target.id);
                if (link) link.classList.add('active');
                // E ao toggle do dropdown pai (se houver)
                const toggle = dropdownDe.get(e.target.id);
                if (toggle) toggle.classList.add('active');
            }
        });
    }, { threshold: [0.25, 0.5], rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(s => obs.observe(s));
})();

// ===== HEADER + BARRA DE PROGRESSO + BOTÃO TOPO =====
const header = document.getElementById('header');
const scrollProgress = document.getElementById('scrollProgress');
const btnTopo = document.getElementById('btnTopo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    const altura = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = ((window.scrollY / altura) * 100) + '%';

    if (window.scrollY > 500) btnTopo.classList.add('visible');
    else btnTopo.classList.remove('visible');
});

btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== TOGGLE DE TEMA (CLARO/ESCURO) =====
const themeToggle = document.getElementById('themeToggle');
const temaSalvo = localStorage.getItem('amifecTema');
if (temaSalvo === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const escuro = document.body.classList.contains('dark');
    themeToggle.textContent = escuro ? '☀️' : '🌙';
    localStorage.setItem('amifecTema', escuro ? 'dark' : 'light');
});

// ===== CONTADORES ANIMADOS =====
function animarContador(el) {
    const alvo = parseInt(el.dataset.count);
    const duracao = 2000;
    const inicio = performance.now();
    function passo(agora) {
        const progresso = Math.min((agora - inicio) / duracao, 1);
        const valor = Math.floor(progresso * alvo);
        el.textContent = valor + '+';
        if (progresso < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
}
const obsContador = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animarContador(e.target);
            obsContador.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => obsContador.observe(el));


// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-pergunta').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const aberto = item.classList.contains('aberto');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('aberto'));
        if (!aberto) item.classList.add('aberto');
    });
});

// ===== FORMULÁRIO DE CONTATO =====
const contatoForm = document.getElementById('contatoForm');
if (contatoForm) {
    contatoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Mensagem enviada com sucesso!\n\nEm breve nossa equipe entrará em contato.\n\n(Demonstração - trabalho escolar.)');
        contatoForm.reset();
    });
}

// ===== ANIMAÇÃO AO SCROLLAR =====
const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(30px)';
    sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observador.observe(sec);
});

/* ============================================
   ============ JOGO: DESAFIO AMIFEC ==========
   ============================================
   - 3 níveis de dificuldade
   - Sistema de vidas
   - Combos com multiplicador
   - Power-ups: dourado, tempo extra, vida
   - Itens perigosos descontam vida/pontos
   - Sons via Web Audio API
   - Recorde por dificuldade (localStorage)
   - Nível aumenta com o tempo
*/

// Elementos do jogo
const btnIniciar = document.getElementById('btnIniciar');
const btnPause = document.getElementById('btnPause');
const areaJogo = document.getElementById('areaJogo');
const jogoOverlay = document.getElementById('jogoOverlay');
const pontosEl = document.getElementById('pontos');
const tempoEl = document.getElementById('tempo');
const vidasEl = document.getElementById('vidas');
const comboEl = document.getElementById('combo');
const nivelEl = document.getElementById('nivel');
const recordeEl = document.getElementById('recorde');
const somToggle = document.getElementById('somToggle');

// Listas de itens
const alimentos = ['🍎','🍞','🥕','🍅','🥦','🧀','🥩','🍇','🍌','🥬',
                   '🍓','🥚','🌽','🍊','🥒','🍐','🥝','🍆','🥑','🍑'];
const errados = ['💣','🦠','🗑️','☠️','🚫','🤢'];

// Configurações por dificuldade
const DIFICULDADES = {
    facil:   { tempo: 60, spawn: 900, vida: 4, errChance: 0.15, powerChance: 0.20, nome: 'Fácil' },
    medio:   { tempo: 45, spawn: 700, vida: 3, errChance: 0.25, powerChance: 0.15, nome: 'Médio' },
    dificil: { tempo: 30, spawn: 500, vida: 2, errChance: 0.35, powerChance: 0.10, nome: 'Difícil' }
};

// Estado do jogo
let dificuldadeAtual = 'medio';
let pontos = 0, tempo = 0, vidas = 0, combo = 0, comboMax = 0, nivel = 1;
let acertos = 0, erros = 0;
let intervaloTempo, intervaloItens;
let jogoAtivo = false, pausado = false;
let duploAtivo = false, congeladoAtivo = false;
let timeoutDuplo = null, timeoutCongelar = null;

// ===== SISTEMA DE SOM (Web Audio API) =====
let audioCtx = null;
function tocarSom(freq, duracao = 0.15, tipo = 'sine', volume = 0.15) {
    if (!somToggle.checked) return;
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = tipo;
        osc.frequency.value = freq;
        gain.gain.value = volume;
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duracao);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duracao);
    } catch (e) { /* ignora */ }
}

const sons = {
    acerto: () => tocarSom(800, 0.1, 'sine'),
    bonus:  () => { tocarSom(600, 0.1); setTimeout(() => tocarSom(900, 0.15), 80); setTimeout(() => tocarSom(1200, 0.2), 160); },
    erro:   () => tocarSom(150, 0.3, 'sawtooth', 0.2),
    vida:   () => { tocarSom(500, 0.1); setTimeout(() => tocarSom(700, 0.1), 100); },
    fim:    () => { tocarSom(400, 0.2); setTimeout(() => tocarSom(300, 0.3), 200); setTimeout(() => tocarSom(200, 0.4), 500); },
    inicio: () => { tocarSom(600, 0.1); setTimeout(() => tocarSom(800, 0.15), 100); },
    combo:  () => tocarSom(1000 + combo * 100, 0.15, 'square', 0.1)
};

// ===== SELEÇÃO DE DIFICULDADE =====
document.querySelectorAll('.btn-dif').forEach(btn => {
    if (btn.id === 'btnPause') return;
    btn.addEventListener('click', () => {
        if (jogoAtivo) return;
        document.querySelectorAll('.btn-dif').forEach(b => {
            if (b.id !== 'btnPause') b.classList.remove('active');
        });
        btn.classList.add('active');
        dificuldadeAtual = btn.dataset.dif;
        atualizarRecorde();
    });
});

function atualizarRecorde() {
    const rec = localStorage.getItem(`recordeAmifec_${dificuldadeAtual}`) || 0;
    recordeEl.textContent = rec;
}
atualizarRecorde();

// ===== SISTEMA DE CONQUISTAS =====
const CONQUISTAS = {
    primeiroAcerto:  { nome: 'Primeiro Acerto!', icone: '🎯' },
    combo10:         { nome: 'Combo Mestre x10', icone: '🔥' },
    combo20:         { nome: 'Imparável! x20',  icone: '💥' },
    pontos100:       { nome: 'Centena',          icone: '💯' },
    pontos500:       { nome: '500 Pontos!',      icone: '🏅' },
    pontos1000:      { nome: 'Milionário Amifec', icone: '👑' },
    semErrar:        { nome: 'Perfeição',        icone: '✨' },
    apanhouDourado:  { nome: 'Estrela!',         icone: '⭐' },
    matouBoss:       { nome: 'Caçador de Boss',  icone: '👾' },
    nivel5:          { nome: 'Nível 5 Alcançado', icone: '🚀' }
};
let conquistasGanhas = new Set();

function ganharConquista(id) {
    if (conquistasGanhas.has(id)) return;
    conquistasGanhas.add(id);
    const c = CONQUISTAS[id];
    const toast = document.createElement('div');
    toast.className = 'conquista-toast';
    toast.innerHTML = `<span>${c.icone}</span> ${c.nome}`;
    areaJogo.appendChild(toast);
    sons.bonus();
    setTimeout(() => toast.remove(), 3000);
}

// ===== PARTÍCULAS NO CLIQUE =====
function explosaoParticulas(x, y, cor) {
    const cores = cor === 'positivo' ? ['#4caf50', '#8bc34a', '#cddc39'] :
                  cor === 'bonus' ? ['#ffc107', '#ff9800', '#ffeb3b'] :
                  ['#f44336', '#e91e63', '#ff5722'];
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'particula-clique';
        p.style.background = cores[Math.floor(Math.random() * cores.length)];
        p.style.left = (x + 30) + 'px';
        p.style.top = (y + 30) + 'px';
        const ang = (Math.PI * 2 * i) / 12;
        const dist = 40 + Math.random() * 40;
        const dx = Math.cos(ang) * dist;
        const dy = Math.sin(ang) * dist;
        p.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px,${dy}px) scale(0)`, opacity: 0 }
        ], { duration: 600, easing: 'cubic-bezier(0,.7,.3,1)' });
        areaJogo.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}

// ===== TOAST DE NÍVEL =====
function mostrarNivelToast(n) {
    const t = document.createElement('div');
    t.className = 'nivel-toast';
    t.innerHTML = `<strong>NÍVEL ${n}</strong><span>O jogo ficou mais rápido!</span>`;
    areaJogo.appendChild(t);
    sons.combo();
    setTimeout(() => t.remove(), 1800);
}

// ===== ATIVAR POWER-UP TEMPORÁRIO =====
function ativarPowerup(tipo, duracao) {
    const overlay = document.createElement('div');
    overlay.className = 'powerup-ativo powerup-' + tipo;
    overlay.innerHTML = tipo === 'congelar' ? '🧊 CONGELADO' : '✨ PONTOS x2';
    areaJogo.appendChild(overlay);

    if (tipo === 'congelar') {
        congeladoAtivo = true;
        areaJogo.classList.add('area-congelada');
        clearTimeout(timeoutCongelar);
        timeoutCongelar = setTimeout(() => {
            congeladoAtivo = false;
            areaJogo.classList.remove('area-congelada');
            overlay.remove();
        }, duracao);
    } else if (tipo === 'duplo') {
        duploAtivo = true;
        areaJogo.classList.add('area-duplo');
        clearTimeout(timeoutDuplo);
        timeoutDuplo = setTimeout(() => {
            duploAtivo = false;
            areaJogo.classList.remove('area-duplo');
            overlay.remove();
        }, duracao);
    }
}

// ===== INICIAR JOGO =====
btnIniciar.addEventListener('click', iniciarJogo);

function iniciarJogo() {
    if (jogoAtivo) return;

    const config = DIFICULDADES[dificuldadeAtual];

    pontos = 0; tempo = config.tempo; vidas = config.vida;
    combo = 0; comboMax = 0; nivel = 1;
    acertos = 0; erros = 0;
    jogoAtivo = true; pausado = false;
    conquistasGanhas.clear();
    duploAtivo = false; congeladoAtivo = false;
    clearTimeout(timeoutDuplo); clearTimeout(timeoutCongelar);
    areaJogo.classList.remove('area-congelada', 'area-duplo');
    areaJogo.querySelectorAll('.powerup-ativo, .nivel-toast, .conquista-toast').forEach(e => e.remove());

    atualizarUI();

    jogoOverlay.classList.add('hidden');
    areaJogo.querySelectorAll('.item-jogo, .pontos-flutuante').forEach(el => el.remove());

    btnIniciar.style.display = 'none';
    btnPause.style.display = 'inline-block';
    btnPause.textContent = '⏸ Pausar';

    sons.inicio();

    intervaloTempo = setInterval(() => {
        if (pausado || congeladoAtivo) return;
        tempo--;
        tempoEl.textContent = tempo;

        // Aumenta nível ao longo do tempo
        const decorrido = config.tempo - tempo;
        const novoNivel = Math.floor(decorrido / 10) + 1;
        if (novoNivel !== nivel) {
            nivel = novoNivel;
            nivelEl.textContent = nivel;
            mostrarNivelToast(nivel);
            if (nivel >= 5) ganharConquista('nivel5');
            clearInterval(intervaloItens);
            const novoSpawn = Math.max(250, config.spawn - (nivel - 1) * 80);
            intervaloItens = setInterval(criarItem, novoSpawn);
        }

        if (tempo <= 0) finalizarJogo();
    }, 1000);

    intervaloItens = setInterval(criarItem, config.spawn);
}

// ===== PAUSAR =====
btnPause.addEventListener('click', () => {
    if (!jogoAtivo) return;
    pausado = !pausado;
    btnPause.textContent = pausado ? '▶ Continuar' : '⏸ Pausar';
});

// ===== ATUALIZAR INTERFACE =====
function atualizarUI() {
    pontosEl.textContent = pontos;
    tempoEl.textContent = tempo;
    vidasEl.textContent = vidas > 0 ? '❤'.repeat(vidas) : '💀';
    comboEl.textContent = 'x' + (combo > 0 ? (1 + Math.floor(combo / 3)) : 1);
    nivelEl.textContent = nivel;
}

// ===== CRIAR ITEM ALEATÓRIO =====
function criarItem() {
    if (pausado || !jogoAtivo) return;

    const config = DIFICULDADES[dificuldadeAtual];
    const item = document.createElement('div');
    item.classList.add('item-jogo');

    const rand = Math.random();
    let tipo, conteudo;

    if (rand < config.powerChance) {
        // Power-up
        const sorteio = Math.random();
        if (sorteio < 0.10) { conteudo = '💖'; tipo = 'vida'; }
        else if (sorteio < 0.30) { conteudo = '⏰'; tipo = 'tempo'; }
        else if (sorteio < 0.50) { conteudo = '🧊'; tipo = 'congelar'; item.classList.add('dourado'); }
        else if (sorteio < 0.70) { conteudo = '✨'; tipo = 'duplo'; item.classList.add('dourado'); }
        else if (sorteio < 0.78 && nivel >= 3) { conteudo = '👾'; tipo = 'boss'; item.classList.add('dourado'); item.style.fontSize = '3.5rem'; }
        else { conteudo = '⭐'; tipo = 'dourado'; item.classList.add('dourado'); }
    } else if (rand < config.powerChance + config.errChance) {
        conteudo = errados[Math.floor(Math.random() * errados.length)];
        tipo = 'errado';
    } else {
        conteudo = alimentos[Math.floor(Math.random() * alimentos.length)];
        tipo = 'alimento';
    }

    item.textContent = conteudo;
    item.dataset.tipo = tipo;

    const tamanho = 60;
    const maxX = areaJogo.clientWidth - tamanho;
    const maxY = areaJogo.clientHeight - tamanho;
    const posX = Math.random() * maxX;
    const posY = Math.random() * maxY;
    item.style.left = posX + 'px';
    item.style.top = posY + 'px';

    item.addEventListener('click', (e) => {
        e.stopPropagation();
        if (item.classList.contains('item-clicado') || pausado) return;
        item.classList.add('item-clicado');
        processarClique(tipo, posX, posY);
        setTimeout(() => item.remove(), 300);
    });

    areaJogo.appendChild(item);

    // Remove item após tempo (mais rápido em níveis altos)
    const tempoVida = Math.max(1200, 2200 - nivel * 100);
    setTimeout(() => {
        if (item.parentElement && !item.classList.contains('item-clicado')) {
            // Se era alimento e não foi pego, quebra o combo
            if (tipo === 'alimento' || tipo === 'dourado') {
                combo = 0;
                atualizarUI();
            }
            item.remove();
        }
    }, tempoVida);
}

// ===== PROCESSAR CLIQUE NO ITEM =====
function processarClique(tipo, x, y) {
    let ganhou = 0, mensagem = '', classe = 'positivo';

    switch (tipo) {
        case 'alimento':
            combo++;
            comboMax = Math.max(comboMax, combo);
            const mult = 1 + Math.floor(combo / 3);
            ganhou = 10 * mult * (duploAtivo ? 2 : 1);
            pontos += ganhou;
            acertos++;
            mensagem = `+${ganhou}`;
            sons.acerto();
            if (combo > 0 && combo % 5 === 0) {
                mostrarComboFlash(combo);
                sons.combo();
            }
            break;

        case 'dourado':
            combo++;
            ganhou = 30 * (1 + Math.floor(combo / 3)) * (duploAtivo ? 2 : 1);
            pontos += ganhou;
            acertos++;
            mensagem = `⭐ +${ganhou}`;
            classe = 'bonus';
            sons.bonus();
            break;

        case 'boss':
            combo += 3;
            ganhou = 100 * (1 + Math.floor(combo / 3)) * (duploAtivo ? 2 : 1);
            pontos += ganhou;
            acertos++;
            mensagem = `👾 BOSS +${ganhou}!`;
            classe = 'bonus';
            ganharConquista('matouBoss');
            sons.bonus(); setTimeout(() => sons.combo(), 100);
            break;

        case 'congelar':
            ativarPowerup('congelar', 4000);
            mensagem = '🧊 Congelado 4s';
            classe = 'bonus';
            sons.bonus();
            break;

        case 'duplo':
            ativarPowerup('duplo', 6000);
            mensagem = '✨ Pontos x2 (6s)';
            classe = 'bonus';
            sons.bonus();
            break;

        case 'tempo':
            tempo += 5;
            mensagem = '⏰ +5s';
            classe = 'bonus';
            sons.bonus();
            break;

        case 'vida':
            if (vidas < 5) vidas++;
            mensagem = '❤️ +1 Vida';
            classe = 'bonus';
            sons.vida();
            break;

        case 'errado':
            pontos = Math.max(0, pontos - 20);
            vidas--;
            combo = 0;
            erros++;
            mensagem = '-20 ❌';
            classe = 'negativo';
            sons.erro();
            // Tremor da tela
            areaJogo.style.animation = 'none';
            setTimeout(() => { areaJogo.style.animation = 'tremor 0.4s'; }, 10);
            if (vidas <= 0) setTimeout(finalizarJogo, 500);
            break;
    }

    mostrarPontosFlutuantes(mensagem, x, y, classe);
    explosaoParticulas(x, y, classe);

    // Conquistas
    if (acertos === 1) ganharConquista('primeiroAcerto');
    if (combo >= 10) ganharConquista('combo10');
    if (combo >= 20) ganharConquista('combo20');
    if (pontos >= 100) ganharConquista('pontos100');
    if (pontos >= 500) ganharConquista('pontos500');
    if (pontos >= 1000) ganharConquista('pontos1000');
    if (tipo === 'dourado') ganharConquista('apanhouDourado');

    atualizarUI();
}

// ===== EFEITO DE PONTOS FLUTUANTES =====
function mostrarPontosFlutuantes(texto, x, y, classe) {
    const el = document.createElement('div');
    el.className = 'pontos-flutuante ' + classe;
    el.textContent = texto;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    areaJogo.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

// ===== EFEITO DE COMBO =====
function mostrarComboFlash(c) {
    const el = document.createElement('div');
    el.className = 'combo-flash';
    el.textContent = `COMBO x${1 + Math.floor(c / 3)}!`;
    areaJogo.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

// ===== TREMOR (CSS injetado) =====
const styleTremor = document.createElement('style');
styleTremor.textContent = `@keyframes tremor {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-5px, 3px); }
    40% { transform: translate(5px, -3px); }
    60% { transform: translate(-5px, -3px); }
    80% { transform: translate(5px, 3px); }
}`;
document.head.appendChild(styleTremor);

// ===== FINALIZAR JOGO =====
function finalizarJogo() {
    clearInterval(intervaloTempo);
    clearInterval(intervaloItens);
    jogoAtivo = false;
    pausado = false;
    areaJogo.querySelectorAll('.item-jogo').forEach(el => el.remove());

    sons.fim();

    const chave = `recordeAmifec_${dificuldadeAtual}`;
    const recordeAnterior = parseInt(localStorage.getItem(chave) || 0);
    let novoRecordeHtml = '';
    if (pontos > recordeAnterior) {
        localStorage.setItem(chave, pontos);
        atualizarRecorde();
        novoRecordeHtml = '<div class="recorde-novo">🏆 NOVO RECORDE!</div>';
    }

    let titulo, msg;
    if (pontos >= 500)      { titulo = '🌟 LENDÁRIO!';        msg = 'Você é um verdadeiro mestre Amifec!'; }
    else if (pontos >= 300) { titulo = '🏆 EXCELENTE!';       msg = 'Desempenho impressionante!'; }
    else if (pontos >= 150) { titulo = '👏 MUITO BOM!';       msg = 'Continue assim!'; }
    else if (pontos >= 50)  { titulo = '👍 BOM!';             msg = 'Bom trabalho, mas pode melhorar.'; }
    else                    { titulo = '😅 TENTE NOVAMENTE!'; msg = 'A prática leva à perfeição!'; }

    const config = DIFICULDADES[dificuldadeAtual];
    const precisao = (acertos + erros) > 0 ? Math.round((acertos / (acertos + erros)) * 100) : 0;
    if (erros === 0 && acertos > 5) ganharConquista('semErrar');

    jogoOverlay.querySelector('.overlay-content').innerHTML = `
        <div class="resultado-final">
            <h3>${titulo}</h3>
            <p>${msg}</p>
            <div class="pontuacao-final">${pontos}</div>
            <p><strong>Dificuldade:</strong> ${config.nome}</p>
            <p>✅ Acertos: <strong>${acertos}</strong> | ❌ Erros: <strong>${erros}</strong></p>
            <p>🎯 Precisão: <strong>${precisao}%</strong> | 🔥 Maior combo: <strong>x${1 + Math.floor(comboMax / 3)}</strong></p>
            <p>🏅 Conquistas: <strong>${conquistasGanhas.size}/${Object.keys(CONQUISTAS).length}</strong></p>
            ${novoRecordeHtml}
        </div>
    `;
    jogoOverlay.classList.remove('hidden');

    btnIniciar.style.display = 'inline-block';
    btnIniciar.textContent = '🔄 Jogar Novamente';
    btnPause.style.display = 'none';
}

/* ============================================
   ============ QUIZ AMIFEC ===================
   ============================================ */
const PERGUNTAS = [
    {
        q: 'Em que ano a Amifec Alimentos foi fundada?',
        op: ['1994', '2000', '2005', '2010'],
        correta: 2,
        exp: 'A Amifec foi fundada em 2005, em Nova Londrina-PR, pelo Sr. Elson Lopes.'
    },
    {
        q: 'Quem é o fundador da Amifec Alimentos?',
        op: [
            'Antônio Mendes',
            'Sr. Elson Lopes',
            'Fernanda Castro',
            'José da Silva'
        ],
        correta: 1,
        exp: 'O Sr. Elson Lopes fundou a Amifec após começar no segmento da agroindústria em 1994.'
    },
    {
        q: 'Onde fica a matriz da Amifec Alimentos?',
        op: ['Ribeirão Preto - SP', 'Curitiba - PR', 'Nova Londrina - PR', 'Londrina - PR'],
        correta: 2,
        exp: 'A matriz fica na Rod. PR 182, Km 03, em Nova Londrina-PR (CEP 87970-000).'
    },
    {
        q: 'Em que ano o Sr. Elson Lopes começou no segmento da agroindústria?',
        op: ['1985', '1990', '1994', '2000'],
        correta: 2,
        exp: 'Desde 1994 o Sr. Elson Lopes atuava na agroindústria, antes de fundar a Amifec em 2005.'
    },
    {
        q: 'Qual é o slogan oficial da Amifec Alimentos?',
        op: [
            'Sabor que alimenta',
            'Qualidade que se põe à mesa',
            'O melhor do Brasil',
            'Comida de verdade'
        ],
        correta: 1,
        exp: 'O slogan oficial é "Qualidade que se põe à mesa", refletindo o compromisso com a casa do brasileiro.'
    },
    {
        q: 'Qual destes produtos é uma especialidade da Amifec?',
        op: ['Refrigerantes', 'Carnes nobres', 'Polvilho azedo e féculas', 'Iogurtes naturais'],
        correta: 2,
        exp: 'A Amifec é fabricante de amidos, féculas, polvilho azedo e misturas (como pão de queijo).'
    },
    {
        q: 'Com quantos ingredientes a Amifec faz suas misturas mais famosas?',
        op: ['Apenas 1', 'Apenas 3', '5 ingredientes', '10 ou mais'],
        correta: 1,
        exp: 'A marca registrada Amifec: cremosidade e praticidade com apenas 3 ingredientes.'
    },
    {
        q: 'Em qual estado brasileiro a Amifec tem sua origem?',
        op: ['São Paulo', 'Minas Gerais', 'Paraná', 'Santa Catarina'],
        correta: 2,
        exp: 'A Amifec é orgulhosamente paranaense: "Do Paraná para o mundo".'
    },
    {
        q: 'O que a Amifec representa em sua essência?',
        op: [
            'Apenas um nome fantasia',
            'Indústria brasileira que une tradição e tecnologia',
            'Uma rede de mercados',
            'Uma distribuidora de bebidas'
        ],
        correta: 1,
        exp: 'Na Amifec, tradição e tecnologia caminham juntas para transformar o natural em ingrediente essencial.'
    }
];

const TEMPO_QUIZ = 20;
let qIdx = 0, qAcertos = 0, qErros = 0, qTimer = null, qRespostas = [];

const quizInicio = document.getElementById('quizInicio');
const quizPergunta = document.getElementById('quizPergunta');
const quizFinal = document.getElementById('quizFinal');
const btnIniciarQuiz = document.getElementById('btnIniciarQuiz');
const btnRefazerQuiz = document.getElementById('btnRefazerQuiz');

btnIniciarQuiz.addEventListener('click', iniciarQuiz);
btnRefazerQuiz.addEventListener('click', iniciarQuiz);

function iniciarQuiz() {
    qIdx = 0; qAcertos = 0; qErros = 0; qRespostas = [];
    quizInicio.style.display = 'none';
    quizFinal.style.display = 'none';
    quizPergunta.style.display = 'block';
    mostrarPergunta();
}

function mostrarPergunta() {
    const p = PERGUNTAS[qIdx];
    document.getElementById('quizNum').textContent = `Pergunta ${qIdx + 1} de ${PERGUNTAS.length}`;
    document.getElementById('quizBarraFill').style.width = (((qIdx + 1) / PERGUNTAS.length) * 100) + '%';
    document.getElementById('quizTextoPergunta').textContent = p.q;
    document.getElementById('quizFeedback').textContent = '';
    document.getElementById('quizFeedback').className = 'quiz-feedback';

    const opcoesEl = document.getElementById('quizOpcoes');
    opcoesEl.innerHTML = '';
    const letras = ['A', 'B', 'C', 'D'];
    p.op.forEach((opcao, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opcao';
        btn.innerHTML = `<span class="letra">${letras[i]}</span> ${opcao}`;
        btn.addEventListener('click', () => responder(i));
        opcoesEl.appendChild(btn);
    });

    // Timer
    let restante = TEMPO_QUIZ;
    const timerEl = document.getElementById('quizTimer');
    const timerBox = document.querySelector('.quiz-timer');
    timerEl.textContent = restante;
    timerBox.classList.remove('urgente');
    clearInterval(qTimer);
    qTimer = setInterval(() => {
        restante--;
        timerEl.textContent = restante;
        if (restante <= 5) timerBox.classList.add('urgente');
        if (restante <= 0) {
            clearInterval(qTimer);
            responder(-1);
        }
    }, 1000);
}

function responder(idx) {
    clearInterval(qTimer);
    const p = PERGUNTAS[qIdx];
    const botoes = document.querySelectorAll('.quiz-opcao');
    botoes.forEach((b, i) => {
        b.disabled = true;
        if (i === p.correta) b.classList.add('correta');
        if (i === idx && idx !== p.correta) b.classList.add('errada');
    });

    const feedback = document.getElementById('quizFeedback');
    const acertou = idx === p.correta;
    qRespostas.push({ q: p.q, escolheu: idx, correta: p.correta, opcoes: p.op, exp: p.exp });

    if (acertou) {
        qAcertos++;
        feedback.textContent = '✅ Correto! ' + p.exp;
        feedback.classList.add('acerto');
    } else {
        qErros++;
        feedback.textContent = (idx === -1 ? '⏰ Tempo esgotado! ' : '❌ Errado! ') + p.exp;
        feedback.classList.add('erro');
    }

    setTimeout(() => {
        qIdx++;
        if (qIdx < PERGUNTAS.length) mostrarPergunta();
        else finalizarQuiz();
    }, 2200);
}

function finalizarQuiz() {
    quizPergunta.style.display = 'none';
    quizFinal.style.display = 'block';

    const total = PERGUNTAS.length;
    const perc = Math.round((qAcertos / total) * 100);
    document.getElementById('quizAcertos').textContent = qAcertos;
    document.getElementById('quizErros').textContent = qErros;
    document.getElementById('quizPercentual').textContent = perc + '%';

    let medalha, titulo, msg;
    if (perc === 100)      { medalha = '🥇'; titulo = 'PERFEITO!';       msg = 'Você conhece a Amifec como ninguém! Medalha de ouro!'; }
    else if (perc >= 80)   { medalha = '🥈'; titulo = 'Excelente!';      msg = 'Quase perfeito! Você é um expert Amifec.'; }
    else if (perc >= 60)   { medalha = '🥉'; titulo = 'Muito bem!';       msg = 'Bom desempenho! Continue estudando sobre a Amifec.'; }
    else if (perc >= 40)   { medalha = '👍'; titulo = 'Pode melhorar';   msg = 'Revise o site e tente novamente!'; }
    else                   { medalha = '📚'; titulo = 'Hora de estudar'; msg = 'Que tal explorar o site antes de tentar de novo?'; }

    document.getElementById('quizMedalha').textContent = medalha;
    document.getElementById('quizTitulo').textContent = titulo;
    document.getElementById('quizMensagem').textContent = msg;

    // Salvar recorde de quiz
    const recAnterior = parseInt(localStorage.getItem('amifecQuizRec') || 0);
    if (qAcertos > recAnterior) {
        localStorage.setItem('amifecQuizRec', qAcertos);
    }

    // Revisão
    const letras = ['A', 'B', 'C', 'D'];
    const revisao = document.getElementById('quizRevisao');
    revisao.innerHTML = '<h4>📝 Revisão das suas respostas</h4>';
    qRespostas.forEach((r, i) => {
        const acertou = r.escolheu === r.correta;
        const escolha = r.escolheu === -1 ? '(sem resposta)' : `${letras[r.escolheu]}) ${r.opcoes[r.escolheu]}`;
        revisao.innerHTML += `
            <div class="revisao-item ${acertou ? 'ok' : 'fail'}">
                ${acertou ? '✅' : '❌'} <strong>${i + 1}. ${r.q}</strong>
                <small>Sua resposta: ${escolha}</small>
                <small>Correta: ${letras[r.correta]}) ${r.opcoes[r.correta]}</small>
            </div>`;
    });
}


// ===== BANNER LGPD =====
(function lgpdBanner() {
    const banner = document.getElementById('lgpdBanner');
    if (!banner) return;
    const btnAceitar = document.getElementById('lgpdAceitar');
    const btnRecusar = document.getElementById('lgpdRecusar');
    const linkSaibaMais = document.getElementById('lgpdSaibaMais');

    const consentimento = localStorage.getItem('amifecLgpd');
    if (!consentimento) {
        setTimeout(() => banner.classList.add('show'), 1800);
    }

    function fechar(escolha) {
        banner.classList.remove('show');
        banner.classList.add('hide');
        localStorage.setItem('amifecLgpd', escolha);
        localStorage.setItem('amifecLgpdData', new Date().toISOString());
    }
    btnAceitar.addEventListener('click', () => fechar('aceito'));
    btnRecusar.addEventListener('click', () => fechar('essenciais'));
    linkSaibaMais.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🔒 POLÍTICA DE COOKIES — AMIFEC ALIMENTOS\n\n' +
              'Usamos cookies para:\n' +
              '• Melhorar a experiência de navegação\n' +
              '• Lembrar suas preferências (ex: tema escuro)\n' +
              '• Analisar tráfego e estatísticas de uso\n\n' +
              'Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), ' +
              'você pode aceitar todos os cookies ou apenas os essenciais.\n\n' +
              'Seus dados não são compartilhados com terceiros sem autorização.');
    });
})();

// ===== EMOJIS COLORIDOS NOS TÍTULOS =====
(function wrapEmojisInHeadings() {
    function run() {
        const emojiRegex = /(\p{Extended_Pictographic}(?:\u200D\p{Extended_Pictographic})*[\uFE0F]?)/gu;
        const sel = 'h1, h2, h3, h4, h5, h6, .timeline-content h3, .section-title, .produto-card h3, .filial-icone, .feature span, .autor-avatar';
        document.querySelectorAll(sel).forEach(el => {
            if (el.dataset.emojiWrapped) return;
            const html = el.innerHTML;
            if (!emojiRegex.test(html)) return;
            el.innerHTML = html.replace(emojiRegex, '<span class="emoji-real">$1</span>');
            el.dataset.emojiWrapped = "1";
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else { run(); }
})();

// ===== HERO SLIDER - Apenas CSS animation, sem controles =====
