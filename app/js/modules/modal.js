const modal = (modalSelector, trigerSelector) => {
    const modal = document.querySelector(modalSelector);
    const modalOpenTrigers = document.querySelectorAll(trigerSelector);
    const form = document.querySelector('.pageclip-form');

    const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;

    const openModal = () => {
        let scrollWith = getScrollbarWidth();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollWith}px`;
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    };

    Pageclip.form(form, {
        successTemplate: `
        <img class="modal__img--sucsess" src="./../icons/check.svg">
        <div class="modal__title modal__title--sucsess"> 
            <p class="modal__text"><span class="modal__text">Спасибо</span> за заявку</p> 
            <p class="modal__text">В ближайшее время мы  <span class="modal__text">свяжемся</span> с Вами</p>
        </div>`,
    });

    modalOpenTrigers.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    modal.addEventListener('click', (e) => {
        let target = e.target

        if (target == modal) {
            if (form.classList.contains('pageclip-form--success')) {
                form.classList.remove('pageclip-form--success');
                modal.querySelector('.pageclip-form__success').remove();
                modal.querySelector('.modal__dialog').classList.remove('active')
            }
            closeModal();
        }

        if (
            target.classList.contains('pageclip-form--success') ||
            target.classList.contains('pageclip-form__success') ||
            target.classList.contains('modal__img--sucsess') ||
            target.classList.contains('modal__title--sucsess')||
            target.classList.contains('modal__text')
        ) {
            form.classList.remove('pageclip-form--success');
            modal.querySelector('.modal__dialog').classList.remove('active');
            closeModal();
        }
    });
    form.addEventListener('submit', () => {
        const inputs = modal.querySelectorAll('.modal__input')
        inputs.forEach(input =>  input.value = '')
        modal.querySelector('.modal__dialog').classList.add('active')
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('active')) {
            if (form.classList.contains('pageclip-form--success')) {
                form.classList.remove('pageclip-form--success');
                modal.querySelector('.pageclip-form__success').remove();
                modal.querySelector('.modal__dialog').classList.remove('active')
            }
            closeModal();
        }
    });
};

export default modal;
