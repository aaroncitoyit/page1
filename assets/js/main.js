document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM Cargado - Script ejecutado');

  // Menú móvil
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') ?
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Testimonios rotatorios
        const testimonials = document.querySelectorAll('.testimonial');
        let currentTestimonial = 0;

        function rotateTestimonials() {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.display = index === currentTestimonial ? 'block' : 'none';
            });

            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }

        // Cambiar testimonial cada 5 segundos
        setInterval(rotateTestimonials, 5000);

        // Smooth scroll para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 50,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Detectar scroll para cambiar color del header
        console.log('Event listener de scroll agregado');
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                console.log('Clase scrolled agregada');
            } else {
                header.classList.remove('scrolled');
                console.log('Clase scrolled removida');
            }
        });

        // Animaciones de scroll en la sección de contacto
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, observerOptions);

        // Observar elementos de contacto
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            const contactElements = contactSection.querySelectorAll('h2, .contact-info, .contact-form, .contact-item');
            contactElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Observar elementos de team
        const teamSection = document.querySelector('.team');
        if (teamSection) {
            const teamElements = teamSection.querySelectorAll('h2, .team-member');
            teamElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Observar elementos de services
        const servicesSection = document.querySelector('.services');
        if (servicesSection) {
            const servicesElements = servicesSection.querySelectorAll('h2, .service-card');
            servicesElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Observar elementos de nosotros
        const aboutSection = document.querySelector('#nosotros');
        if (aboutSection) {
            const aboutElements = aboutSection.querySelectorAll('h2, .about-text, .about-image');
            aboutElements.forEach(element => {
                observer.observe(element);
            });
        }

});
