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
};

export default scroll;
