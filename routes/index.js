var express = require('express');
const bookCollection = require('../models/bookmodel');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/library', async function (req, res, next) {

  try {
    const books = await bookCollection.find();
    res.render("library", { books: books, title: 'library page' });
  } catch (error) {
    console.log(error)
    res.send(error);
  }
  // res.render('library', { title: 'library page' });
});


router.get('/about', function (req, res, next) {
  res.render('about', { title: 'about page' });
});

router.get('/create-book', function (req, res, next) {

  res.render('createbook', { title: 'create page' });
});

router.post('/create-book', async function (req, res, next) {
  // console.log(req.body);
  // save the data to database
  try {
    const newBook = await new bookCollection(req.body);
    // res.json(newoBook);
    await newBook.save();
    res.redirect("/library");
  } catch (error) {
    res.send(error);
  }


});
router.get('/detailsbook/:id', async function (req, res, next) {
  const book = await bookCollection.findById(req.params.id);
 res.render('detailsbook', { book: book, title: 'detailspage' });
});


router.get('/update-book/:id', async function (req, res, next) {
  try {
    const book = await bookCollection.findByIdAndUpdate(req.params.id);
    res.render('updatebook', { book: book, title: 'updatepage' });
  } catch (error) {
    console.log(error);
    res.send(error)
  }
});
router.post('/update-book/:id', async function (req, res, next) {
  try {
    await bookCollection.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/detailsbook/${req.params.id}`);
  } catch (error) {
    console.log(error)
    res.send(error)
  }
});


router.get('/delete-book/:id', async function (req, res, next) {
  try {
    await bookCollection.findByIdAndDelete(req.params.id);
    res.redirect('/library');
  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

module.exports = router;
