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
    port: parseInt(process.env.DB_PORT) || 5432,
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
//Route to upload a book to the database
app.post('/upload-book', async (req, res) => {
    try {
        const { booktitle, authorname, imageURL, category, bookdescription, bookpdfURL } = req.body;

        await db.query('INSERT INTO books (booktitle, authorname, imageURL, category, bookdescription, bookpdfURL) VALUES ($1, $2, $3, $4, $5, $6)', [
            booktitle, authorname, imageURL, category, bookdescription, bookpdfURL
        ]);

        res.status(200).json({ message: 'Book uploaded successfully!' });
    } catch (error) {
        console.error('Error uploading book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/all-books', async (req, res) => {
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


app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`)
})