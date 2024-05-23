const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_HOST = encodeURIComponent(config.dbHost);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority&appName=Cluster0`;

// Creating the new app layer
class Mongolib {
  db;

  constructor() {
    this.client = new MongoClient(MONGO_URI);
    this.dbName = DB_NAME;
  }  

  // using singleton patron (to one "single" instance)
  async connect() {
    if (!Mongolib.connection){
      try {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        console.log('Connected successfully to MongoDB');
      }catch{
        console.error('Connection to MongoDB failed', error);
        throw error;
      }
    }
  }

  async getAllAuth(collection, query) {
    await this.connect();
    return this.db.collection(collection).find(query).toArray();
  }

  async getAll(collection, query, nPerPage = 10, pageNumber = 1) { 
    await this.connect();
    return this.db.collection(collection).find(query)
      .sort({ _id: -1 })
      .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0 )
      .limit( nPerPage ).toArray();
  }

  async get(collection, id) {
    await this.connect();
    return this.db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async create(collection, data) {
    await this.connect();
    return this.db.collection(collection).insertOne({
      ...data,
      creation_date: new Date()
    });
  }

  async update(collection, id, data) {
    await this.connect();
    return this.db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
  }

  async delete(collection, id) {
    await this.connect();
    return this.db.collection(collection).deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Mongolib;
