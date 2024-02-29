import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

//create global function de kp create seperate file and import in other files
//global but only available inside test env
declare global {
    var signup: () => Promise<string[]>;
}

global.signup = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201);
    
    const cookie = response.get('Set-Cookie');
    return cookie;
}

let mongo: any
//before all tests start
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
})

//before each test starts 
//empty all colections inside mongo
beforeEach( async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

//after all tests, stop server and close connection
afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
  });