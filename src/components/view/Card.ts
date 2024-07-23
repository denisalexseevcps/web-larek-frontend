import { ensureElement } from "../../utils/utils"; 
import { Component } from "../base/component"; 


interface IActions {
  onClick: (event: MouseEvent) => void;
}

interface ICard {
  title: string;
  category: string;
  image: string;
  price: number;
  text: string;
}

export class Card<T> extends Component<ICard> {
  _title: HTMLElement;
  _category: HTMLElement;
  _image: HTMLImageElement;
  _price: HTMLElement;
  _categoryColor = <Record<string, string>> {
    "софт-скил": "soft",
    "другое": "other",
    "дополнительное": "additional",
    "кнопка": "button",
    "хард-скил": "hard"
  }

  constructor(container: HTMLElement, actions?: IActions) {
    super(container);
    this._title = ensureElement<HTMLElement>(`.card__title`, container);
    this._category = ensureElement<HTMLElement>(`.card__category`, container);
    this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
    this._price = ensureElement<HTMLElement>(`.card__price`, container);


    if (actions?.onClick) {
        container.addEventListener('click', actions.onClick);
    }
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set category(value: string) {
    this.setText(this._category, value);
    this._category.className = `card__category card__category_${this._categoryColor[value]}`
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  set price(value: string) {
    if(value === null) {
      this.setText(this._price, `Бесценно`);
    } else {
      this.setText(this._price, `${value} синапсов`);
    }
  }
}

interface ICardPreview {
    text: string;
  }
  
export class CardPreview extends Card<ICardPreview> {
    _text: HTMLElement;
    _button: HTMLElement;
    
    constructor(container: HTMLElement, actions?: IActions) {
      super(container, actions)
      this._button = container.querySelector(`.card__button`);
      this._text = ensureElement<HTMLElement>(`.card__text`, container);
  
      if (actions?.onClick) {
        if (this._button) {
            container.removeEventListener('click', actions.onClick);
            this._button.addEventListener('click', actions.onClick);
        } 
      }
    }
  
    set text(value: string) {
      this.setText(this._text, value);
    }
  }