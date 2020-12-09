const BASE_URL = "http://localhost:4545";


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
    try {
      const res = await fetch(`${BASE_URL}/displays/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      return res.status;
    } catch (error) {
      return error;
    }
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
  async getOne(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/shows/${id}`, {
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
  async create(show: Show, cue: CueCue | PatternCue | RandomCue) {
    try {
      const res = await fetch(`${BASE_URL}/shows`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ show, cue }),
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async update(show: Show, cue: CueCue | PatternCue | RandomCue) {
    try {
      const res = await fetch(`${BASE_URL}/shows/${show.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ show, cue }),
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async delete(id: number) {
    try {
      const res = await fetch(`${BASE_URL}/shows/${id}`, {
        method: "delete",
        credentials: "include",
      });
      return res.status;
    } catch (error) {
      return error;
    }
  },
  async createCue(cue: CueCue) {
    console.log("🚀 ~ file: request.tsx ~ line 226 ~ createCue ~ cue", cue);
    try {
      const res = await fetch(`${BASE_URL}/shows/${cue.show_id}/cue`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cue }),
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async deleteCue(showId: number, cueId: number) {
    try {
      const res = await fetch(`${BASE_URL}/shows/${showId}/cue/${cueId}`, {
        method: "DELETE",
        credentials: 'include'
      });
      return res.status;
    } catch (error) {

    }
  }
};

const LedQuery = {
  async sendColour(
    display: Display,
    colour: { hue: number; saturation: number; lightness: number; }
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
    display: number,
    show: PatternCue | CueCue[] | RandomCue,
    type: string
  ) {
    try {
      const res = await fetch(`${BASE_URL}/shows/test`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ display, show, type }),
      });

      return res.json();
    } catch (error) {
      return error;
    }
  },
  async playShow(displayId: number, showId: number) {
    try {
      const res = await fetch(
        `${BASE_URL}/displays/${displayId}/shows/${showId}`,
        {
          credentials: "include",
        }
      );
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async playAll() {
    try {
      const res = await fetch(`${BASE_URL}/displays/playAll`, {
        credentials: 'include',
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async playOne(displayId: number) {
    try {
      const res = await fetch(`${BASE_URL}/displays/${displayId}/play`, {
        credentials: 'include',
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async stopAll() {
    try {
      const res = await fetch(`${BASE_URL}/displays/stopAll`, {
        credentials: 'include',
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
  async stopOne(displayId: number) {
    try {
      const res = await fetch(`${BASE_URL}/displays/${displayId}/stop`, {
        credentials: 'include',
      });
      return res.json();
    } catch (error) {
      return error;
    }
  },
};

export { DisplayQuery, ColourQuery, ShowQuery, LedQuery };
