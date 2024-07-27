export type PayMetod = 'cash' | 'card';

export interface IBox {
	items: string[];
	total: number;
}

export interface IProduct {
	id: string;
	title: string;
	price: number | null;
	description: string;
	image: string;
	category: string;
}

export interface IOrder {
	payment: PayMetod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export type OrderFrame = Omit<IOrder, 'total' | 'items'>;

export interface IResultOrder {
	id: string;
	total: number;
}