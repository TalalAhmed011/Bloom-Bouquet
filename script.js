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

            const whatsappNumber = "923115810474";

            // Format the message
            const text = `*New Bouquet Booking*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Occasion:* ${occ}%0A*Instructions:* ${message}`;

            // Redirect to WhatsApp
            window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
        });
    }

    // Customer Reviews Slider
    const track = document.querySelector('.reviews-track');
    const cards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    if (track && cards.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;

        const updateSlider = () => {
            const cardRect = cards[0].getBoundingClientRect();
            const cardWidth = cardRect.width;

            // Get actual gap from computed styles
            const trackStyle = window.getComputedStyle(track);
            const gap = parseFloat(trackStyle.gap) || 0;

            const slideAmount = cardWidth + gap;
            const viewportWidth = track.parentElement.offsetWidth;

            track.style.transform = `translateX(-${currentIndex * slideAmount}px)`;

            // Calculate how many cards fit in the viewport
            // We use a small epsilon to avoid floating point issues
            const visibleCards = Math.floor((viewportWidth + gap) / (cardWidth + gap));

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= cards.length - visibleCards;

            console.log(`Slider Update: Index ${currentIndex}, Visible ${visibleCards}, CardWidth ${cardWidth}, Viewport ${viewportWidth}`);
        };

        nextBtn.addEventListener('click', () => {
            const cardWidth = cards[0].getBoundingClientRect().width;
            const trackStyle = window.getComputedStyle(track);
            const gap = parseFloat(trackStyle.gap) || 0;
            const viewportWidth = track.parentElement.offsetWidth;
            const visibleCards = Math.floor((viewportWidth + gap) / (cardWidth + gap));

            if (currentIndex < cards.length - visibleCards) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        // Initialize after layout is stable
        window.addEventListener('load', updateSlider);
        window.addEventListener('resize', updateSlider);

        // Initial call in case window.load already fired or for rapid dev
        setTimeout(updateSlider, 100);
    } else {
        console.error('Slider elements not found:', { track: !!track, cards: cards.length, prev: !!prevBtn, next: !!nextBtn });
    }
});
