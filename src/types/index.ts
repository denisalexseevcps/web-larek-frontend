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

export interface OrderRequest extends OrderForm, Contacts {
    total: number,
    items: ProductItem['id'][];
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

export interface BasketModel {
    items: Set<string>;
    add(id: string): void;
    remove(id: string): void;
}

export interface OrderModel extends Partial<OrderRequest> {
    addAddress(address: string): void;
    addPhone(phone: string): void;
    addEmail(email: string): void;
    addPayment(payment: 'card' | 'cash'): void;
}

export interface CardComponent extends ProductItem {
    cardTemplate: HTMLTemplateElement;
    createCard(): void;
    openModal(): void;
}

export interface ModalComponent {
    close(): void;
    submit(): void;  
}

export interface BasketComponent extends ModalComponent {
   remove(id: string): void;
}

export interface AddressComponent extends ModalComponent {
    toggle(payment: 'card' | 'cash'): void;
    errors: AddressFormErrors;
    checkAddress(address: string): void;
}

export interface ContactsComponent extends ModalComponent {
    errors: ContactsFormErrors;
    checkEmail(email: string): void;
    checkPhone(phone: string): void;
}

export interface SucсessComponent extends Success {
    close(): void;
} 