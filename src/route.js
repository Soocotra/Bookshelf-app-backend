/* eslint-disable linebreak-style */
const {
  addBooksHandler,
  getBooksHandler,
  getCertainBooksHandler,
  editBookById,
  deleteCertainBookHandler,
} = require('./handler');

const routes = [{
  method: 'POST',
  path: '/books',
  handler: addBooksHandler,
}, {
  method: 'GET',
  path: '/books',
  handler: getBooksHandler,
}, {
  method: 'GET',
  path: '/books/{id}',
  handler: getCertainBooksHandler,
}, {
  method: 'PUT',
  path: '/books/{id}',
  handler: editBookById,
}, {
  method: 'DELETE',
  path: '/books/{id}',
  handler: deleteCertainBookHandler,
},
];

module.exports = routes;
