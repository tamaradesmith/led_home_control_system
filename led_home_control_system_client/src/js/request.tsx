const BASE_URL = "http://localhost:4545";

interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
  default_on: boolean;
  default_show?: number;
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
      console.log("fetch");
      const res = await fetch(`${BASE_URL}/displays/${id}`, {
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
      // console.log("update -> res.json()", res.json());
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async search(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/displays/${id}/search`, {
        credentials: "include",
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
  async create(colour: Colour) {
    try {
      const res = await fetch(`${BASE_URL}/colours`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colour }),
      });
      return res.json();
    } catch (error) {
      return error;
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
  async update(id: number, colour: Colour) {
    try {
      const res = await fetch(`${BASE_URL}/colours/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colour }),
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
};

const LedQuery = {
  async sendColour(
    display: { id: number; led_number: number; ipaddress: string },
    colour: { hue: number; saturation: number; lightness: number }
  ) {
    const info = { colour, led_number: display.led_number };
    console.log("info", info);
    try {
      const res = await fetch(`${BASE_URL}/displays/${display.id}/led/colour`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
};

export { DisplayQuery, ColourQuery, LedQuery };
