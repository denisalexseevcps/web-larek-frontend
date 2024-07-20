export type PayMetod = 'cash' | 'card';

export interface IBox {
    items: string[];
    total: number;
}

export interface IProduct {
    id: string;
    name: string;
    price: number | null;
    description: string;
    image: string;
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