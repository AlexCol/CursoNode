import connectToMongo from '../db/conn';

class Product {
  name: string;
  price: number;
  description: string;

  constructor(name: string, price: number, description: string) {
    this.name = name;
    this.price = price;
    this.description = description;
  }

  async save(): Promise<Product> {
    const db = await connectToMongo();
    var newProduct = await db.collection('products').insertOne(this);
    return newProduct;
  }

  static async all(): Promise<Product[]> {
    const db = await connectToMongo();
    const products = await db.collection('products').find().toArray();
    return products.map((product: any) => new Product(product.name, product.price, product.description));
  }
}

export default Product;