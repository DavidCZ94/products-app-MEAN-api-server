const MongoLib = require('../lib/mongo');

class OrdersService {
    
    constructor(){
        this.collection = 'orders';
        this.productCollection = 'products';
        this.usersCollection = 'users';
        this.mongoDB = new MongoLib();
    }

    async getOrder( orderId ){
        const order = await this.mongoDB.get(this.collection, orderId);
        return order || {};
    }

    async getOrders( { search }){
        const query = {
            $or: [
                {clientId:  new RegExp(`.*${search}.*` ,`i`)},
                {clientName:  new RegExp(`.*${search}.*` ,`i`)},
                {paid_out:  new RegExp(`.*${search}.*` ,`i`)},
                {status:  new RegExp(`.*${search}.*` ,`i`)},
                {creation_date:  new RegExp(`.*${search}.*` ,`i`)},
            ]
        }

        const orders = await this.mongoDB.getAll(this.collection, query);
        return orders || [];
    }

    async createOrder( { order } ){
        const updatedProductsInform = await this.updateProductsStock(order);
        order = {
            ...order,
            'updatedProducstInform': updatedProductsInform
        }
        const createdOrderId = await this.mongoDB.create( this.collection, order );
        //Update USer
        const orderCreated = await this.getOrder( createdOrderId );
        const userUpdatedId = await this.addTheOrderToTheClient(orderCreated);
        return { createdOrderId, updatedProductsInform} ;
    } 

    async addTheOrderToTheClient(order){
        const user = await this.mongoDB.get(this.usersCollection, order.clientId);
        const userId = order.clientId;
        delete order.clientId;
        user.orders.push(order);
        const updatedUserId = this.mongoDB.update(this.usersCollection, userId, user);
        return updatedUserId;
    }

    async updateProductsStock(order){
        const updatedProductInform = await Promise.all(
            order.shopping_cart.map(
                async (product) => {
                    const productId = product._id;
                    delete product._id;
                    delete product.qty;
                    const updatedProducId = await this.updateProduct({
                        productId ,
                        product,
                    });
                    if(!updatedProducId){
                        return { 'error': product.sku };
                    }
                    return { 'updated' :product.sku };
                }
            )
        );
        return updatedProductInform;
    }

    updateProduct( {productId, product}  = {} ) {
        const updatedProductId = this.mongoDB.update(this.productCollection, productId, product);
        return updatedProductId;
    }

}

module.exports = OrdersService;