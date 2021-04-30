const Mongolib = require('../lib/mongo');

class UsersClientsService{
    constructor(){
        this.collection = 'users',
        this.mongoDB= new Mongolib();
    }

    async getUsers( { search } ){
        
        const query = {
            $or: [
                {name: new RegExp(`.*${search}.*` ,`i`)},
                {email: new RegExp(`.*${search}.*` ,`i`)}
            ]
        }
        const users = await this.mongoDB.getAll(this.collection, query);
        users.map(( param ) => {
                delete param['password'];
                return param;
            });
        return users || [];
    }

    async getUser( { userId } ){
        const user = await this.mongoDB.get(this.collection, userId);
        return user || {};
    }

    async createUser( { user } ){
        const createdUserId = await this.mongoDB.create( this.collection, user);
        return createdUserId;
    }

    async deleteUser( { userId } ){
        const deletedUserId = await this.mongoDB.delete( this.collection, userId );
        return deletedUserId;
    }

    async updateUser( { userId, user } = {}){
        const updatedUserId = this.mongoDB.update(this.collection, userId, user);
        return updatedUserId;
    }

}

module.exports = UsersClientsService;