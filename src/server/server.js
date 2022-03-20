const fs = require("fs");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mysql = require('mysql');
const app = express();

const IMAGES_FOLDER = `${__dirname}/./static/images`;
const DATA_FOLDER = `${__dirname}/./static/data`;
const WAY_TO_IMG = `http://localhost:8000/images/gallery/`

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'imgstorage'
});
connection.connect((err) => {
    if (!err) {
        console.log("SUCCESS");
    }
});




app.listen(8000, () => {
    console.log("Server has been started , port 8000 ");
});

let tokens = [];

function getRandomString() {
    let resString = '';
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const length = Math.floor(10 + Math.random() * 1000);
    for (let i = 0; i < length; i++) {
        resString += letters[Math.floor(Math.random() * (letters.length - 1))];
    }
    return resString;
}



app.post("/login", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "application/json");
    const { password, login } = req.body;
    fs.readFile("./login-passwords.json", "utf-8", (err, data) => {
        if (!err) {
            const result = JSON.parse(data);
            const needUser = result.find(item => item.login === login)
            if (needUser) {
                if (needUser.password === password) {
                    tokens = tokens.filter(token => token.login !== login);
                    const newToken = getRandomString();
                    tokens.push({ login: login, token: newToken });
                    res.status(200).json({ result: true, token: newToken })
                } else {
                    res.status(401).json("Неверный пароль")
                }
            } else {
                res.status(400).json('Пользователя с таким логином не существует .')
            }
        } else {
            console.log(err);
            res.status(404);
        }
    });
});

app.post("/token", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "application/json");
    const { token } = req.body;
    const isTokenValid = tokens.find((t) => t.token === token);
    if (isTokenValid) {
        res.status(200).json({ result: true })
    } else {
        res.status(401).json({ error: 'Not authorized' });
    }

});


const galleryStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${IMAGES_FOLDER}/gallery`);
    },
    filename: function (req, file, cb) {
        connection.query(`
  INSERT INTO images (link, description)
  VALUES ('${WAY_TO_IMG + file.originalname}', '${req.body.description}');
`,
            (err, data) => {
                if (!err) {
                    console.log(data);
                }
            });

        console.log(req.body.description)
        cb(null, file.originalname);
    }
});
const galleryUpload = multer({ storage: galleryStorage });


app.get('/gallery', (req, res) => {
    connection.query('SELECT link , description FROM images',
        (err, data) => {
            if (!err) {
                res.send({ link: data[data.length - 1].link, description: data[data.length - 1].description });
            }
        });
})

app.post('/gallery', galleryUpload.single('upload-image'), (req, res) => {
    res.send('Файл загружен')
})