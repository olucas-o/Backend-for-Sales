import AppError from '../../../shared/erros/AppError';
import { customersRepository } from '../../customers/database/entities/repositories/custumersRepositoies';
import { Product } from '../../products/database/entities/Product';
import { ProductsRepository } from '../../products/database/entities/Repositiries/ProductsRepository';
import { Order } from '../database/entities/Orders';
import { orderRepository } from '../database/entities/repositories/orderRepository';

interface CreateOrderRequest {
  customerId: string;
  products: Product[];
}

export class CreateOrderService {
  async execute({ customerId, products }: CreateOrderRequest): Promise<Order> {
    const customerExists = await customersRepository.findId(Number(customerId));
    if (!customerExists) {
      throw new AppError('Cliente não encontrado com este ID');
    }

    const existingProducts = await ProductsRepository.findAllByIds(products);
    if (!existingProducts.length) {
      throw new AppError('Nenhum produto encontrado com os IDs fornecidos');
    }

    const existsProductsIDs = products.map((product) => product.id);
    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIDs.includes(product.id),
    );
    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find products: ${checkInexistentProducts.join(', ')}`,
        409,
      );
    }

    const serializedProducts = products.map((product) => ({
      productsId: product.id,
      quantity: product.quantity,
      price: existingProducts.filter((p) => p.id === product.id)[0].price,
    }));
    const order = await orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });
    const { order_products } = order;

    const updateProductQuantity = order_products.map((product) => ({
      id: product.productsId,
      quantity:
        existingProducts.filter((p) => p.id === product.productsId)[0]
          .quantity - product.quantity,
    }));
    await ProductsRepository.save(updateProductQuantity);
    return order;
  }
}
