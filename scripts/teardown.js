"use strict";

var db = require("@arangodb").db,
    todos = module.context.collectionName("todos"),
    collection = db._collection(todos),
    users = module.context.collectionName("users"),
    user_collection = db._collection(users);

if (collection !== null) {
  collection.drop();
}

if (user_collection !== null) {
  user_collection.drop();
}
