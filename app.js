const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let items = []; 

app.get("/", function (req, res) {
    res.render("list", { ejes: items }); 
});

app.post("/", function (req, res) {
    const newItem = {
        text: req.body.ele1,
        done: false
    };
    items.push(newItem);
    res.redirect("/");
});


app.post("/toggle", function (req, res) {
    const index = req.body.index;
    if (items[index]) {
        items[index].done = !items[index].done;
    }
    res.redirect("/");
});

app.listen(8000, function () {
    console.log("Server started on port 8000");
});
