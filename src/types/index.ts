export interface ProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
    selected: boolean;
}
export type CategoryType =
  | 'другое'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'хард-скил';

export type CategoryMapping = {
    [Key in CategoryType]: string;
  };

export interface ProductList {
    total : number;
    items: ProductItem[]; 
}

export interface Order {
    id: string;
    total: number;
}

export interface IOrder extends OrderForm, Contacts {
    items: string[];    
    total: number;
  }

export interface IOrderForm extends OrderForm, Contacts { }


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
    payment: string;
    address: string;
}

export interface Contacts {
    email: string;
    phone: string;
}

export interface Error {
    error: string;
}

export type FormErrors = Partial<Record<keyof OrderRequest, string>>;

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
    errors: FormErrors;
    checkAddress(address: string): void;
}

export interface ContactsComponent extends ModalComponent {
    errors: FormErrors;
    checkEmail(email: string): void;
    checkPhone(phone: string): void;
}

export interface SucсessComponent extends Success {
    close(): void;
} 

export interface IAppState {
    basket: ProductItem[];
    store: ProductItem[];
    order: IOrder;
    formErrors: FormErrors;
    addToBasket(value: ProductItem): void;
    deleteFromBasket(id: string): void;
    clearBasket(): void;
    getBasketAmount(): number;
    getTotalBasketPrice(): number;
    setItems(): void;
    setOrderField(field: keyof IOrderForm, value: string): void;
    validateContacts(): boolean;
    validateOrder(): boolean;
    refreshOrder(): boolean;
    setStore(items: ProductItem[]): void;
    resetSelected(): void;
}