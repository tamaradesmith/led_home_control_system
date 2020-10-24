import { create } from "domain";

const BASE_URL = "http://localhost:4545";

interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
}

interface Colour {
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  id?: number;
}

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
  async create(display: Display) {
    try {
      const res = await fetch(`${BASE_URL}/displays`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ display }),
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async delete(id: number) {
    const res = await fetch(`${BASE_URL}/displays/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.status;
  },
  async edit(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/displays/${id}/edit`, {
        method: "EDIT",
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async update(display: Display) {
    try {
      const res = await fetch(`${BASE_URL}/displays/${display.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ display }),
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async searchAll() {
    try {
      const res = await fetch(`${BASE_URL}/displays/search`, {
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
};
const ColourQuery = {
  async getAll() {
    try {
      const res = await fetch(`${BASE_URL}/colours`, {
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async create(colour: Colour){
    try {
      const res = await fetch(`${BASE_URL}/colours`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colour }),
      });
      return res.json()
    } catch (error) {
      return error
    }
  },
    async edit(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/colours/${id}`, {
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
};
export { DisplayQuery, ColourQuery };
