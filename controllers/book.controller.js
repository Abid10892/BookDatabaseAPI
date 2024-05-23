import { Book } from "../models/book.model.js";

const registerBook = async (req, res) => {
  try {
    const { title, author, ISBN, publicationDate } = req.body;
    let date = new Date(publicationDate);
    const existedBook = await Book.findOne({ $and: [{ title }, { author }] });
    if (existedBook) {
      return res.status(409).json({ message: "Book Already Registered" });
    }

    let book = await Book.create({
      title,
      author,
      ISBN,
      publicationDate: date,
    });

    return res
      .status(200)
      .json({ data: book, message: "Successfully Registered" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const fetchBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    if (!books) {
      return res.status(404).json({ message: "Book not Found" });
    }
    return res.status(200).json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const fetchBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not Found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, author, ISBN, publicationDate } = req.body;

    const book = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        ISBN,
        publicationDate: new Date(publicationDate),
      },
      {
        new: true,
      }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not Found" });
    }

    return res.status(200).json({ message: "Successfully Updated", book });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res
        .status(404)
        .json({ message: `cannot find any book with ID ${id}` });
    }
    return res
      .status(204)
      .json({ message: "Successfully Deleted", deletedBook });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export { registerBook, fetchBooks, fetchBook, updateBook, deleteBook };
