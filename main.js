const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3000;
const cors = require("cors"); // Import cors package

const $book = require("./Book.js");

// Middleware to parse JSON requests
 app.use(cors());
app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: "sdp",
  host: "localhost",
  database: "postgres",
  password: "sdp",
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
//Worked on get all books and get detailed books by connecting to the new DB and tested in Postman both the endpoints are up and working//

// Endpoint to get all books from PostgreSQL
app.get('/get_books', async (req, res) => {
  const data = req.body;
  var t = {};

  try {
    //query the database to get all books
    const result = await queryDatabase('SELECT title,author,isbn,publicationyear,publisher FROM library_collection_inventory limit 25', []);
    t.data = result;
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Error executing query');
    return;
  }

  //send back whatever is in t
  res.json(t);
});

// endpoint to get detailed book

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
    //dear gagan you didn't defined the id's title in Database coloumn, so i am unable to get the particular book with id////
    //we Didn't defined the id's title in Database coloumn, so i am unable to get the particular book with id////
    //so i just tried with the bibnum=$1 by replacing id=$1///////
      "SELECT * FROM library_collection_inventory WHERE bibnum=$1",
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

/* Neubins Workspace*/
//endpoint to add a new book for admin

app.post("/adminControl/addBook", async (req, res) => {
  const { bibnum, title, author, isbn, publicationyear, publisher, subjects, itemcollection, floatingitem, itemlocation, reportdate, itemcount} =
    req.body;  
if($user.groups[0]==!admin){
  res.status(403).send("Forbidden.");}
else{
  // validating input
  if (!bibnum || !title || !author || !isbn || !publicationyear || !publisher || !subjects || !itemcollection || !floatingitem || !itemlocation|| !reportdate || !itemcount) {
    return res
      .status(400)
      .json({
        message:
          "All fields are required: bibnum, title, author, isbn, publicationyear, publisher, subjects, itemcollection, floatingitem, itemlocation, reportdate, itemcount",
      });
  }
  var book = {};
  try {
    //query the database to add new book
    const result = await queryDatabase(
      "INSERT INTO library_collection_inventory (bibnum, title, author, isbn, publicationyear, publisher, subjects, itemcollection, floatingitem, itemlocation, reportdate, itemcount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [bibnum, title, author, isbn, publicationyear, publisher, subjects, itemcollection, floatingitem, itemlocation, reportdate, itemcount]
    );
    book.data = result;
  } catch (error) {
    console.error("Error executing query to add book", error.stack);
    res.status(500).send("Error executing query to add book");
    return;
  }
  res.status(200).json(book);
  //res.status(201).json({ message: 'Book added successfully', book: result[0] });
}

});

//endpoint to update bookdetails with id for admin.

app.post('/adminControl/updateBook/:id', async (req, res) => {
  const { id } = req.params;
  const bookId = parseInt(id, 10);
  const { bibnum, title, author, isbn, publicationyear, publisher, subjects, itemcollection, floatingitem, itemlocation, reportdate, itemcount} =
    req.body; 
    if($user.groups[0]==!admin){
      res.status(403).send("Forbidden.");}
    else{
    //validating data
  if (!bibnum || !title || !author || !isbn || !publicationyear || !publisher || !subjects || !itemcollection || !floatingitem || !itemlocation|| !reportdate || !itemcount) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  var updatedBook = {};
  try {
    const result = await queryDatabase(
      'UPDATE library_collection_inventory SET bibnum=$1, title=$2, author=$3, isbn=$4, publicationyear=$5, publisher=$6, subjects=$7, itemcollection=$8, floatingitem=$9, itemlocation=$10, reportdate=$11, itemcount=$12 WHERE bibnum=$13 RETURNING *',
      [bibnum, title, author, isbn, publicationyear, publisher, subjects, itemcollection, floatingitem, itemlocation, reportdate, itemcount, bookId]
    );
    if (result.length === 0) return res.status(404).json({ message: 'Book not found' });
    updatedBook.data = result;
  } catch (error) {
    console.error('Error executing query to update book', error.stack);
    res.status(500).json({ message: 'Error executing query to update book' });
    return;
  }
  res.status(200).json(updatedBook);
}
});

