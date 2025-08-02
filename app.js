const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let items = [];
let editIndex = -1; 
app.get("/", function (req, res) {
    res.render("list", { ejes: items, editIndex: editIndex });
    editIndex = -1;
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
app.post("/edit", function (req, res) {
    editIndex = parseInt(req.body.index);
    res.redirect("/");
});
app.put("/edit/:index", function (req, res) {
    const index = req.params.index;
    if (items[index]) {
        items[index].text = req.body.updatedText;
    }
    editIndex = -1;
    res.redirect("/");
});
app.delete("/delete/:index", function (req, res) {
    const index = req.params.index;
    if (items[index]) {
        items.splice(index, 1);
    }
    res.redirect("/");
});
app.listen(8000, function () {
    console.log("Server started on port 8000");
});
