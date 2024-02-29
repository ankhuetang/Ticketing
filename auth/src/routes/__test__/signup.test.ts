import request from "supertest";
import { app } from "../../app";

it('returns a 201 on succesful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
})

it('returns a 400 with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalidemailtestcom',
            password: 'password'
        })
        .expect(400);
})

it('returns a 400 with invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@gmail.com',
            password: '1'
        })
        .expect(400);
})

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({email: 'test@gmail.com'})
        .expect(400);

    return request(app)
        .post('/api/users/signup')
        .send({password: 'snfvaidfhnasdm'})
        .expect(400);
})

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
    
    //dung return hay await deu dc
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400)
})

it('sets a cookie after succesful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    
    //get(), supertest's method, retrieves response header by name
    expect(response.get('Set-Cookie')).toBeDefined(); //toBeDefined is a jest method
})