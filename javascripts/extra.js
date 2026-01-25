// Extra JavaScript for Anime FFmpeg Re-Encoder Documentation
// Modern Theme with Animations

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. Scroll Animations (Intersection Observer)
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animation to improve performance
                animateOnScrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Auto-add animation to key elements
    const animatableSelectors = [
        '.feature-item',
        '.stat-card',
        '.grid.cards > ul > li',
        '.admonition',
        'h2',
        'table'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(el);
        });
    });

    // ============================================
    // 2. Stat Counter Animation
    // ============================================
    function animateCounter(element, target, suffix = '') {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };

        updateCounter();
    }

    // Observe stat numbers for counter animation
    document.querySelectorAll('.stat-number').forEach(stat => {
        const text = stat.textContent;
        const numMatch = text.match(/(\d+)/);

        if (numMatch) {
            const number = parseInt(numMatch[1]);
            const suffix = text.replace(numMatch[1], '');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        stat.textContent = '0' + suffix;
                        animateCounter(stat, number, suffix);
                        observer.unobserve(stat);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(stat);
        }
    });

    // ============================================
    // 3. Hero Section Parallax Effect
    // ============================================
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // ============================================
    // 4. Smooth Scrolling for Internal Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // 5. External Link Handler
    // ============================================
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.hostname.includes('syqrel.github.io') && !link.hostname.includes('localhost')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ============================================
    // 6. Table Responsiveness
    // ============================================
    document.querySelectorAll('table').forEach(table => {
        if (!table.parentElement.classList.contains('table-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('table-wrapper');
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });

    // ============================================
    // 7. Keyboard Shortcuts
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.md-search__input');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // ============================================
    // 8. Reading Progress Bar
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #7c3aed, #ec4899);
        z-index: 1001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = Math.min((scrolled / documentHeight) * 100, 100);
        progressBar.style.width = progress + '%';
    });

    // ============================================
    // 9. Code Block Enhancement
    // ============================================
    document.querySelectorAll('.highlight').forEach(block => {
        const code = block.querySelector('code');
        if (code && code.classList.length > 0) {
            const language = Array.from(code.classList)
                .find(cls => cls.startsWith('language-'))
                ?.replace('language-', '');

            if (language && !block.querySelector('.code-header')) {
                const header = document.createElement('div');
                header.classList.add('code-header');
                header.style.cssText = `
                    padding: 0.5rem 1rem;
                    background: rgba(124, 58, 237, 0.1);
                    border-bottom: 1px solid rgba(124, 58, 237, 0.2);
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: #7c3aed;
                `;
                header.textContent = language;
                block.insertBefore(header, block.firstChild);
            }
        }
    });

    // ============================================
    // 10. Scroll to Top Enhancement
    // ============================================
    const scrollButton = document.querySelector('.md-top');
    if (scrollButton) {
        scrollButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 11. Button Hover Sound Effect (Optional)
    // ============================================
    // Uncomment to enable subtle hover effects
    /*
    document.querySelectorAll('.md-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    */

    // ============================================
    // 12. Print Mode Handler
    // ============================================
    if (window.matchMedia) {
        const mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (mql.matches) {
                document.body.classList.add('print-mode');
            } else {
                document.body.classList.remove('print-mode');
            }
        });
    }

    // ============================================
    // 13. Easter Egg (Konami Code)
    // ============================================
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiPattern.join(',')) {
            document.body.style.transition = 'filter 0.5s ease';
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
        }
    });

    console.log('%c🎬 Anime FFmpeg Re-Encoder Documentation', 'color: #7c3aed; font-size: 16px; font-weight: bold;');
    console.log('%cModern Theme Loaded Successfully!', 'color: #ec4899;');
});

// ============================================
// Analytics Event Tracking
// ============================================
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link) {
        if (link.href.includes('/profiles')) {
            trackEvent('Navigation', 'click', 'View Profiles');
        }
        if (link.href.includes('/quick-start')) {
            trackEvent('Navigation', 'click', 'Quick Start');
        }
        if (link.classList.contains('md-button--primary')) {
            trackEvent('CTA', 'click', link.textContent.trim());
        }
    }
});
