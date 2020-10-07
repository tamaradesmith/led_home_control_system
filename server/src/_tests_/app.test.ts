import request from "supertest";
import { app } from '../../index';


describe('test the public routes', () => {
  it('should respond with a 200 response and a "hi kittens" body in / route', ()=>{
    return request(app)
    .get('/')
    .expect(200, 'hi kittens')
  })
})