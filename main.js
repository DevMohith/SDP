const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const $book = require('./Book.js');

// Middleware to parse JSON requests
app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'libraryNeub',
  password: 'root',
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
app.get('/', (req, res) => {
  res.send('Welcome to the Express app!');
});

// Test endpoint 1
app.get('/test1', (req, res) => {
  res.send('This is test endpoint 1');
});

// Test endpoint 2
app.post('/test2', (req, res) => {
  const data = req.body;
  res.send(`Received data: ${JSON.stringify(data)}`);
});

// Test endpoint 3
app.put('/test3', (req, res) => {
  const data = req.body;
  res.send(`Updated data: ${JSON.stringify(data)}`);
});

// Endpoint to add a book
app.post('/add_book', async (req, res) => {
  const data = req.body;
  try {
    const result = await queryDatabase(
      'INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *',
      [data.title, data.author, data.year]
    );
    res.json(result[0]);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Error executing query');
  }
});

// Endpoint to delete a book by ID
// app.delete('/delete_book/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await queryDatabase('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
//     if (result.length === 0) {
//       res.status(404).send('Book not found');
//     } else {
//       res.send(result[0]);
//     }
//   } catch (error) {
//     console.error('Error executing query', error.stack);
//     res.status(500).send('Error executing query');
//   }
// });

// Endpoint to get all books from PostgreSQL
app.get('/get_books', async (req, res) => {
  //get the data from the req
  const data = req.body;
  //create a variable to store the result
  var t = {};

  try {
    //query the database to get all books
    const result = await queryDatabase('SELECT * FROM Books', []);
    t.data = result;
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).send('Error executing query');
    return;
  }

  //send back whatever is in t
  res.json(t);
});


// Endpoint to get all books from PostgreSQL
app.post('/updateBooks/:id', async (req, res) => {
  
  const { id} = req.params;
  //const id=req.params.id;

  //get the data from the req
  const data = req.body;
  var title=data.title;
  //create a variable to store the result
  var t = {};

console.log(`This ednpoint will update book with id ${id} and set its title to ${title}`);

  //try {
    //query the database to get all books
    //const result = await queryDatabase('UPDATE Books set title=$1 where id=$2', [title,id]);
    //t.data = result;
  //} catch (error) {
   // console.error('Error executing query', error.stack);
   // res.status(500).send('Error executing query');
   // return;
  //}

  //send back whatever is in t
  res.json(t);
});

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