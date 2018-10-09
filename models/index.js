var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
}); //postgres://ip:puerto/db

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING, allowNull: false,
    },
    urlTitle: {
        type: Sequelize.STRING, allowNull: false,
        get(){
        	return '/wiki/' + this.getDataValue('urlTitle');
        }
    },
    content: {
        type: Sequelize.TEXT, allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, allowNull: false
    }
});

Page.hook('beforeValidate', (page) => {
  if (page.title) {
    return page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    return page.urlTitle = Math.random().toString(36).substring(2, 7);
  }
});

module.exports = {
  db: db,
  Page: Page,
  User: User
};