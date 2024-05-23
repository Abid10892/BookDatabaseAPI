import express from "express";
import {
  deleteBook,
  fetchBook,
  fetchBooks,
  registerBook,
  updateBook,
} from "../controllers/book.controller.js";
import validation from "../middleware/validation.js";

const router = express.Router();

router.route("/register-book").post(validation, registerBook);
router.route("/get-all-books").get(fetchBooks);
router.route("/get-book/:id").get(fetchBook);
router.route("/update-book/:id").put(validation, updateBook);
router.route("/delete-book/:id").delete(deleteBook);

export default router;
