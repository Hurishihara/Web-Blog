import express from "express"
import bodyParser from "body-parser";


const app = express();
const port = 3000



app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));


const posts = [];

app.use((req, res, next) => {
    res.locals.postLength = posts.length;
    res.locals.content = posts;
    res.locals.posts = posts;
    
    next();
});


app.get("/", (req, res) => {
    
    res.render("partials/post.ejs");
})

app.get("/create", (req, res) => {
    res.render("partials/post.ejs");
})

app.get("/home", (req, res) => {
    res.render("index.ejs");
})

app.get("/view", (req, res) => {
    
    const index = req.query.index
    res.render("partials/view.ejs", {index: index, specificContent: posts[index]});
})

app.get("/edit", (req, res) => {
    const editedContentIndex = req.query.index;
    res.render("partials/edit.ejs", {index: editedContentIndex});
})
 

app.post("/submit", (req, res) => {
    
    
    let enteredContent = req.body["postContent"];
    let numberOfPost = posts.length;
    if(enteredContent !== ""){
        posts.push(enteredContent);
    } 
    res.render("index.ejs");
})

app.post("/delete", (req, res) => {
    const contentId = req.body.contentId
    if(contentId >= 0 && contentId < posts.length){
        posts.splice(contentId, 1)
    }
    res.render("index.ejs")
})

app.post("/save", (req, res) => {
    const newContent = req.body["editedContent"];
    const newContentIndex = req.body["editedContentIndex"];

    if(newContent !== ""){
        if(newContentIndex >= 0 && newContentIndex < posts.length){
            posts[newContentIndex] = newContent;
            res.render("index.ejs");
        }
    } else {
        res.redirect("/home");
    }
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  

  