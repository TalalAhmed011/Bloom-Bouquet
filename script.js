document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const faqItems = document.querySelectorAll('.faq-item');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));
            faqItems.forEach(faq => faq.querySelector('i').classList.replace('fa-minus', 'fa-plus'));

            // Open clicked
            if (!isOpen) {
                item.classList.add('active');
                question.querySelector('i').classList.replace('fa-plus', 'fa-minus');
            }
        });
    });

    // Fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.collection-card, .step, .gallery-item, .review-card, .about-text, .contact-form');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    // WhatsApp Form Submission
    const bouquetForm = document.getElementById('bouquetForm');
    if (bouquetForm) {
        bouquetForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('userName').value;
            const phone = document.getElementById('userPhone').value;
            const occ = document.getElementById('occasion').value;
            const message = document.getElementById('specialMessage').value;

            const whatsappNumber = "923115810478";

            // Format the message
            const text = `*New Bouquet Booking*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Occasion:* ${occ}%0A*Instructions:* ${message}`;

            // Redirect to WhatsApp
            window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
        });
    }
});
