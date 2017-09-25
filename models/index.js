var Sequelize = require('sequelize');

// create db
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

function titleMaker(title){
  if (title){
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    return Math.random().toString(36).substring(2, 7);
  }
}
// build the tables
// page model
var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  route: {
    type: Sequelize.VIRTUAL,
    get() {
      return '/wiki/' + this.urlTitle;
    },
  },
}, { hooks: {
  beforeValidate: function(page){
    page.urlTitle = titleMaker(page.title);
    }
  }
});

// user model
var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

// exports db
module.exports = {
  db: db,
  Page: Page,
  User: User
};
