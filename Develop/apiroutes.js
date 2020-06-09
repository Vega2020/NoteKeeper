//this file is going to hold our get/post/push/delete functions

// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

//we need to create the server in here:

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing, commented out to make sure they're not breaking anything
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//app.use("/api", apiRoutes);
//app.use("/", htmlRoutes);
//the above lines are another version of what I already have?

//ROUTES:

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    console.log("notes.html sent");
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
    console.log("index.html sent");
  });

app.get("/api/notes", function(req, res) {
 //Should read the `db.json` file and return all saved notes as JSON
 fs.readFile(__dirname + "/db/db.json", (err, data) => {
   if (err) throw err;
   // set the data from db.json as a variable, 
   let db = JSON.parse(data);
   res.send(db);
   //then return the variable
 });
});


//app.post("/api/notes", function(req, res) {
    // Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. commented out for test purposes
    //let newNote = {
        //title: req.body.title,
        //body: req.body.body,
    //}

    //newNote.id = uuidv4() //add a randomizer here

//});

//app.delete("/api/notes:id", function(req, res) {
    // Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
//})



//this tells the server to start listening and logs a notice that it is on
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });




  //questions for tutor/teacher: why is index.html sending three times every time notes.html sends? why is it still not loading the css? why is it getting the < syntaxerror from js line 1?