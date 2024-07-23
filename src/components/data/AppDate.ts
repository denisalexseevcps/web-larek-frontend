import { IProduct, IBox, IOrder, OrderFrame, IResultOrder, PayMetod } from "../../types";
import {IEvents} from "../base/events"

export class AppDate {
    catalog: IProduct[] = [];  
    preview: IProduct  = null;
    box: IBox = {
        items: [],
        total: 0
    };
    order: IOrder = {
        pay: 'card',
        email: '',
        phone: '',
        address: '',
        total: 0,
        item: []
    }
    FrameErrors: Partial<Record<keyof OrderFrame, string>> = {};
    
    setItemToBox(item: IProduct, events: IEvents) {
        this.box.items.push(item.id);
        this.box.total+=item.price;
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
        events.emit('preview: change', this.preview)
    }

    deliteToBox(item: IProduct, events: IEvents) {
        const index = this.box.items.indexOf(item.id);
        if (index >= 0) {
            this.box.items.splice( index, 1 );
        }
        this.box.total-=item.price;
        events.emit('box: change', this.box);
    }

    clearBox(events: IEvents) {
        events.emit('box: change', this.box);
        this.box = {
            items: [],
            total: 0
        };
    }

    validateOrder(events: IEvents) {
        const errors: typeof this.FrameErrors = {};
        if (!this.order.pay) {
            errors.pay = 'Укажите способ оплаты'
        }
        if (!this.order.email) {
            errors.email = 'Укажите email'
        }
        if (!this.order.phone) {
            errors.phone = 'Укажите телефон'
        }
        if (!this.order.address) {
            errors.address = 'Укажите адрес'
        }
        this.FrameErrors = errors;
        events.emit('formErrors:change', this.FrameErrors);
        return Object.keys(errors).length === 0;
    }

    setPayMethod(method: PayMetod) {
        this.order.pay = method;
    }

    setOrderPole(field: keyof OrderFrame, value: string,events: IEvents) {
        if (field === 'pay') {
            this.setPayMethod(value as PayMetod)
        } 
        else {
            this.order[field] = value;
        }

        if (this.validateOrder) {
            this.order.total = this.box.total;
            this.order.item = this.box.items;
            events.emit('order:ready', this.order);
        }
    }

    
}