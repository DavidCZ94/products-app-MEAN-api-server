const MongoLib = require('../lib/mongo');

class OrdersService {
    constructor(){
        this.collection = 'orders';
        this.mongoDB = new MongoLib();
    }

    async getOrders( { search }){
        const query = {
            $or: [
                {clientId:  new RegExp(`.*${search}.*` ,`i`)},
                {paid_out:  new RegExp(`.*${search}.*` ,`i`)},
                {status:  new RegExp(`.*${search}.*` ,`i`)},
                {creation_date:  new RegExp(`.*${search}.*` ,`i`)},
            ]
        }

        const orders = await this.mongoDB.getAll(this.collection, query);
        return orders || [];
    }

    async createOrder( { order } ){
        const createdOrderId = await this.mongoDB.create(
            this.collection, order );
        return createdOrderId;
    }

    async getOrder( {orderId} ){
        const order = await this.mongoDB.get(this.collection, orderId);
        return order || {};
    }

    async updateProduct( {orderId, order} ){
        const updateOrderId = this.mongoDB.update(this.collection, orderId, order);
        return updateOrderId;
    }
}

module.exports = OrdersService;