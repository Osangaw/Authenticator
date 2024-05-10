import express from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import collection from'./src/config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send('User already exists. Please use a different username');
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertOne(data);
        console.log(userdata);
    }
});

app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send('Username not found');
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render('home');
        } else {
            res.send('Wrong password');
        }
    } catch {
        res.send('Wrong details');
    }
});

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});