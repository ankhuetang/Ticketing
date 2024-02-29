import request from "supertest";
import { app } from "../../app";

it('check cookie is null when logged out', async () => {
    const cookie = await signup();

    const response =  await request(app)
        .post('/api/users/signout')
    
    expect(response.get('Set-Cookie')[0]).toMatch(new RegExp("^session=;.*"));
})
