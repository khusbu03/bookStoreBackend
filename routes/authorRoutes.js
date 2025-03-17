const express = require("express");
const AuthorRouter = express.Router();

AuthorRouter.get("/findAuthor/:authorId", findAuthor);
AuthorRouter.post("/updateAuthor/:authorId",isAdmin, updateAuthor);
AuthorRouter.delete("/deleteAuthor/:authorId",isAdmin, deleteAuthor);

module.exports = AuthorRouter;
