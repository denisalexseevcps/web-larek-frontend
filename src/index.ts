import './scss/styles.scss';
// Импорты
import { API_URL, CDN_URL } from './utils/constants';
import { MagazineApi } from './components/data/MagazineApi';
import { cloneTemplate, ensureElement } from './utils/utils';
import { AppDate } from './components/data/AppDate';
import { EventEmitter } from './components/base/events';
import { Page } from './components/view/Page';
import { Card,CardPreview } from './components/view/Card';
import { IProduct } from './types';
import { Modal } from './components/view/Modal'; 


// константы
const success = ensureElement<HTMLTemplateElement>('#success');
const cardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const basket = ensureElement<HTMLTemplateElement>('#basket');
const order = ensureElement<HTMLTemplateElement>('#order');
const contacts = ensureElement<HTMLTemplateElement>('#contacts');
const modal_window = ensureElement<HTMLElement>('#modal-container');

const emmited = new EventEmitter();
const magazine = new MagazineApi( CDN_URL,API_URL);
const appData = new AppDate();

// Данные с сервера
// Получаем лоты с сервера
magazine.getProductList()
  .then((data) => {
    appData.setCatalog(data,emmited)
  })
  .catch(err => {
    console.error(err);
});

const page = new Page(document.body, emmited);

//console.log(appData)

emmited.on('catalog: change', () => {
    page.catalog = appData.catalog.map((item) => {
        //console.log(item);
      const product = new Card(cloneTemplate(cardCatalog), {
        onClick: () => emmited.emit('card:select', item),
      });
      return product.render({
        title: item.title,
        category: item.category,
        image: magazine.cdn + item.image,
        price: item.price
      });
    });
  });

emmited.on('card:select', (item: IProduct) => {
    appData.setPreview(item,emmited); 
  });
const modal = new Modal(modal_window, emmited)

emmited.on('preview: change', (item: IProduct) => {
    const card = new CardPreview(cloneTemplate(cardPreview), {
      onClick: () => emmited.emit('card: add', item)
    });
  
    modal.render({
      content: card.render({
        title: item.title,
        image: magazine.cdn + item.image,
        text: item.description,
        price: item.price,
        category: item.category
      })
    });
  });

emmited.on('modal:open', () => {
    page.activeModal = true;
});

emmited.on('modal:close', () => {
    page.activeModal = false;
});

 