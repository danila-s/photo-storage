const fs = require("fs");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

const IMAGES_FOLDER = `${__dirname}/./static/images`;
const DATA_FOLDER = `${__dirname}/./static/data`;

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



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
        const { id } = req.params;
        const json = fs.readFileSync(`${DATA_FOLDER}/gallery.json`);
        const data = JSON.parse(json);
        data[id] = file.originalname;
        fs.writeFileSync(`${DATA_FOLDER}/gallery.json`, JSON.stringify(data));
        cb(null, file.originalname);
    }
});
const galleryUpload = multer({ storage: galleryStorage });


app.get('/gallery', (req, res) => {
    const json = fs.readFileSync(`${DATA_FOLDER}/gallery.json`);
    res.send(json);
})

app.post('/gallery/:id', galleryUpload.single('upload-image'), (req, res) => {
    console.log(req.body.description)
    res.send('Файл загружен')
})


