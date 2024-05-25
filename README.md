# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание данных

interface ProductItem -  Интерфейс карточки товара, которая хранит id карточки, описание товара - description, изображение товара - image, название товара - title, категорию товара - category, цену товара - price.

interface ProductList Интерфейст списка карточек и содержит общее количество карточек, и массив этих карточек

interface Order - Интерфейс объекта который хранит id заказа и общую сумму заказа

interface OrderRequest - Интерфейс включает в себя параметры интерфейсов OrderForm, Contacts, а также хранит сумму заказа и список заказанных товаров. Служит для данных, отправляемых на сервер при оформлении заказа

interface Success - Интерфейс для данных об успешной покупки

interface CardCatalog - Интерфейс для заполнения каталога карточек

interface CardPreview - Интерфейс для заполнения превью карточек товаров

interface CardBasket - Интерфейс для заполнения корзины при покупке товаров

interface Error - Интерфейс служит для объекта, при возникновении ошибки на сервере

interface OrderForm Интерфейс служит для хранения адреса покупателя и выбранного способа оплаты

interface Contacts Интерфейс служит для  данных покупателя и хранит вводимые при оформлении заказа адрес электронной почты и телефон

interface OrderRequest Интерфейс включает в себя параметры интерфейсов OrderForm, Contacts, а также хранит сумму заказа и список заказанных товаров. Служит для данных, отправляемых на сервер при оформлении заказа

type ContactsFormErrors Тип служит для типизации объекта, хранящего данные об ошибке заполнения контактных данных

type AddressFormErrors Тип служит для типизации объекта, хранящего данные об ошибке заполнения адреса доставки

### Модели данных
interface BasketModel Интерфес служит для класса BasketModel Класс BasketModel служит для хранения карточек купленных товаров и работы с ними:
items: Set - массив карточек купленных товаров add(id: string): void - добавляет карточку в массив при нажатии кнопки купить на карточке remove(id: string): void - удаляет карточку из массива 

interface OrderModel Интерфейс служит для класса OrderModel Класс OrderModel служит для хранения данных покупателя:
addAddress(address: string): void - добавляет адрес доставки в данные 
addPhone(phone: string): void - добавляет телефон в данные
addEmail(email: string): void - добавляет email в данные 
addPayment(payment: 'card' | 'cash'): void - добавляет выбранный способ оплаты в данные

### Компоненты представления
interface ICardComponent Интерфейс служит для класса CardComponent. На основании карточки ProductItem и необходимого шаблона с помощью метода createCard() класс будет возвращать необходимую разметку карточки
openModal(): void - при нажатии на карточку будет открывать модальное оконо этой карточки

interface ModalComponent Интерфейc, содержащий общие методы для всех модальных окон 
close(): void - закрывает модальное окно 
submit(): void - отправляет данные о пользователе

interface BasketComponent Интерфейс для класса BasketComponent
remove(id: string): void - удаляет выбранную карточку из корзины

interface AddressComponent Интерфейс служит для класса AddressComponent
toggle(payment: 'card' | 'cash'): void - переключение способа оплаты errors: AddressFormErrors - выводит ошибку, если поле адреса не заполнено; делает кнопку Далее активной, если поле заполнено checkAddress(address: string): void - проверяет правильность заполнения адреса

interface ContactsComponent Интерфейс служит для класса ContactsComponent 
errors: ContactsFormErrors - выводит ошибку, если поля email и телефон не заполнены; делает кнопку Оплатить активной, если поле заполнено 
checkEmail(email: string): void - проверяет правильность заполнения поля email 
checkPhone(phone: string): void - проверяет правильность заполнения поля Телефон

interface SucсessComponent Интерфейст служит для класса SucсessComponent 
close(): void - закрывает модальное окно при нажатии на кнопку За новыми покупками