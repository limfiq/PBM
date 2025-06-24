const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'kunci_rahasia';

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema dan model User
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
});
const User = mongoose.model('User', userSchema);

// Endpoint register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username sudah terdaftar' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.json({ message: 'Registrasi berhasil' });
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

// Endpoint login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Login gagal' });
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String
});
const Book = mongoose.model('Book', bookSchema);

// Middleware autentikasi JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token tidak valid' });
        req.user = user;
        next();
    });
}

// CREATE book
app.post('/books', authenticateToken, async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const newBook = new Book({ title, author, year });
        await newBook.save();
        res.json({ message: 'Buku berhasil ditambahkan', book: newBook });
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

// READ all books
app.get('/books', authenticateToken, async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

// UPDATE book
app.put('/books/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, author, year } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, year },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }
        res.json({ message: 'Buku berhasil diupdate', book: updatedBook });
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

// DELETE book
app.delete('/books/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }
        res.json({ message: 'Buku berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
