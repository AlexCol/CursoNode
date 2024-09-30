import connectToMongo from '../db/conn';

class Product {
  name: string;
  price: number;
  image: string;
  description: string;

  constructor(name: string, price: number, image: string, description: string) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  async save(): Promise<Product> {
    const db = await connectToMongo();
    var newProduct = await db.collection('products').insertOne(this);
    return newProduct;
  }

  static async getProducts(): Promise<Product[]> {
    const db = await connectToMongo();
    const products = await db.collection('products').find().toArray();
    return products;
  }

  static async all(): Promise<Product[]> {
    const db = await connectToMongo();
    const products = await db.collection('products').find().toArray();
    return products.map((product: any) => new Product(product.name, product.price, product.image, product.description));
  }
}

export default Product;