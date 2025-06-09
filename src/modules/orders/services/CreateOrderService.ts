import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/erros/AppError';
import { ICreateOrder } from '../domains/models/CreateOrder';
import { IOrderRepository } from '../domains/repositories/IOrderRpository';
import { Order } from '../infra/database/entities/Orders';
import { ICustomersRepository } from '../../customers/domains/repositories/ICustumerRepository';
import { IProductsRepository } from '../../products/domains/repositories/IProductsRepository';

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}
  async execute({ customerId, products }: ICreateOrder): Promise<Order> {
    const customerExists = await this.customersRepository.findId(
      Number(customerId),
    );
    if (!customerExists) {
      throw new AppError('Cliente não encontrado com este ID');
    }

    const existingProducts =
      await this.productsRepository.findAllByIds(products);
    if (!existingProducts.length) {
      throw new AppError('Nenhum produto encontrado com os IDs fornecidos');
    }

    const existsProductsIDs = products.map((product) => product.id);
    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIDs.includes(product.id),
    );
    if (!checkInexistentProducts.length) {
      throw new AppError(`This quantity of products is not available`, 409);
    }

    const serializedProducts = products.map((product) => ({
      productsId: product.id,
      quantity: product.quantity,
      price: existingProducts.filter((p) => p.id === product.id)[0].price,
    }));
    const order = await this.orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });
    const { order_products } = order;

    const updateProductQuantity = order_products.map((product) => ({
      id: product.productsId,
      name: product.name,
      price: number,
      quantity:
        existingProducts.filter((p) => p.id === product.productsId)[0]
          .quantity - product.quantity,
    }));
    await this.productsRepository.save(updateProductQuantity);
    return order;
  }
}
