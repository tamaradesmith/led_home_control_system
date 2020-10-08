"use strict";

const { body } = require('express-validator/check')

module.exports =
{
  validate(method) {
    switch (method) {
      case 'createDisplay': {
        return [
          body('name', 'missing name').exists(),
          body('ipaddress', 'Invalid ipaddress').exists(),
        ]
      }
    }
  }

}
