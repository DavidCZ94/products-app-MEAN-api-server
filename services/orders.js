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
    }

    async createOrder( { order } ){
        const createdOrderId = await this.mongoDB.create(
            this.collection, order );
        return createdOrderId;
    }
}

module.exports = OrdersService;