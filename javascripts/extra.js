document.addEventListener('DOMContentLoaded', function() {
    console.log('%c⚡ Anime-Encode: Cyber-Flux Theme Loaded', 'color: #3b82f6; font-weight: bold; font-size: 14px;');

    // ============================================
    // 1. Element Tilt Effect (Vanilla JS)
    // ============================================
    const tiltElements = document.querySelectorAll('.stat-card, .md-typeset .grid.cards > ul > li, .feature-item');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', handleTilt);
        el.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg tilt
        const rotateY = ((x - centerX) / centerX) * 5;

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        el.style.transition = 'transform 0.1s ease';
        
        // Dynamic Spotlight Effect
        el.style.backgroundImage = `
            radial-gradient(
                circle at ${x}px ${y}px, 
                rgba(255,255,255,0.05) 0%, 
                transparent 80%
            )
        `;
    }

    function resetTilt(e) {
        const el = e.currentTarget;
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.backgroundImage = 'none';
    }

    // ============================================
    // 2. Scroll Animations (Intersection Observer)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Auto-target common elements
    const targets = document.querySelectorAll('.hero-content > *, .stat-card, .feature-item, h2, .md-typeset .grid.cards > ul > li');
    targets.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`; // Staggered
        scrollObserver.observe(el);
    });

    // ============================================
    // 3. Number Counter Animation
    // ============================================
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));

    function animateValue(obj) {
        const text = obj.innerText;
        const number = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[0-9.]/g, '');
        
        let startTimestamp = null;
        const duration = 2000;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
            
            const current = Math.floor(easeProgress * number);
            obj.innerHTML = current + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = text; // Ensure exact final value
            }
        };
        window.requestAnimationFrame(step);
    }
});
