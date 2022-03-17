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

app.get("/users", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "application/json");
    fs.readFile("./data.json", "utf-8", (err, data) => {
        if (!err) {
            const result = JSON.parse(data);
            res.send(result);
        } else {
            console.log(err);
        }
    });
});




app.post("/login", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "application/json");
    const { password, login } = req.body;
    fs.readFile("./login-passwords.json", "utf-8", (err, data) => {
        if (!err) {
          const result = JSON.parse(data);
          const needUser = result.find(item => item.login === login)
          if(needUser){
              needUser.password === password ? res.send(true):res.send(JSON.stringify("Неверный пароль"))
          }else {
              res.send(JSON.stringify('Пользователя с таким логином не существует .'))
          }
        } else {
          console.log(err);
        }
      });
    });