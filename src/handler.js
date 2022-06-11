/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const books = require('./book');

const addBooksHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = () => {
    if (pageCount === readPage) {
      return true;
    } return false;
  };
  const newData = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: finished(),
    reading,
    insertedAt,
    updatedAt,
  };

  if (name !== undefined && readPage < pageCount) {
    books.push(newData);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let book = books;
  const readingStatus = (reading === '1');
  const finishedStatus = (finished === '1');
  if (name !== undefined) {
    book = books.filter((data) => data.name.toLowerCase().includes(name.toLowerCase()));
  } else if (reading === '1') {
    book = books.filter((data) => data.reading === readingStatus);
  } else if (finished === '1') {
    book = books.filter((data) => data.reading === finishedStatus);
  }
  const response = h.response({
    status: 'success',
    data: {
      books: book.map((data) => ({
        id: data.id,
        name: data.name,
        publisher: data.publisher,
      })),
    },
  });
  return response;
};

const getCertainBooksHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((data) => data.id === id)[0];
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookById = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((data) => data.id === id);
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};

const deleteCertainBookHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((data) => data.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getBooksHandler,
  getCertainBooksHandler,
  editBookById,
  deleteCertainBookHandler,
};
