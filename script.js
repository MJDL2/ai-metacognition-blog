document.addEventListener('DOMContentLoaded', () => {
    // Add js-enabled class to enable animations
    document.body.classList.add('js-enabled');

    // Initialize lucide icons if available
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Scroll animations with fallback
    const sections = document.querySelectorAll('.content-section');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    } else {
        // Fallback: show all sections immediately if IntersectionObserver not supported
        sections.forEach(section => {
            section.classList.add('is-visible');
        });
    }

    // Interactive log functionality with fallback
    document.querySelectorAll('.interactive-log').forEach(detailsElement => {
        const summary = detailsElement.querySelector('summary');
        const content = detailsElement.querySelector('.log-content');

        if (!summary || !content) return;

        summary.addEventListener('click', async (event) => {
            event.preventDefault();

            try {
                // Try to use framer-motion if available
                const { animate } = await import('https://cdn.skypack.dev/framer-motion');

                if (detailsElement.open) {
                    const animation = animate(content, { height: 0 }, { duration: 0.3, ease: 'easeOut' });
                    animation.then(() => {
                        detailsElement.removeAttribute('open');
                    });
                } else {
                    detailsElement.setAttribute('open', '');
                    const targetHeight = content.offsetHeight;
                    animate(content, { height: [0, targetHeight] }, { duration: 0.3, ease: 'easeIn' });
                }
            } catch (error) {
                // Fallback: simple toggle without animation
                if (detailsElement.open) {
                    detailsElement.removeAttribute('open');
                } else {
                    detailsElement.setAttribute('open', '');
                }
            }
        });
    });
});