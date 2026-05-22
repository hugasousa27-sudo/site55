document.addEventListener('DOMContentLoaded', () => {
    // Inicializar os ícones do Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ----------------------------------------------------
    // TOGGLE DE TEMA (CLARO / ESCURO)
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Verificar se o utilizador já tem uma preferência gravada
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ----------------------------------------------------
    // MENU MOBILE
    // ----------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Impedir scroll quando o menu está aberto no mobile
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Fechar o menu ao clicar num link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // ----------------------------------------------------
    // FILTRAGEM DE PROJETOS
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar ao botão clicado
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Pequeno delay para animação de fade-in
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    // Aguardar animação acabar antes de esconder
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ----------------------------------------------------
    // ANIMAÇÃO DE SCROLL (FADE IN/SLIDE UP)
    // ----------------------------------------------------
    const animatedElements = document.querySelectorAll(
        '.animate-fade-in, .animate-slide-up, .animate-slide-up-delayed, .animate-slide-up-delayed-2, .glass-card, .about-text-card, .about-stats-card'
    );

    // Configurar o Intersection Observer
    const observerOptions = {
        root: null, // usa o viewport do browser
        rootMargin: '0px',
        threshold: 0.1 // ativa quando 10% do elemento está visível
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Se já animou, podemos deixar de observar para melhorar performance
                if (!entry.target.classList.contains('glass-card')) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        // Garantir que todos os elementos a animar tenham a classe base
        if (!element.classList.contains('animate-fade-in') && 
            !element.classList.contains('animate-slide-up') &&
            !element.classList.contains('animate-slide-up-delayed') &&
            !element.classList.contains('animate-slide-up-delayed-2')) {
            element.classList.add('animate-fade-in');
        }
        scrollObserver.observe(element);
    });

    // ----------------------------------------------------
    // NAVBAR LINK ATIVO AO DAR SCROLL
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');
    
    const navObserverOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Ativa no meio da janela
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // ----------------------------------------------------
    // FORMULÁRIO DE CONTACTO
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const formSubmitBtn = document.getElementById('formSubmitBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Limpar estados de erro antigos
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('has-error'));

        // Validação simples
        let hasError = false;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (!nameInput.value.trim()) {
            nameInput.closest('.form-group').classList.add('has-error');
            hasError = true;
        }

        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
            emailInput.closest('.form-group').classList.add('has-error');
            hasError = true;
        }

        if (!messageInput.value.trim()) {
            messageInput.closest('.form-group').classList.add('has-error');
            hasError = true;
        }

        if (hasError) return;

        // Efeito de loading no botão de submit
        const originalBtnText = formSubmitBtn.querySelector('span').innerText;
        formSubmitBtn.disabled = true;
        formSubmitBtn.querySelector('span').innerText = 'A enviar...';

        // Simular envio de API (1.5 segundos)
        setTimeout(() => {
            // Esconder o formulário com transição suave
            contactForm.style.opacity = '0';
            contactForm.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                contactForm.classList.add('hidden');
                // Mostrar a mensagem de feedback de sucesso
                formFeedback.classList.remove('hidden');
                
                // Reiniciar formulário
                contactForm.reset();
                formSubmitBtn.disabled = false;
                formSubmitBtn.querySelector('span').innerText = originalBtnText;
            }, 400);

        }, 1500);
    });

    // Função auxiliar para validar e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
