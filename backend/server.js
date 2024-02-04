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


app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`)
})