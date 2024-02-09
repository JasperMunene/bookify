import express from 'express';
import pg from 'pg';
import cors from 'cors'
import env from 'dotenv'

const app = express();
const port = process.env.PORT || 3000
env.config();

//middleware
app.use(cors());
app.use(express.json());

//Databse connection
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
});

db.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send('Hello world!')
})

//Route to get all books in the database
app.get('/books', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM books');
        const books = result.rows;
        const count = books.length;

        res.status(200).json({
            books,
            count,
        });
    } catch (error) {
        console.error('Error fetching all books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to filter books by category
app.get('/books/filter', async (req, res) => {
    try {
        let { category } = req.query;

        if (!category) {
            return res.status(400).json({ error: 'Please provide a category parameter in the query string' });
        }

        
        category = category.toLowerCase();

        const result = await db.query('SELECT * FROM books WHERE LOWER(category) = $1', [category]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No books found for the specified category' });
        }

        res.status(200).json({
            message: 'Books filtered by category successfully',
            books: result.rows,
        });
    } catch (error) {
        console.error('Error filtering books by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Route to upload a book to the database
app.post('/upload-book', async (req, res) => {
    try {
        const { booktitle, authorname, imageURL, category, bookdescription, bookpdfURL } = req.body;

        await db.query('INSERT INTO books (booktitle, authorname, imageURL, category, bookdescription, bookpdfURL) VALUES ($1, $2, $3, $4, $5, $6)', [
            booktitle, authorname, imageURL, category, bookdescription, bookpdfURL
        ]);

        res.status(201).json({ message: 'Book uploaded successfully!' }); 
    } catch (error) {
        console.error('Error uploading book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//ROUTE FOR UPDATING A BOOK
app.put("/update-book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { booktitle, authorname, imageURL, category, bookdescription, bookpdfURL } = req.body;

        if (!booktitle || !authorname || !imageURL || !category || !bookdescription || !bookpdfURL) {
            return res.status(400).send("Please provide at least one field to update.");
        }

        let updateFields = '';
        const values = [];

        if (booktitle) {
            updateFields += 'booktitle = $1, ';
            values.push(booktitle);
        }

        if (authorname) {
            updateFields += 'authorname = $2, ';
            values.push(authorname);
        }

        if (imageURL) {
            updateFields += 'imageURL = $3, ';
            values.push(imageURL);
        }

        if (category) {
            updateFields += 'category = $4, ';
            values.push(category);
        }

        if (bookdescription) {
            updateFields += 'bookdescription = $5, ';
            values.push(bookdescription);
        }

        if (bookpdfURL) {
            updateFields += 'bookpdfURL = $6, ';
            values.push(bookpdfURL);
        }

        // Remove the trailing comma and space
        updateFields = updateFields.slice(0, -2);

        const result = await db.query(
            `UPDATE books SET ${updateFields} WHERE id = $${values.length + 1}`,
            [...values, id]
        );

        if (result.rowCount === 1) {
            res.status(200).json({ message: 'Book updated successfully!' });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({
            message: 'Book deleted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`)
})