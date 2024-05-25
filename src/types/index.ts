export interface ProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface ProductList {
    total : number;
    items: ProductItem[]; 
}

export interface Order {
    id: string;
    total: number;
}

export interface Success {
    total : string;
}

export interface CardCatalog {
    category: string;
    title: string;
    image: string;
    price: number;
}

export interface CardPreview {
    category: string;
    title: string;
    description: string;
    price: number;
}

export interface CardBasket {
    index : number;
    title: string;
    price: number;
}

export interface OrderForm {
    payment: 'card' | 'cash';
    address: string;
}

export interface Contacts {
    email: string;
    phone: string;
}

export interface Error {
    error: string;
}

export type ContactsFormErrors = Partial<Record<keyof Contacts, string>>;

export type AddressFormErrors =  Partial<Record<keyof OrderForm, string>>