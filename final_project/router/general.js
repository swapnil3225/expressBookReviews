const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesUserExist = (username) => {
    return users.some((user) => user.username === username);
  };
  

public_users.post("/register", (req,res) => {
  //Write your code here
  let{username , password} = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  if (doesUserExist(username)) {
    return res.status(409).json({
      message: "Username already exists. Please choose another."
    });
  }


  users.push({ username, password });

  return res.status(200).json({
    message: "User registered successfully"
  });
});

// Get the book list available in the shop using async/await
public_users.get('/', async function (req, res) {
    try {
      // Assuming `books` is an array or object. If you are fetching from an external API or DB, you can use async/await for that.
      const booksList = await getBooks(); // Replace getBooks() with the function that fetches the book list
      return res.status(200).json(booksList);  // Return the books in a JSON response
    } catch (error) {
      console.error("Error fetching books:", error);
      return res.status(500).json({ message: 'Failed to fetch books', error: error.message });
    }
  });
  
  // Example function to simulate fetching books, you can replace this with actual fetching logic
  const getBooks = async () => {
    // If you're fetching books from an API, you can use axios.get() here.
    // For now, it returns the books directly from the books object
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (books) {
          resolve(books);  // Resolving the books object after simulating async fetch
        } else {
          reject("Books not found");  // Reject if there was an issue with fetching
        }
      }, 1000);  // Simulate a delay
    });
  };
  
// Get book details based on ISBN using async/await
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
      const isbn = req.params.isbn;
      
      // Simulate async fetching of the book details (replace with your actual logic)
      const bookDetails = await getBookByISBN(isbn);
  
      if (!bookDetails) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      return res.status(200).json(bookDetails);  // Return book details as JSON
    } catch (error) {
      console.error("Error fetching book details:", error);
      return res.status(500).json({ message: 'Failed to fetch book details', error: error.message });
    }
  });
  
  // Example function to simulate fetching book details by ISBN, replace with your actual logic
  const getBookByISBN = async (isbn) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (books[isbn]) {
          resolve(books[isbn]);  // Resolving the book details if found
        } else {
          reject("Book not found");  // Reject if the book isn't found
        }
      }, 1000);  // Simulate delay (you can remove this in actual implementation)
    });
  };
  
  
// Get book details based on author using async/await
public_users.get('/author/:author', async function (req, res) {
    try {
      const author = req.params.author;
      
      // Simulate async fetching of books by the author (replace with actual logic)
      const matchingBooks = await getBooksByAuthor(author);
  
      if (matchingBooks.length > 0) {
        return res.status(200).json({ booksByAuthor: matchingBooks });
      } else {
        return res.status(404).json({ message: "No books found by this author" });
      }
    } catch (error) {
      console.error("Error fetching books by author:", error);
      return res.status(500).json({ message: 'Failed to fetch books by author', error: error.message });
    }
  });
  
  // Example function to simulate fetching books by author, replace with actual logic
  const getBooksByAuthor = async (author) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let matchingBooks = [];
        for (let book in books) {
          if (books[book].author === author) {
            matchingBooks.push({ id: book, ...books[book] });
          }
        }
        
        if (matchingBooks.length > 0) {
          resolve(matchingBooks);  // Resolving the matching books
        } else {
          reject("No books found by this author");  // Reject if no books found
        }
      }, 1000);  // Simulate delay (you can remove this in actual implementation)
    });
  };
  

// Get all books based on title using async/await
public_users.get('/title/:title', async function (req, res) {
    try {
      const title = req.params.title;
      
      // Simulate async fetching of books by title (replace with actual logic)
      const matchingBooks = await getBooksByTitle(title);
  
      if (matchingBooks.length > 0) {
        return res.status(200).json({ booksByTitle: matchingBooks });
      } else {
        return res.status(404).json({ message: "No books found with this title" });
      }
    } catch (error) {
      console.error("Error fetching books by title:", error);
      return res.status(500).json({ message: 'Failed to fetch books by title', error: error.message });
    }
  });
  
  // Example function to simulate fetching books by title, replace with actual logic
  const getBooksByTitle = async (title) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let matchingBooks = [];
        for (let book in books) {
          if (books[book].title === title) {
            matchingBooks.push({ id: book, ...books[book] });
          }
        }
        
        if (matchingBooks.length > 0) {
          resolve(matchingBooks);  // Resolving the matching books
        } else {
          reject("No books found with this title");  // Reject if no books found
        }
      }, 1000);  // Simulate delay (you can remove this in actual implementation)
    });
  };
  

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;

    
  //Write your code here
  return res.send(books[isbn].reviews);
});

module.exports.general = public_users;
