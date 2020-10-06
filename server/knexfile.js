// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'led_home_control_system',
      username: 'tamara',
      password: 'tamara',
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds'
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds'
    },
  }

};
