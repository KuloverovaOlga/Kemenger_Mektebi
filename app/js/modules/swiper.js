const swiper = () => {
    const swiperOne = new Swiper('.catalog__swiper', {
        slidesPerView: '1',
        spaceBetween: 20,
        grabCursor: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.catalog__swiper-button-next',
            prevEl: '.catalog__swiper-button-prev',
        },
        pagination: {
            el: '.catalog__swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        breakpoints: {
            1170: {
                slidesPerView: '3',
                spaceBetween: 20,
            },
            700: {
                slidesPerView: '2',
                spaceBetween: 20,
            },
        },
    });

    const swiperTwo = new Swiper('.reviews__swiper', {
        slidesPerView: '1',
        spaceBetween: 20,
        grabCursor: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.reviews__swiper-button-next',
            prevEl: '.reviews__swiper-button-prev',
        },
        pagination: {
            el: '.reviews__swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            1100: {
                slidesPerView: '3',
                spaceBetween: 20,
            },
            700: {
                slidesPerView: '2',
                spaceBetween: 30,
            },
        },
    });
};

export default swiper;
