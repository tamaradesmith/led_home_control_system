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

interface Show {
  id?: number;
  show_id?: number;
  wait_time: number;
  name?: string;
  pattern_length: number;
  group_length: number;
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
const ShowQuery = {
  async getAll() {
    try {
      const res = await fetch(`${BASE_URL}/shows`, {
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async getShowTypes() {
    try {
      const res = await fetch(`${BASE_URL}/shows/types`, {
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
};

const LedQuery = {
  async sendColour(
    display: {
      id: number;
      led_number: number;
      ipaddress: string;
      name: string;
    },
    colour: { hue: number; saturation: number; lightness: number }
  ) {
    try {
      const res = await fetch(`${BASE_URL}/displays/ledColour`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ display, colour }),
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async sendShow(
    display: {
      id?: number;
      led_number: number;
      ipaddress: string;
      name: string;
    },
    show: Show
  ) {
    try {
      const res = await fetch(`${BASE_URL}/shows/test`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ display, show }),
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
};

export { DisplayQuery, ColourQuery, ShowQuery, LedQuery };