//Gagan Workspace
app.post("/adminControl/removeBook", async (req, res) => {
  const { bibnum, title, author, isbn, publicationyear, publisher, subjects, itemtype, itemcollection, floatingitem, itemlocation, reportdate, itemcount } =
    req.body;
  // vaidating input
  if (!bibnum || !title || !author || !isbn || !publicationyear || !publisher || !subjects || !itemtype || !itemcollection || !floatingitem || !itemlocation || !reportdate || !itemcount) {
    return res
      .status(400)
      .json({
        message:
          "Any Input Is Required",
      });
  }
  var book = {};
  try {
    //query the database to add new book
    const result = await queryDatabase(
      "DELETE FROM LIBRAR_COLLECTION_INVENTORY WHERE (BIBNUM = $1 OR TITLE = $2 OR AUTHOR = $3 OR ISBN = $4 OR PUBLICATIONYEAR = $5 OR PUBLISHER = $6 OR SUBJECTS = $7 OR ITEMTYPE = $8 OR ITEMCOLLECTION = $9 OR FLOATINGITEM = $10 OR ITEMLOCATION = $11 OR REPORTDATE = $12 OR ITEMCOUNT = $13) RETURNING *",
      [bibnum, title, author, isbn, publicationyear, publisher, subjects, itemtype, itemcollection, floatingitem, itemlocation, reportdate, itemcount]
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

app.post("/borrowBook", async (req, res) => {
  const { bibnum, user_id } = req.body;

  // Validate input data
  if (!bibnum || !user_id) {
    return res
      .status(400)
      .json({ message: "Missing required fields: bibnum, user_id" });
  }

  try {
    // Check book availability
    const available = await isBookAvailable(bibnum);
    if (!available) {
      return res.status(400).json({ message: "Book is not currently available" });
    }

    // Borrow the book
    const borrowResult = await borrowBook(bibnum, user_id);
    if (!borrowResult) {
      return res.status(500).json({ message: "Error borrowing book" });
    }

    // Success response
    return res.status(201).json({ message: "Book borrowed successfully" });
  } catch (error) {
    console.error("Error borrowing book:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/adminControl/getBorrowedBooks", async (req, res) => {
  const { userId } = req.body;

  // Validating input
  if (!userId) {
    return res.status(400).json({
      message: "User ID is required",
    });
  }

  try {
    // Query the database to retrieve borrowed books
    const result = await queryDatabase(
      "SELECT * FROM checkouts_by_title WHERE USER_ID = $1",
      [userId]
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "No borrowed books found for this user",
      });
    }
    res.status(200).json({ borrowedBooks: result });
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Error executing query");
  }
});



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

////Arnav Workspace////


app.post('/user/returnBook', async (req, res) => {
  const { book_id} = req.body;
 const user_id = $user.sub;// Assuming Keycloak token has sub as user ID

 if (!book_id) {
   return res.status(400).json({ message: "Book ID is required" });
 }
 var remainingBook = {}
 
 try {
   // Check if the book is currently borrowed by the user
   /* const borrowedBook = await queryDatabase(
     'SELECT * FROM BorrowedBooks WHERE book_id = $1 AND user_id = $2',
     [book_id, user_id]
   );
   */
/*
   if (borrowedBook.length === 0) {
     return res.status(400).json({ message: 'Book not borrowed by this user or already returned' });
   }
*/
   // const borrowedDate = new Date(borrowedBook[0].borrowed_date);
   // const returnDate = new Date();
   // const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000; // 2 weeks in milliseconds
   // const delayInWeeks = Math.max(0, Math.floor((returnDate - borrowedDate - twoWeeksInMs) / (7 * 24 * 60 * 60 * 1000)));
   // const fine = 0.5 * delayInWeeks; // 50% increase each week after 2 weeks

   // Remove the entry from BorrowedBooks
   const result = await queryDatabase('DELETE FROM BorrowedBooks WHERE book_id = $1 AND user_id = $2 RETURNING *', [book_id, user_id]);
   
   // to return all the remaining borrowed books data
   const userBorrowedBooks = await queryDatabase('SELECT * FROM BorrowedBooks WHERE user_id = $1 ', [user_id]);
   remainingBook.data = userBorrowedBooks;

   if (userBorrowedBooks.length === 0) {
     return res.status(404).json({ message: "All the borrowed books are returened" });
   }

   // Update the Books table to mark the book as not borrowed
   // await queryDatabase('UPDATE Books SET is_borrowed = FALSE WHERE id = $1', [book_id]);

  // res.status(200).json({ message: 'Book returned successfully', fine: fine, book: result[0] });
 } catch (error) {
   console.error('Error returning book', error.stack);
   res.status(500).json({ message: 'Error returning book' });
 }
 res.status(200).json(remainingBook);
});





//Arvind Workspace

/*
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
*/



//Arvind Workspace


app.post("/user/extendBook", async (req, res) => {
  const {bibnum} = req.body;
  const user_id = $user.sub;

  if (!bibnum || !user_id) {
    return res.status(400).json({ message: "Both book_id and user_id are required" });
  }

  var book = {};

  try {
    // Assuming extended is a boolean column in the BorrowedBooks table
    const result = await queryDatabase(
      "UPDATE checkouts_by_title SET checkintime = checkintime + interval '14 days' WHERE bibnum=$1 AND user_id =$2; RETURNING *",
      [bibnum, user_id]
    );
    
    if (result.length === 0) {
      return res.status(404).json({ message: "No matching record found to update" });
    }

    book.data = result;
    res.status(200).json(book);
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).json({ message: "Error executing query" });
  }
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
      query = "SELECT * FROM library_collection_inventory WHERE title ILIKE $1 OR author ILIKE $1 OR genre ILIKE $1 OR publisher ILIKE $1 OR isbn ILIKE $1";
      values = [`%${search}%`];
      break;
    case "TITLE":
      query = "SELECT * FROM library_collection_inventory WHERE title ILIKE $1";
      values = [`%${search}%`];
      break;
    case "AUTHOR":
      query = "SELECT * FROM library_collection_inventory WHERE author ILIKE $1";
      values = [`%${search}%`];
      break;
    case "PUBLISHER":
      query = "SELECT * FROM library_collection_inventory WHERE publisher ILIKE $1";
      values = [`%${search}%`];
      break;
    case "ISBN":
      query = "SELECT * FROM library_collection_inventory WHERE isbn ILIKE $1";
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
