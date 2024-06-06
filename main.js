const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3000;

const $book = require("./Book.js");

// Middleware to parse JSON requests
app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "libraryNeub",
  password: "root",
  port: 5432,
});

// Function to query the database
async function queryDatabase(query, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(query, params);
    return res.rows;
  } finally {
    client.release();
  }
}

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Express app!");
});

/////Mohith's Workspace/////

// Endpoint to get all books from PostgreSQL
app.get('/get_books', async (req, res) => {
  const data = req.body;
  var t = {};

  try {
    //query the database to get all books
    const result = await queryDatabase('SELECT title,author,isbn,publicationyear,publisher FROM library_collection_inventory', []);
    t.data = result;
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Error executing query');
    return;
  }

  //send back whatever is in t
  res.json(t);
});

/**********************************************************************************************************************************/

/* Neubins Workspace*/

// endpoint to get particular book

app.get("/get_books/:id", async (req, res) => { 
  const { id } = req.params;
  const bookId = parseInt(id, 10);
  if (isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  var book = {};
  try {
    //query the database to get particular book
    const result = await queryDatabase(
      "SELECT * FROM library_collection_inventory WHERE id=$1",
      [bookId]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.data = result;
  } catch (error) {
    console.error("Error executing query to get particular book", error.stack);
    res.status(500).send("Error executing query to get particular book");
    return;
  }
  res.status(200).json(book);
});

//endpoint to add a new book for admin

app.post("/adminControl/addBook", async (req, res) => {
  const { book_name, author_name, genre, description, published_year } =
    req.body;

  $user.groups[0]==!admin;
    res.status(403).send("Forbidden.");;

  // validating input
  if (!book_name || !author_name || !genre || !description || !published_year) {
    return res
      .status(400)
      .json({
        message:
          "All fields are required: book_name, author_name, genre, description, published_year",
      });
  }
  var book = {};
  try {
    //query the database to add new book
    const result = await queryDatabase(
      "INSERT INTO library_collection_inventory (title,, author_name, genre, description, published_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [book_name, author_name, genre, description, published_year]
    );
    book.data = result;
  } catch (error) {
    console.error("Error executing query to add book", error.stack);
    res.status(500).send("Error executing query to add book");
    return;
  }
  res.status(200).json(book);
  //res.status(201).json({ message: 'Book added successfully', book: result[0] });
});

//endpoint to update bookdetails with id for admin.

app.post('/adminControl/updateBook/:id', async (req, res) => {
  const { id } = req.params;
  const bookId = parseInt(id, 10);
  const { book_name, author_name, genre, description, published_year } = req.body;
  if (!book_name || !author_name || !genre || !description || !published_year) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  var updatedBook = {};
  try {
    const result = await queryDatabase(
      'UPDATE library_collection_inventory SET book_name=$1, author_name=$2, genre=$3, description=$4, published_date=$5 WHERE id=$6 RETURNING *',
      [book_name, author_name, genre, description, published_year, bookId]
    );
    if (result.length === 0) return res.status(404).json({ message: 'Book not found' });
    updatedBook.data = result;
  } catch (error) {
    console.error('Error executing query to update book', error.stack);
    res.status(500).json({ message: 'Error executing query to update book' });
    return;
  }
  res.status(200).json(updatedBook);
});

//Gagan Workspace
app.post("/adminControl/removeBook", async (req, res) => {
  const { book_name, author_name, genre, description, published_year } =
    req.body;
  // vaidating input
  if (!book_name || !author_name || !genre || !description || !published_year) {
    return res
      .status(400)
      .json({
        message:
          "All fields are required: book_name, author_name, genre, description, published_year",
      });
  }
  var book = {};
  try {
    //query the database to add new book
    const result = await queryDatabase(
      "DELETE FROM Books WHERE (book_name, author_name, genre, description, published_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [book_name, author_name, genre, description, published_year]
    );
    book.data = result;
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Error executing query");
    return;
  }
  res.status(200).json(book);
  //res.status(201).json({ message: 'Book added successfully', book: result[0] });
});

//endpoint for borrow book for users.
//endpoint for return borrowed book with finecheck and fine details.

/**********************************************************************************************************************************/

/*Arvinds workspace */

//endpoint to get all users details

//app.get('/adminControl/users', async (req, res) => {
  //var users = {};
  //try {
    //const result = await queryDatabase('SELECT id, username, is_admin, created_at FROM Users', []);
    //users.data=result;
      //} catch (error) {
    //console.error('Error fetching users', error.stack);
    //res.status(500).json({ message: 'Error fetching users' });
    //return;
  //}
  //res.status(200).json(users);
//});

//endpoint to get user by ID
//app.get('/adminControl/user/:id', async (req, res) => {
  //const { id } = req.params;
  //const userId = parseInt(id, 10);
  //if (isNaN(userId)) {
    //return res.status(400).json({ message: "Invalid user id" });
  //}
  //var user = {};

  //try {
    ////query the database to get user with id
    //const result = await queryDatabase("SELECT id, username, is_admin, created_at FROM Users WHERE id=$1", [userId]);

  //if (result.length === 0) {
    //return res.status(404).json({message: "user not found"});
  //}
    //user.data = result;
  //} catch (error) {
    //console.error("Error executing query to get particular user", error.stack);
    //res.status(500).send("Error executing query to get particular user");
    //return;
  //}

  ////send back whatever is in 
  //res.status(200).json(user);
//});

/************************************************************************************************************************************* */

//try {
//query the database to get all books
//const result = await queryDatabase('UPDATE Books set title=$1 where id=$2', [title,id]);
//t.data = result;
//} catch (error) {
// console.error('Error executing query', error.stack);
// res.status(500).send('Error executing query');
// return;
//}
//
//
//
//
app.post("/user/borrowBook", async (req, res) => {
  const { book_id} = req.body;
  const user_id = $user.sub;
  if (!book_id || !user_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //select count by isbn
  //select cout from borrowed books and see how many he has

  var book = {};
  try {
    var new_date = new Date().toISOString();
    const result = await queryDatabase(
      "INSERT INTO BorrowedBooks (book_id, user_id, borrowed_date) VALUES ($1, $2, $3) RETURNING *",
      [book_id, user_id, new_date]
    );
    book.data = result;
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Error executing query");
    return;
  }
  res.status(200).json(book);
});

app.post("/user/returnBook", async (req, res) => {
  const { book_id, user_id } = req.body;
  if (!book_id || !user_id) {
    return res.status(400).json({ message: "All fields are required" });
  }
  var book = {};
  try {
    const result = await queryDatabase(
      "DELETE FROM BorrowedBooks WHERE book_id=$1 AND user_id=$2 RETURNING *",
      [book_id, user_id]
    );
    book.data = result;
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Error executing query");
    return;
  }
  res.status(200).json(book);
});

app.post("/user/extendBook", async (req, res) => {
  const { book_id, user_id } = req.body;
  if (!book_id || !user_id) {
    return res.status(400).json({ message: "All fields are required" });
  }
  var book = {};
  try {
    const result = await queryDatabase(
      "UPDATE BorrowedBooks SET extended=true WHERE book_id=$1 AND user_id=$2 RETURNING *",
      [book_id, user_id]
    );
    book.data = result;
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Error executing query");
    return;
  }
  res.status(200).json(book);
});

app.get("/books/search", async (req, res) => {
  const { search, type } = req.query;
  if (!search || !type) {
    return res.status(400).json({ message: "Search query and type are required" });
  }

  let query;
  let values;

  switch (type.toUpperCase()) {
    case "ALL":
      query = "SELECT * FROM Books WHERE title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1 OR publisher ILIKE $1 OR isbn ILIKE $1";
      values = [`%${search}%`];
      break;
    case "TITLE":
      query = "SELECT * FROM Books WHERE title ILIKE $1";
      values = [`%${search}%`];
      break;
    case "AUTHOR":
      query = "SELECT * FROM Books WHERE author ILIKE $1";
      values = [`%${search}%`];
      break;
    case "PUBLISHER":
      query = "SELECT * FROM Books WHERE publisher ILIKE $1";
      values = [`%${search}%`];
      break;
    case "ISBN":
      query = "SELECT * FROM Books WHERE isbn ILIKE $1";
      values = [`%${search}%`];
      break;
    default:
      return res.status(400).json({ message: "Invalid search type" });
  }

  try {
    const result = await queryDatabase(query, values);
    res.json({ data: result });
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Error executing query");
  }
});

//send back whatever is in t

// Start the server
app.listen(port, () => {
  console.log(`Express appp listening at http://localhost:${port}`);
});

//getBooks -> get ID, Author, Title, Year, Publisher
//getBooks/:id -> select * from books where bookid=id;

//access table -> userid,bookid,timestamp,extension(true,false)
///user/getBooks -> selects from the access table all the books the user has taken access
//select * from access_table where userid=our_user;

///app.get(/user/booksCount) -> select count (*) from access_Table where userid=our_user;

//DONT app.post('/books') add description updateBooks, Add books etc
//addUserBooks -> add another book the access table for a specific user (userid,bookid)
//app.delete(/user/books/:id) -> remove an entry because the book has been returned from

//extendUserBooks -> set extension to true so that the calculation to see if its late gives double the time -> Today()>=timestamp+2 weeks times the flag

//var t = new Date();
//var text_time=t.toISOString();
//console.log(text_time)
