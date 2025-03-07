const express = requires("express");
const bookRouter = express.Router();

bookRouter.get("/allBooks", allBooks); // gets all books in DB
bookRouter.get("/findBook/:bookId", findBook); // gets a single book
bookRouter.get("/findBook/:category", findBook); //gets all the books of this category
bookRouter.get("/findBook/:bookName", findBook); // finds book by its bookName
bookRouter.get("/findBook/:authorName", findBook); // finds all the  books written by this author

bookRouter.post("/addBook", isAdmin, addBook);
bookRouter.update("/updateBook/bookiId", isAdmin, updateBook);
bookRouter.delete("/deleteBook/:bookId", isAdmin, deleteBook);

module.exports = bookRouter;
