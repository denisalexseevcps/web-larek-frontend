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

export interface IOrder extends OrderForm, Contacts {
    items: string[];    
    total: number;
  }

export interface IOrderForm extends OrderForm, Contacts { }


export interface OrderRequest extends OrderForm, Contacts {
    total: number,
    items: ProductItem['id'][];
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