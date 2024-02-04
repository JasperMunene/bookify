import express from 'express';
import pg from 'pg';
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3000

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})


app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`)
})