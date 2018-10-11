"use strict";

var db = require("@arangodb").db,
    todos = module.context.collectionName("todos"),
    users = module.context.collectionName("users"),
    fishdatas = module.context.collectionName("fishdatas");

if (db._collection(todos) === null) {
  db._create(todos);
} 
if (db._collection(users) === null) {
  db._create(users);
}
if (db._collection(fishdatas) === null) {
  db._create(fishdatas);
} 
