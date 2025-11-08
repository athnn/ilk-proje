// ===================================
// BilgisayarTamirci - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // İkon değiştirme
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Menü linklerine tıklandığında menüyü kapat
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Diğer açık FAQ'leri kapat
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Tıklanan FAQ'i aç/kapat
            item.classList.toggle('active');
        });
    });

    // İletişim Formu
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Form verilerini al
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');

            // Basit doğrulama
            if (!name || !email || !phone || !message) {
                showFormMessage('Lütfen tüm zorunlu alanları doldurun.', 'error');
                return;
            }

            // E-posta formatı kontrolü
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }

            // Simüle edilmiş form gönderimi
            // Gerçek uygulamada burası bir API çağrısı olacak
            setTimeout(() => {
                showFormMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
                contactForm.reset();

                // 5 saniye sonra mesajı gizle
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }

    // Form mesaj gösterme fonksiyonu
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        // Mesaja scroll
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Navbar scroll efekti
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });

    // Animasyon için Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animasyon yapılacak elementleri seç
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .value-card, .team-member, .why-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Sayfa yükleme animasyonu
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Telefon numarası formatlama (opsiyonel)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 10) {
                    value = value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4');
                } else {
                    value = value.substring(0, 10).replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4');
                }
            }
            e.target.value = value;
        });
    }

    // Aktif sayfa linkini vurgula
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation) {
            link.classList.add('active');
        }
    });

    // Dış linkleri yeni sekmede aç
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // İstatistik sayaçları animasyonu (Ana sayfada)
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlusSign = target.includes('+');
        const numericValue = parseInt(target.replace(/\D/g, ''));

        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }

            let displayValue = Math.floor(current);
            if (isPlusSign) displayValue += '+';
            if (isPercentage) displayValue = '%' + displayValue;

            element.textContent = displayValue;
        }, 30);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCounter(entry.target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Console log - Geliştirici mesajı
    console.log('%c👨‍💻 BilgisayarTamirci Web Sitesi', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%cProfesyonel PC Tamir Servisi', 'color: #6b7280; font-size: 14px;');

});
