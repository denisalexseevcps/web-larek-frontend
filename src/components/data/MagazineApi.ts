import { IOrder, IProduct, IResultOrder } from '../../types';
import { Api, ApiListResponse } from '../base/api';

export class MagazineApi extends Api {
	cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}
	getProductList() {
		return this.get('/product').then((data: ApiListResponse<IProduct>) => {
			return data.items.map((item) => ({ ...item }));
		});
	}
	orderProducts(order: IOrder): Promise<IResultOrder> {
		console.log(order);
		return this.post('/order', order).then((data: IResultOrder) => data);
	}
}
