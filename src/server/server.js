const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();

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
                    res.status(200).json({result : true , token: newToken})
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
        res.status(200).json({result : true })
      } else {
        res.status(401).json({error: 'Not authorized' });
      }
    
});