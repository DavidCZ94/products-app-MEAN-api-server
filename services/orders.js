const MongoLib = require('../lib/mongo');

class OrdersService {
    constructor(){
        this.collection = 'orders';
        this.mongoDB = new MongoLib();
    }

    async createOrder( { order } ){
        const createdOrderId = await this.mongoDB.create(
            this.collection, order );
        return createdOrderId;
    }
}

module.exports = OrdersService;