import request from "supertest";
import { app } from "../../index";

interface Display {
  name: string | null;
  ipaddress: string;
  led_number: number;
}

// describe("Display vaildations", () => {
//   it("should have vaild name", () => {
//     const newDisplay: Display = {
//       name: null,
//       ipaddress: "192.168.0.123",
//       led_number: 6,
//     };
//    const res = request(app).post("/")
//    expect(res).toBe('Missing name')
//    expect(res).toBe(422);
//    return res;
//   });
// });
describe("test the CRUB routes for Display", () => {
  it('should respond with a 200 response in "/display "route', () => {
    return request(app).get("/display").expect(200);
  });
  it('should return  with a 200 response post "/display"', () => {
    return request(app).post("/display").expect(200);
  });
  it('should return with a 200 response for "/display/edit"')
});
