const scroll = () => {
    const anchors = document.querySelectorAll(`.nav-link`);

    for (let anchor of anchors) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const blockId = anchor.getAttribute('href');
            document.querySelector('' + blockId).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    }

    const animItems = document.querySelectorAll('.anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animScroll);
        function animScroll() {
            for (let i = 0; i < animItems.length; i++) {
                const animItem = animItems[i];
                const itemHeight = animItem.offsetHeight;
                const itemOffset = offset(animItem).top;
                const itemStart = 4;

                let animItemPoint = window.innerHeight - itemHeight / itemStart;

                if (itemHeight > innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / itemStart;
                }

                if ((pageYOffset > (itemOffset - animItemPoint)) && pageYOffset < (itemOffset + itemHeight)) {
                    animItem.classList.add('active');
                } else {
                    if(!animItem.classList.contains('anim-no-hide')) {
                        animItem.classList.remove('active');
                    }
                  
                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
        }

        setTimeout(() => animScroll(), 300)
    }
};

export default scroll;
