const MongoClient = require('mongodb').MongoClient;
// retrieve your specific collection to work with
module.exports = {
  db : null,
  connect(url) {
    return MongoClient.connect(url).then(db => {
      console.log('connected to mongodb!');
      this.db = db;
      return db;
    });
  }
};