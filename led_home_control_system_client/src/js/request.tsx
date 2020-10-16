const BASE_URL = "http://localhost:4545";

const DisplayQuery = {
  async getAll() {
    try {
      const res = await fetch(`${BASE_URL}/displays`, {
        credentials: "include",
      });
      return res.json();
    } catch (error) {
      return (error)
    }
  }
};

export { DisplayQuery };
