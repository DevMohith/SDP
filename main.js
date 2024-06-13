const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3000;
const cors = require("cors"); // Import cors package
const axios = require('axios');
//const session = require('express-session');
//const { keycloak, memoryStore } = require('./keycloak');



//app.use(session({
  //secret: 'some secret',
  //resave: false,
  //saveUninitialized: true,
  //store: memoryStore
//}));

//app.use(keycloak.middleware());

//// Apply Keycloak protection to all routes
//app.use(keycloak.protect());



app.options('*', cors());  // Enable preflight requests for all routes
const $book = require("./Book.js");

//
//
//
// Middleware to fetch user info from Keycloak and attach to request
const userInfoMiddleware = async (req, res, next) => {
  // Skip token validation for OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);  // Respond to OPTIONS requests with 200 status
  }

  //console.log("Received headers:", req.headers); // Log all headers
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  //console.log("Authorization header:", authHeader); // Log the Authorization header specifically

  const token = authHeader && authHeader.split(' ')[1];
  //console.log("Extracted token:", token); // Log the extracted token

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const response = await axios.get('https://sso.sexycoders.org/auth/realms/SDP-SRH-2024/protocol/openid-connect/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    req.user = response.data;
    next();
  } catch (error) {
    console.error('Error fetching user info:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Apply the middleware to all routes
app.use(userInfoMiddleware);

//
// Middleware to fetch user info from Keycloak and attach to request
//const userInfoMiddleware = async (req, res, next) => {
  //console.log(req); // Add this line to log headers
    //console.log("Received headers:", req.headers); // Add this line to log headers
  //const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  //console.log(token);

//  if (!token) {
//    return res.status(401).json({ error: 'No token provided' });
//  }
//
//  try {
//    const response = await axios.get('https://sso.sexycoders.org/auth/realms/SDP-SRH-2024/protocol/openid-connect/userinfo', {
//      headers: {
//        Authorization: `Bearer ${token}`
//      }
//    });
//
//    req.user = response.data;
//    next();
//  } catch (error) {
//    console.error('Error fetching user info:', error);
//    return res.status(401).json({ error: 'Invalid token' });
//  }
//};

// Apply the middleware to all routes
//app.use(userInfoMiddleware);


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
    const result = await queryDatabase('SELECT title,author,isbn,publicationyear,publisher,bibnum FROM library_collection_inventory limit 25', []);
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
  //const bookId
  if (isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  var book = {};
  try {

    //query the database to get particular book
    const result = await queryDatabase(
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
  const { bibnum, title, author, isbn, publicationyear, publisher, subjects, floatingitem, reportdate} =
    req.body;  
  console.log(req.body);
if(req.user.usergroup=!'admin'){
  res.status(403).send("Forbidden.");}
else{
  // validating input
  if (!bibnum || !title || !author || !isbn || !publicationyear || !publisher || !subjects || !floatingitem || !reportdate) {
    return res
      .status(400)
      .json({
        message:
          "All fields are required: bibnum, title, author, isbn, publicationyear, publisher, subjects, floatingitem, reportdate",
      });
  }
  var book = {};
  try {
    //query the database to add new book
    const result = await queryDatabase(
      "INSERT INTO library_collection_inventory (bibnum, title, author, isbn, publicationyear, publisher, subjects, floatingitem, reportdate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [bibnum, title, author, isbn, publicationyear, publisher, subjects, floatingitem, reportdate,]
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
  const {title, author, isbn, publicationyear, publisher, subjects, itemcollection, floatingitem, itemlocation, reportdate, itemcount} =
    req.body; 
    if(req.user.usergroup=!'admin'){    
      res.status(403).send("Forbidden.");}
    else{
    //validating data
  //if (!title || !author || !isbn || !publicationyear || !publisher || !subjects || !itemcollection || !floatingitem || !itemlocation|| !reportdate || !itemcount) {
    //return res.status(400).json({ message: 'All fields are required' }
      //);
  //}
  var updatedBook = {};
  try {
    const result = await queryDatabase(
      'UPDATE library_collection_inventory SET title=$1, author=$2, isbn=$3, publicationyear=$4, publisher=$5, subjects=$6, itemcollection=$7, floatingitem=$8, itemlocation=$9, reportdate=$10, itemcount=$11 WHERE bibnum=$12 RETURNING *',
      [title, author, isbn, publicationyear, publisher, subjects, itemcollection, floatingitem, itemlocation, reportdate, itemcount, bookId]
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
//
//

app.delete("/adminControl/removeBook/:bibnum", async (req, res) => {
  const { bibnum } = req.params;

  // Validating input
  if (!bibnum) {
    return res.status(400).json({
      message: "Bibnum is required",
    });
  }

  var book = {};
  try {
    // Query the database to remove the book
    const result = await queryDatabase(
      "DELETE FROM LIBRARY_COLLECTION_INVENTORY WHERE BIBNUM = $1",
      [bibnum]
    );
    book.data = result;
  } catch (error) {
    console.error("Error executing query", error.stack);
    res.status(500).send("Error executing query");
    return;
  }
  res.status(200).json(book);
});


//app.post("/adminControl/removeBook", async (req, res) => {
  //const { bibnum, title, author, isbn, publicationyear, publisher, subjects, itemtype, itemcollection, floatingitem, itemlocation, reportdate, itemcount } =
    //req.body;
  //// vaidating input
  //if (!bibnum || !title || !author || !isbn || !publicationyear || !publisher || !subjects || !itemtype || !itemcollection || !floatingitem || !itemlocation || !reportdate || !itemcount) {
    //return res
      //.status(400)
      //.json({
        //message:
          //"Any Input Is Required",
      //});
  //}
  //var book = {};
  //try {
    ////query the database to add new book
    //const result = await queryDatabase(
      //"DELETE FROM LIBRAR_COLLECTION_INVENTORY WHERE (BIBNUM = $1 OR TITLE = $2 OR AUTHOR = $3 OR ISBN = $4 OR PUBLICATIONYEAR = $5 OR PUBLISHER = $6 OR SUBJECTS = $7 OR ITEMTYPE = $8 OR ITEMCOLLECTION = $9 OR FLOATINGITEM = $10 OR ITEMLOCATION = $11 OR REPORTDATE = $12 OR ITEMCOUNT = $13) RETURNING *",
      //[bibnum, title, author, isbn, publicationyear, publisher, subjects, itemtype, itemcollection, floatingitem, itemlocation, reportdate, itemcount]
    //);
    //book.data = result;
  //} catch (error) {
    //console.error("Error executing query", error.stack);
    //res.status(500).send("Error executing query");
    //return;
  //}
  //res.status(200).json(book);
  ////res.status(201).json({ message: 'Book added successfully', book: result[0] });
//});

app.post("/borrowBook", async (req, res) => {
  const { bibnum, user_id } = req.body;

  // Validate input data
  if (!bibnum || !user_id) {
    return res
      .status(400)
      .json({ message: "Missing required fields: bibnum, user_id" });
  }

  var book = {};

    //const checkBookResult = await queryDatabase(checkBookQuery, [bibnum]);
    try {
      //Check if the book is available (not checked out)
      const result = await queryDatabase(
        "SELECT checkedout FROM checkouts_by_title WHERE bibnum = $1 and checkedout=true",[bibnum]
      );

      if(result.length != 0)
        return res.status(400).json({ message: 'Book is already checked out' });
      //book.data = result;
      //const isCheckedOut = result.rows[0].checkedout;
    } catch (error) {
      console.error("Error executing query", error.stack);
      res.status(500).send("Error executing query");
      return;
    }

    // Borrow the book
    try {
      //Check if the book is available (not checked out)
      const bookId = parseInt(bibnum, 10);
      const result = await queryDatabase(
        "INSERT INTO checkouts_by_title (checkedout, title, author, subjects, publisher, publicationyear, user_id, bibnum, checkouttime, checkintime) SELECT true, lci.title, lci.author, lci.subjects, lci.publisher, lci.publicationyear, $1, lci.bibnum, current_timestamp, current_timestamp + interval '14 days' FROM library_collection_inventory lci LEFT JOIN checkouts_by_title cbt ON lci.bibnum = cbt.bibnum WHERE lci.bibnum = $2 RETURNING *",
        [user_id,bookId]
      );
      book.data = result;
    } catch (error) {
      console.error("Error executing query", error.stack);
      res.status(500).send("Error executing query");
      return;
    }
    res.status(200).json(book);

  /*const borrowResult = await borrowBook(bibnum, user_id);
    if (!borrowResult) {
      return res.status(500).json({ message: "Error borrowing book" });
    }

    // Success response
    return res.status(201).json({ message: "Book borrowed successfully" });
  } catch (error) {
    console.error("Error borrowing book:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }*/
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
      "SELECT * FROM checkouts_by_title WHERE USER_ID = $1 AND CHECKEDOUT=true",
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


app.get("/adminControl/getOverDue", async (req, res) => {

  try {
    // Query the database to retrieve borrowed books
    const result = await queryDatabase(
      "SELECT * FROM overdue_fines WHERE paid_status=false"
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "No Fines Due",
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


/************************************************************************************************************************************* */



////Arnav Workspace////


app.post('/user/returnBook', async (req, res) => {

  const { book_id} = req.body;
 const user_id = req.user.sub;// Assuming Keycloak token has sub as user ID
  bibnum = book_id;

 if (!bibnum) {
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
   const result = await queryDatabase('UPDATE checkouts_by_title SET checkintime = current_timestamp, checkedout = false WHERE checkedout=true AND bibnum=$1 AND user_id=$2 RETURNING *', [bibnum, user_id]);
   
   // to return all the remaining borrowed books data
   const userBorrowedBooks = await queryDatabase('SELECT * FROM checkouts_by_title WHERE user_id = $1 ', [user_id]);
   remainingBook.data = userBorrowedBooks;

   if (userBorrowedBooks.length === 0) {
     return res.status(404).json({ message: "All the borrowed books are returned" });
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





//Arvind workspace

app.post("/user/extendBook", async (req, res) => {

  const { book_id} = req.body;
  const user_id = req.user.sub;
  bibnum = book_id;


  if (!bibnum || !user_id) {
    return res.status(400).json({ message: "Both bibnum and user_id are required" });
  }

  var book = {};

  try {
    // Assuming extended is a boolean column in the BorrowedBooks table
    const result = await queryDatabase(
      "UPDATE checkouts_by_title SET checkintime = checkintime + interval '14 days' WHERE bibnum=$1 AND user_id =$2 RETURNING *",
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
  console.log(`Express app listening at http://localhost:${port}`);
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
