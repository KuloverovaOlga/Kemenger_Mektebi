const catalog = () => {
    const catalogParent = document.querySelector('.catalog__swiper-wrapper');

    catalogParent.addEventListener('click', (e) => {
        e.preventDefault();
        let target = e.target;

        if (target.classList.contains('catalog__swiper-item-btn')) {
            target.parentElement.parentElement.parentElement.nextElementSibling.classList.remove('hidden');
            target.classList.add('hidden');
        }
    });
};

export default catalog;
