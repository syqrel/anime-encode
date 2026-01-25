// Extra JavaScript for Anime FFmpeg Re-Encoder Documentation

// Add copy to clipboard for code blocks (if not already provided by theme)
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
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

    // Add external link indicators
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.hostname.includes('syqrel.github.io') && !link.hostname.includes('localhost')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Improve table responsiveness
    document.querySelectorAll('table').forEach(table => {
        if (!table.parentElement.classList.contains('table-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('table-wrapper');
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });

    // Add print-friendly styling
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

    // Add keyboard shortcuts
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

    // Add scroll-to-top button behavior enhancement
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

    // Enhance code block headers
    document.querySelectorAll('.highlight').forEach(block => {
        const code = block.querySelector('code');
        if (code && code.classList.length > 0) {
            const language = Array.from(code.classList)
                .find(cls => cls.startsWith('language-'))
                ?.replace('language-', '');

            if (language && !block.querySelector('.code-header')) {
                const header = document.createElement('div');
                header.classList.add('code-header');
                header.textContent = language;
                block.insertBefore(header, block.firstChild);
            }
        }
    });

    // Add reading progress indicator
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--md-accent-fg-color);
        z-index: 1000;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    console.log('Anime FFmpeg Re-Encoder Documentation loaded successfully!');
});

// Add analytics event tracking for important interactions
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track profile link clicks
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href.includes('/profiles.md')) {
        trackEvent('Navigation', 'click', 'View Profiles');
    }
});
