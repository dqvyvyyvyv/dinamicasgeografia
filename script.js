// Função para scroll suave até os planos
function scrollToPlans() {
    document.getElementById('plans').scrollIntoView({
        behavior: 'smooth'
    });
}

// Função para toggle do FAQ
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fecha todos os outros FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Se não estava ativo, ativa este
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Contador regressivo dos planos - inicia em 1:35:33
function startPlansCountdown() {
    // Define o tempo inicial: 1 hora, 35 minutos e 33 segundos
    const initialTime = (1 * 60 * 60) + (35 * 60) + 33; // em segundos
    const now = new Date().getTime();
    const countdownTime = now + (initialTime * 1000);
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownTime - now;
        
        // Calcula horas, minutos e segundos
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Atualiza o display dos planos
        const plansHours = document.getElementById('plans-hours');
        const plansMinutes = document.getElementById('plans-minutes');
        const plansSeconds = document.getElementById('plans-seconds');
        
        if (plansHours && plansMinutes && plansSeconds) {
            plansHours.textContent = hours.toString().padStart(2, '0');
            plansMinutes.textContent = minutes.toString().padStart(2, '0');
            plansSeconds.textContent = seconds.toString().padStart(2, '0');
        }
        
        // Se o contador chegou a zero, para o timer
        if (distance < 0) {
            clearInterval(timer);
            if (plansHours && plansMinutes && plansSeconds) {
                plansHours.textContent = '00';
                plansMinutes.textContent = '00';
                plansSeconds.textContent = '00';
            }
        }
    }, 1000);
}

// Contador regressivo do final da página
function startCountdown() {
    // Define 24 horas a partir de agora
    const now = new Date().getTime();
    const countdownTime = now + (24 * 60 * 60 * 1000);
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownTime - now;
        
        // Calcula horas, minutos e segundos
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Atualiza o display do final da página
        const finalHours = document.getElementById('hours');
        const finalMinutes = document.getElementById('minutes');
        const finalSeconds = document.getElementById('seconds');
        
        if (finalHours && finalMinutes && finalSeconds) {
            finalHours.textContent = hours.toString().padStart(2, '0');
            finalMinutes.textContent = minutes.toString().padStart(2, '0');
            finalSeconds.textContent = seconds.toString().padStart(2, '0');
        }
        
        // Se o contador chegou a zero, para o timer
        if (distance < 0) {
            clearInterval(timer);
            if (finalHours && finalMinutes && finalSeconds) {
                finalHours.textContent = '00';
                finalMinutes.textContent = '00';
                finalSeconds.textContent = '00';
            }
        }
    }, 1000);
}

// Animações de entrada quando o elemento fica visível
function animateOnScroll() {
    const elements = document.querySelectorAll('.benefit-card, .exclusive-card, .bonus-card, .testimonial-card, .plan-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll', 'visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Efeito de parallax suave no hero
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Funções do Pop-up de Downsell
function showDownsellPopup() {
    const popup = document.getElementById('downsell-popup');
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideDownsellPopup() {
    const popup = document.getElementById('downsell-popup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function goToBasicCheckout() {
    window.location.href = "https://www.ggcheckout.com/checkout/v5/aTGeqcu1WLJLPr6pJYjg" + window.location.search;
}

function goToUpgradeCheckout() {
    window.location.href = "https://www.ggcheckout.com/checkout/v5/ii93ptf9NpaU2VE856jQ" + window.location.search;
}

// Função para lidar com o clique no plano básico
function handleBasicPlanClick(event) {
    if (event) event.preventDefault();
    showDownsellPopup();
}

// Adiciona efeito de click nos botões de plano
function addPlanButtonEffects() {
    const planButtons = document.querySelectorAll('.plan-button');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Cria efeito de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove o efeito após a animação
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Adiciona CSS para animação do ripple
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scroll para links internos
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Adiciona contadores animados para estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat strong');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const text = counter.textContent;
                const number = parseInt(text.replace(/\\D/g, ''));
                
                if (number > 0) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            counter.textContent = text;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + (text.includes('+') ? '+' : '');
                        }
                    }, 30);
                }
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Adiciona efeito de hover nos cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.benefit-card, .exclusive-card, .bonus-card, .testimonial-card, .plan-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
    });
}

// Função para gerenciar o player de vídeo
function setupVideoPlayer() {
    const video = document.getElementById('vsl-video');
    const playOverlay = document.getElementById('play-overlay');
    const pauseOverlay = document.getElementById('pause-overlay');
    const progressBar = document.getElementById('video-progress');

    if (!video || !playOverlay || !pauseOverlay || !progressBar) return;

    // Iniciar vídeo
    playOverlay.addEventListener('click', () => {
        video.play();
        playOverlay.style.display = 'none';
    });

    // Toggle pause/play ao clicar no vídeo
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    video.addEventListener('play', () => {
        playOverlay.style.display = 'none';
        pauseOverlay.style.display = 'none';
    });

    video.addEventListener('pause', () => {
        if (video.currentTime > 0 && !video.ended) {
            pauseOverlay.style.display = 'flex';
        }
    });

    // Atualizar barra de progresso
    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // Reset ao terminar
    video.addEventListener('ended', () => {
        playOverlay.style.display = 'flex';
        progressBar.style.width = '0%';
    });
}

// Função para definir a data atual no banner
function setCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        dateElement.textContent = `${day}/${month}/${year}`;
    }
}

// Função principal que inicializa tudo
function initializeApp() {
    // Espera o DOM carregar completamente
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
        return;
    }
    
    // Define a data atual no banner
    setCurrentDate();
    
    // Inicializa o player de vídeo
    setupVideoPlayer();
    
    // Inicializa todas as funcionalidades
    startCountdown();
    animateOnScroll();
    addPlanButtonEffects();
    addRippleAnimation();
    setupSmoothScroll();
    animateCounters();
    addCardHoverEffects();
}

// Event listeners para o pop-up
document.addEventListener('DOMContentLoaded', function() {
    const upgradePopup = document.getElementById('upgrade-popup');
    const downsellPopup = document.getElementById('downsell-popup');
    
    // Fecha pop-ups ao clicar fora do card
    if (upgradePopup) {
        upgradePopup.addEventListener('click', function(e) {
            if (e.target === upgradePopup) hideUpgradePopup();
        });
    }
    if (downsellPopup) {
        downsellPopup.addEventListener('click', function(e) {
            if (e.target === downsellPopup) hideDownsellPopup();
        });
    }
});

// Inicializa a aplicação
initializeApp();

// Inicia o cronômetro dos planos quando a página carrega
startPlansCountdown();