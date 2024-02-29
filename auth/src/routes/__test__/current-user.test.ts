import request from "supertest";
import { app } from "../../app";

it('response with info about current user', async () => {
    const cookie = await signup();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie) //set header for the request
        .send()
        .expect(200);
    
    expect(response.body.currentUser.email).toEqual('test@test.com')
})