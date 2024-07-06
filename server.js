const express = require('express');
const articleRouter = require("./routes/articles");
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogWebsite");
}

const port = process.env.PORT || 3000;  

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'});
    res.render('articles/index', { articles: articles });
})

app.use('/articles', articleRouter);


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});