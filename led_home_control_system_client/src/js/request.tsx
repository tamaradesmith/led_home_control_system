const BASE_URL = "http://localhost:4540";

// interface Display {
//   name: string;
//   ipaddress: string;
//   led_number: number;
//   id?: number;
// }

// 192.168.0.202
const DisplayQuery = {
  async getAll() {
    try {
      const res = await fetch(`${BASE_URL}/displays`, {
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async getOne(id: string) {
    try {
      const res = await fetch(`${BASE_URL}/displays/${id}`, {
        credentials: "include",
      });
     return res.json();
    } catch (error) {
      return error;
    }
  },
  async create(display: object) {
    try {
      const res = await fetch(`${BASE_URL}/displays`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ display }),
      });
      return { res: res.ok, display: res.json() };
    } catch (error) {
      return error;
    }
  },
};

export { DisplayQuery };
