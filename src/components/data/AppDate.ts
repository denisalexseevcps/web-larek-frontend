import {
	IProduct,
	IBox,
	IOrder,
	OrderFrame,	
	PayMetod
} from '../../types';
import { IEvents } from '../base/events';

export class AppDate {
	catalog: IProduct[] = [];
	preview: IProduct = null;
	box: IBox = {
		items: [],
		total: 0,
	};
	boxObj: IProduct[] = [];
	order: IOrder = {
		payment: 'card',
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};
	FrameErrors: Partial<Record<keyof OrderFrame, string>> = {};

	setItemToBox(item: IProduct, events: IEvents) {
		this.boxObj.push(item);
		this.box.items.push(item.id);
		this.box.total += item.price;
		events.emit('box: change', this.box);
	}

	inBox(item: IProduct) {
		return this.box.items.includes(item.id);
	}

	setCatalog(item: IProduct[], events: IEvents) {
		this.catalog = item;
		events.emit('catalog: change', this.catalog);
	}

	setPreview(item: IProduct, events: IEvents) {
		this.preview = item;
		events.emit('preview: change', this.preview);
	}

	deliteToBox(item: IProduct, events: IEvents) {
		const index = this.box.items.indexOf(item.id);
		if (index >= 0) {
			this.box.items.splice(index, 1);
		}
		const index1 = this.boxObj.indexOf(item);
		if (index1 >= 0) {
			this.boxObj.splice(index, 1);
		}
		this.box.total -= item.price;
		events.emit('box: change', this.box);
	}

	clearBox(events: IEvents) {
		events.emit('box: change', this.box);
		this.box = {
			items: [],
			total: 0,
		};
		this.boxObj = [];
	}

	validateOrder(events: IEvents) {
		console.log(this.order);
		const errors: typeof this.FrameErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Укажите способ оплаты';
		}
		if (!this.order.email) {
			errors.email = 'Укажите email';
		}
		if (!this.order.phone) {
			errors.phone = 'Укажите телефон';
		}
		if (!this.order.address) {
			errors.address = 'Укажите адрес';
		}
		this.FrameErrors = errors;
		events.emit('formErrors:change', this.FrameErrors);
		return Object.keys(errors).length === 0;
	}

	setPayMethod(method: PayMetod) {
		this.order.payment = method;
	}

	setOrderPole(field: keyof OrderFrame, value: string, events: IEvents) {
		if (field === 'payment') {
			this.setPayMethod(value as PayMetod);
		} else {
			this.order[field] = value;
		}

		if (this.validateOrder(events)) {
			this.order.total = this.box.total;
			this.order.items = this.box.items;
			events.emit('order:ready', this.order);
		}
	}

	get bskt() {
		return this.box.items;
	}

	get statusBasket(): boolean {
		return this.box.items.length === 0;
	}

	get bsktOb() {
		return this.boxObj;
	}
}
