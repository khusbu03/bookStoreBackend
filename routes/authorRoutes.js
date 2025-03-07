const express = require("express");
const AuthorRouter = express.Router();

AuthorRouter.get("/findAuthor/:authorId", findAuthor);
AuthorRouter.post("/updateAuthor/:authorId", updateAuthor);
AuthorRouter.delete("/deleteAuthor/:authorId", deleteAuthor);

module.exports = AuthorRouter;
