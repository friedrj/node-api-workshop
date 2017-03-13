const express = require('express');
const router = express.Router();
const Book = require('../models/books_model');

router.get('/', (req, res) => {
    res.send('Hello, welcome to books API, to find all books go to /api/books');
});

// *** api routes *** //
router.get('/books', findAllBooks);
router.get('/book/:id', findOneBook);
router.post('/book', addBook);
router.put('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

// *** get ALL books *** //
function findAllBooks (req, res) {
    Book.find((err, books) => {
        if(err) {
            res.json({'ERROR': err});
        } else {
            res.json(books);
        }
    });
}

// *** get SINGLE book *** //
function findOneBook (req, res) {
    Book.findById(req.params.id, (err, book) => {
        if(err) {
            res.json({'ERROR': err});
        } else {
            res.json(book);
        }
    });
}

// *** post new book *** //
function addBook (req, res) {
    const newBook = new Book({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        price: req.body.price,
        year: req.body.year
    });
    newBook.save((err, book) => {
        if(err) {
            res.json({'ERROR': err});
        } else {
            res.json({'SUCCESS': book});
        }
    });
}

// *** put SINGLE book *** //
function updateBook (req, res) {
    Book.findById(req.params.id, (err, book) => {
        book.title = req.body.title ? req.body.title : book.title;
        book.subtitle = req.body.subtitle ? req.body.subtitle : book.subtitle;
        book.description = req.body.description ? req.body.description : book.description;
        book.price = req.body.price ? req.body.price : book.price;
        book.year = req.body.year ? req.body.year : book.year;
        book.save((err) => {
            if (err) {
                res.json({'ERROR': err});
            } else {
                res.json({'UPDATED': book});
            }
        });
    });
}

// *** delete SINGLE book *** //
function deleteBook (req, res) {
    Book.findById(req.params.id, (err, book) => {
        if(err) {
            res.json({'ERROR': err});
        } else {
            book.remove( (err) =>{
                if(err) {
                    res.json({'ERROR': err});
                } else {
                    res.json({'REMOVED': book});
                }
            });
        }
    });
}


module.exports = router;