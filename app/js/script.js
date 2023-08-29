import swiper from './modules/swiper';
import catalog from './modules/catalog';
import burger from './modules/burger';
import scroll from './modules/scroll';
import modal from './modules/modal';

scroll();
burger();
swiper();
catalog();
modal('.modal', '[data-modal]');
