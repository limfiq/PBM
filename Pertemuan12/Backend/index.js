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

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
