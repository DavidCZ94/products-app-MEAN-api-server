const MongoLib = require('../lib/mongo');

class ProductsService {

  constructor(){
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }

  async getProducts( { search }, nPerPage, pageNumber ) {

    const query = {
      $or: [
        {name: new RegExp(`.*${search}.*` ,`i`)},
        {sku: new RegExp(`.*${search}.*` ,`i`)},
        {brand: new RegExp(`.*${search}.*` ,`i`)},
        {class: new RegExp(`.*${search}.*` ,`i`)},
        {position: new RegExp(`.*${search}.*` ,`i`)},
        {tags: new RegExp(`.*${search}.*` ,`i`)},
      ]
    } 
    const products = await this.mongoDB.getAll(this.collection, query, nPerPage, pageNumber );
    return products || [];
  }

  async getProduct( { productId } ) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct({ product }) {
    const createdProductId = await this.mongoDB.create(
      this.collection, product);
    return createdProductId;
  }

  async updateProduct( {productId, product}  = {} ) {
    const updatedProductId = this.mongoDB.update(this.collection, productId, product);
    return updatedProductId;
  }

  async deleteProduct( { productId } ) {
    const data = await this.mongoDB.delete( this.collection, productId );
    return data;
  }

}

module.exports = ProductsService;
