import './scss/styles.scss';
// Импорты
import { API_URL, CDN_URL } from './utils/constants';
import { MagazineApi } from './components/data/MagazineApi';
import { cloneTemplate, ensureElement } from './utils/utils';
import { AppDate } from './components/data/AppDate';
import { EventEmitter } from './components/base/events';
import { Page } from './components/view/Page';
import { Card, CardPreview, CardBox } from './components/view/Card';
import { IProduct, IOrder, PayMetod, OrderFrame } from './types';
import { Modal } from './components/view/Modal';
import { Box } from './components/view/Box';
import { Order, Сontacts } from './components/view/Order';
import { Success } from './components/view/success';

// константы
const successTl = ensureElement<HTMLTemplateElement>('#success');
const cardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const basket = ensureElement<HTMLTemplateElement>('#basket');
const orderTr = ensureElement<HTMLTemplateElement>('#order');
const contactsTl = ensureElement<HTMLTemplateElement>('#contacts');
const modal_window = ensureElement<HTMLElement>('#modal-container');

const emmited = new EventEmitter();
const magazine = new MagazineApi(CDN_URL, API_URL);
const appData = new AppDate();
const box = new Box(cloneTemplate<HTMLTemplateElement>(basket), emmited);
const order = new Order(cloneTemplate<HTMLFormElement>(orderTr), emmited);
const contacts = new Сontacts(
	cloneTemplate<HTMLFormElement>(contactsTl),
	emmited
);

// Данные с сервера
// Получаем лоты с сервера
magazine
	.getProductList()
	.then((data) => {
		appData.setCatalog(data, emmited);
	})
	.catch((err) => {
		console.error(err);
	});

const page = new Page(document.body, emmited);

emmited.on('catalog: change', () => {
	page.catalog = appData.catalog.map((item) => {
		const product = new Card(cloneTemplate(cardCatalog), {
			onClick: () => emmited.emit('card:select', item),
		});
		return product.render({
			title: item.title,
			category: item.category,
			image: magazine.cdn + item.image,
			price: item.price,
		});
	});
});

emmited.on('card:select', (item: IProduct) => {
	appData.setPreview(item, emmited);
});
const modal = new Modal(modal_window, emmited);

emmited.on('preview: change', (item: IProduct) => {
	const card = new CardPreview(cloneTemplate(cardPreview), {
		onClick: () => emmited.emit('card: add', item),
	});

	modal.render({
		content: card.render({
			title: item.title,
			image: magazine.cdn + item.image,
			text: item.description,
			price: item.price,
			category: item.category,
			viewButton: item.price, // Добавлено для недоступности Бесценных товаров
		}),
	});
});

emmited.on('modal:open', () => {
	page.activeModal = true;
});

emmited.on('modal:close', () => {
	page.activeModal = false;
});

emmited.on('card: add', (item: IProduct) => {
	appData.inBox(item);
	appData.setItemToBox(item, emmited);
	page.counter = appData.bskt.length;
	modal.close();
});

emmited.on('box:open', () => {
	box.setDisabled(box.button, appData.statusBasket);
	box.total = appData.box.total;
	let i = 1;
	box.items = appData.bsktOb.map((item) => {
		const card = new CardBox(cloneTemplate(cardBasket), {
			onClick: () => emmited.emit('card:remove', item),
		});
		return card.render({
			title: item.title,
			price: item.price,
			index: i++,
		});
	});
	modal.render({
		content: box.render(),
	});
});

emmited.on('card:remove', (item: IProduct) => {
	appData.deliteToBox(item, emmited);
	page.counter = appData.bskt.length;
	box.setDisabled(box.button, appData.statusBasket);
	box.total = appData.box.total;
	let i = 1;
	box.items = appData.bsktOb.map((item) => {
		const card = new CardBox(cloneTemplate(cardBasket), {
			onClick: () => emmited.emit('card:remove', item),
		});
		return card.render({
			title: item.title,
			price: item.price,
			});
	});
	modal.render({
		content: box.render(),
	});
});

emmited.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			payment: 'card',
			valid: false,
			errors: [],
		}),
	});
});

emmited.on('formErrors:change', (errors: Partial<IOrder>) => {
	const { email, phone, address, payment } = errors;
	order.valid = !address && !payment;
	contacts.valid = !email && !phone;
	order.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

emmited.on(
	/^contacts\..*:change/,
	(data: { field: keyof OrderFrame; value: string }) => {
		appData.setOrderPole(data.field, data.value, emmited);
	}
);

emmited.on(
	/^order\..*:change/,
	(data: { field: keyof OrderFrame; value: string }) => {
		appData.setOrderPole(data.field, data.value, emmited);
	}
);

emmited.on('payment:change', (item: HTMLButtonElement) => {
	appData.order.payment = item.name as PayMetod;
});

emmited.on('order:submit', () => {
	appData.order.total = appData.box.total;
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

emmited.on('contacts:submit', () => {
	//console.log(appData.order);
	magazine
		.orderProducts(appData.order)
		.then((result) => {
			//console.log(appData.order);
			const success = new Success(cloneTemplate(successTl), {
				onClick: () => {
					modal.close();
					appData.clearBox(emmited);
					page.counter = appData.bskt.length;
				},
			});

			modal.render({
				content: success.render({
					total: appData.order.total,
				}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});
