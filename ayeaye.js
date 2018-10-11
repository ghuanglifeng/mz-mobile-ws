/*jslint indent: 2, nomen: true, maxlen: 100 */
/*global require */

////////////////////////////////////////////////////////////////////////////////
/// @brief A TODO-List Foxx-Application written for ArangoDB
///
/// @file
///
/// DISCLAIMER
///
/// Copyright 2010-2012 triagens GmbH, Cologne, Germany
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
/// Copyright holder is triAGENS GmbH, Cologne, Germany
///
/// @author Michael Hackstein
/// @author Copyright 2011-2013, triAGENS GmbH, Cologne, Germany
////////////////////////////////////////////////////////////////////////////////

(function () {
  "use strict";
  
  const _ = require('lodash');
  const createRouter = require('@arangodb/foxx/router');
  const router = createRouter();
  module.context.use(router);

  const todos = module.context.collection('todos');
  const users = module.context.collection('users');
  const fishdatas = module.context.collection('fishdatas');

  var Todo = require("./models/todo").Model,
    joi = require('joi'),
    todoId = joi.string().description("The id of the Todo-Item");
  var User = require("./models/user").Model,
    userId = joi.string().description("The id of the User");
  var FishData = require("./models/fishdata").Model,
    fishdataId = joi.string().description("The id of the FishData");

  /** Lists of all Todos
   *
   * This function simply returns the list of all todos.
   */

  router.get('/ayeaye/todos', function (req, res) {
    res.json(_.map(todos.toArray(), function (todo) {
      return _.omit(todo, [ '_rev', '_id', '_oldRev' ]);
    }));
  });

  /** Creates a new Todo
   *
   * Creates a new Todo-Item. The information has to be in the
   * requestBody.
   */

  router.post('/ayeaye/todos', function (req, res) {
    res.json(_.omit(todos.insert(req.body), [ '_rev', '_id' ]));
  }).body(Todo);


  /** Updates a Todo
   *
   * Changes a Todo-Item. The information has to be in the
   * requestBody.
   */
  router.put('/ayeaye/todos/:id', function (req, res) {
    res.json(_.omit(todos.replace(req.param("id"), req.body), [ '_rev', '_id', '_oldRev' ]));
  }).pathParam("id", todoId).body(Todo);

  /** Removes a Todo
   *
   * Removes a Todo-Item.
   */

  router.delete('/ayeaye/todos/:id', function (req, res) {
    todos.remove(req.param("id"));
    res.json({ success: true });
  }).pathParam("id", todoId);

   /** Lists of all Users
   *
   * This function simply returns the list of all users.
   */

  router.get('/ayeaye/users', function (req, res) {
    res.json(_.map(users.toArray(), function (user) {
      return _.omit(user, [ '_rev', '_id', '_oldRev' ]);
    }));
  });

  /** Creates a new User
   *
   * Creates a new User. The information has to be in the
   * requestBody.
   */

  router.post('/ayeaye/users', function (req, res) {
    res.json(_.omit(users.insert(req.body), [ '_rev', '_id' ]));
  }).body(User);


  /** Updates a User
   *
   * Changes a User. The information has to be in the
   * requestBody.
   */
  router.put('/ayeaye/users/:id', function (req, res) {
    res.json(_.omit(users.replace(req.param("id"), req.body), [ '_rev', '_id', '_oldRev' ]));
  }).pathParam("id", userId).body(User);

  /** Removes a User
   *
   * Removes a User.
   */

  router.delete('/ayeaye/users/:id', function (req, res) {
    users.remove(req.param("id"));
    res.json({ success: true });
  }).pathParam("id", userId);

     /** Lists of all FishDatas
   *
   * This function simply returns the list of all fishdatas.
   */

  router.get('/ayeaye/fishdatas', function (req, res) {
    res.json(_.map(fishdatas.toArray(), function (fishdata) {
      return _.omit(fishdata, [ '_rev', '_id', '_oldRev' ]);
    }));
  });

  /** Creates a new FishData
   *
   * Creates a new FishData. The information has to be in the
   * requestBody.
   */

  router.post('/ayeaye/fishdatas', function (req, res) {
    res.json(_.omit(fishdatas.insert(req.body), [ '_rev', '_id' ]));
  }).body(FishData);


  /** Updates a FishData
   *
   * Changes a FishData. The information has to be in the
   * requestBody.
   */
  router.put('/ayeaye/fishdata/:id', function (req, res) {
    res.json(_.omit(fishdatas.replace(req.param("id"), req.body), [ '_rev', '_id', '_oldRev' ]));
  }).pathParam("id", fishdataId).body(FishData);

  /** Removes a FishData
   *
   * Removes a FishData.
   */

  router.delete('/ayeaye/fishdatas/:id', function (req, res) {
    fishdatas.remove(req.param("id"));
    res.json({ success: true });
  }).pathParam("id", fishdataId);
}());
