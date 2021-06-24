const Mongolib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class usersService{
    constructor(){
        this.collection = 'users',
        this.mongoDB = new Mongolib();
    }

    async getUser({ email }){
        const [ user ]= await this.mongoDB.getAllAuth(this.collection, { email });
        return user;
    }

    async createUser({ user }){
        const { name, email, password, isAdmin } = user;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUserId = await this.mongoDB.create(this.collection, {
            name,
            email,
            isAdmin,
            password: hashedPassword
        });
        return createUserId;
    }
}

module.exports = usersService;