import request from "supertest";
import { app } from "../../app";

it('returns a 400 with invalid email', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'invalidemailtestcom',
            password: 'password'
        })
        .expect(400);
})

it('fails when email not exist', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@testcom',
            password: 'password'
        })
        .expect(400);
})


it('fails when an incorrect password is supplied', async () => {
    const cookie = await signup();

    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'wrongpassword'
        })
        .expect(400);
})

it('response has a cookie when login successfully', async () => {
    const cookie = await signup();

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
})
