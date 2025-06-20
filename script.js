import { animate } from 'https://cdn.skypack.dev/framer-motion';

document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();


    const sections = document.querySelectorAll('.content-section');
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


    document.querySelectorAll('.interactive-log').forEach(detailsElement => {
        const summary = detailsElement.querySelector('summary');
        const content = detailsElement.querySelector('.log-content');

        summary.addEventListener('click', (event) => {
            event.preventDefault();

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
        });
    });
});