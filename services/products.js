const MongoLib = require('../lib/mongo');

class ProductsService {

  constructor(){
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }

  async getProducts( { tags } ) {
    const query = tags && { tags: { $in: tags } }; 
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  async getProduct( { productId } ) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct({ product }) {
    const createdProductId = await this.mongoDB.create(
      this.collection, 
      {
        ...product,
        sku: await this.generateSku('ELY')
      });
    return createdProductId;
  }

  async updateProduct( {productId, product}  = {} ) {
    const updatedProductId = this.mongoDB.update(this.collection, productId, product);
    return updatedProductId;
  }

  async deleteProduct( { productId } ) {
    const deletedProductId = await this.mongoDB.delete(this.collection ,productId);
    return deletedProductId;
  }

  async generateSku(index){
    const skuMaxValue = await this.getProducts({})
    .then((products) => {
      let skuValues = products.map((item) => {
        return parseInt(item.sku.substring(3,));
      });
      return Math.max(...skuValues) + 1;
    });
    return index +  `${skuMaxValue}`;
  }
}

module.exports = ProductsService;
