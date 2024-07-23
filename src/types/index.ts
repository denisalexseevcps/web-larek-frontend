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
    pay: PayMetod;
    email: string;
    phone: string;
    address: string;
    total: number;
    item: string[];
}

export type OrderFrame = Omit<IOrder, 'total'|'item'>;

export interface IResultOrder {
    id: string;
    total: number;
}

export interface IProductItem {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price: number | null;
  }