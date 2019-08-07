const db = require("../data/dbConfig.js");

module.exports = {
  getByQuery: function(query) {
    if (query.sortby) {
      if (query.limit) {
        return db("accounts")
          .orderBy(query.sortby, query.sortdir)
          .limit(query.limit);
      } else {
        return db("accounts").orderBy(query.sortby, query.sortdir);
      }
    } else if (query.limit) {
      return db("accounts").limit(query.limit);
    } else {
      return null;
    }
  },
  get: function(id) {
    let query = db("accounts");

    if (id) {
      return query.where("id", id).first();
    }
    return query;
  },
  insert: function(account) {
    return db("accounts")
      .insert(account)
      .then(([id]) => this.get(id));
  },
  update: function(id, changes) {
    return db("accounts")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  },
  delete: function(id) {
    return db("accounts")
      .where("id", id)
      .del();
  }
};
