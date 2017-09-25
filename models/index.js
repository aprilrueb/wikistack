var Sequelize = require('sequelize');

// create db
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

// build the tables
// page model
var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    route() {
      return '/wiki/' + this.urlTitle
    },

    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open','closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
})

// user model
var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    // isAlpha: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

// exports db
module.exports = {
  db: db,
  Page: Page,
  User: User
}
