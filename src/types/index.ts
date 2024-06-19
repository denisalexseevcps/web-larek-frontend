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

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

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

/*
  * Интерфейс описывающий внутренне состояние приложения
    Используется для хранения карточек, корзины, заказа пользователя, ошибок
    при вообще в формах
    Так же имеет методы для работы с карточками и корзиной
  * */
    export interface IAppState {
        // Корзина с товарами
        basket: ProductItem[];
        // Массив карточек товара
        store: ProductItem[];
        // Информация о заказе при покупке товара
        order: IOrder;
        // Ошибки при заполнении форм
        formErrors: FormErrors;
        // Метод для добавления товара в корзину
        addToBasket(value: ProductItem): void;
        // Метод для удаления товара из корзины
        deleteFromBasket(id: string): void;
        // Метод для полной очистки корзины
        clearBasket(): void;
        // Метод для получения количества товаров в корзине
        getBasketAmount(): number;
        // Метод для получения суммы цены всех товаров в корзине
        getTotalBasketPrice(): number;
        // Метод для добавления ID товаров в корзине в поле items для order
        setItems(): void;
        // Метод для заполнения полей email, phone, address, payment в order
        setOrderField(field: keyof IOrderForm, value: string): void;
        // Валидация форм для окошка "контакты"
        validateContacts(): boolean;
        // Валидация форм для окошка "заказ"
        validateOrder(): boolean;
        // Очистить order после покупки товаров
        refreshOrder(): boolean;
        // Метод для превращения данных, полученых с сервера в тип данных приложения
        setStore(items: ProductItem[]): void;
        // Метод для обновления поля selected во всех товарах после совершения покупки
        resetSelected(): void;
      }
      
      /*
        * Интерфейс, описывающий поля заказа товара
        * */
      export interface IOrder {
        // Массив ID купленных товаров
        items: string[];
      
        // Способ оплаты
        payment: string;
      
        // Сумма заказа
        total: number;
      
        // Адрес доставки
        address: string;
      
        // Электронная почта
        email: string;
      
        // Телефон
        phone: string;
      }
      
      export interface IOrderForm {
        payment: string;
        address: string;
        email: string;
        phone: string;
      }