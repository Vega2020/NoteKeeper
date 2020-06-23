//this file is going to hold our get/post/push/delete functions

// Dependencies

const express = require("express");
const path = require("path");
const fs = require("fs");
//const store = require("store");
const { v4: uuidv4 } = require('uuid');

//we need to create the server in here:

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing, commented out to make sure they're not breaking anything
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//app.use("/api", apiRoutes);
//app.use("/", htmlRoutes);
//the above lines are another version of what I already have?

//ROUTES:

//HTML ROUTES:

app.get("/", function(req, res) {
  res.json(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    console.log("notes.html sent");
  });

//API ROUTES:

//get notes route
app.get("/api/notes", function(req, res) {
 //Should read the `db.json` file and return all saved notes as JSON
 fs.readFile(__dirname + "/db/db.json", (err, data) => {
   if (err) throw err;
   // set the data from db.json as a variable, 
   let db = JSON.parse(data);
   //then return the variable
   res.send(db);
 });
});

//post route
app.post("/api/notes", function(req, res) {
    //Should receive a new note to save on the request body, 
    let newNoteId = uuidv4();
    let newNote = {
      id: newNoteId,
      title: req.body.title,
      text: req.body.text
    };

    console.log(newNote);

    fs.readFile(__dirname + "/db/db.json", (err, data) => {
      //add it to the `db.json` file, 
      if (err) throw err;
      let db = JSON.parse(data);
      db.push(newNote);
      
      //and then return the new note to the client.
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(db), (err, data) => {
        if (err) throw err;
        res.send(data);
      });
    });
});

// function deleteNote(id) {
//   return $.ajax({
//     url: "api/notes/" + id,
//     method: "DELETE"
//   });
// };
// deleteNote(req.params.id)
// .then(() => res.json({ok: true}))
// .catch(err => res.status(500).json(err));

app.delete("/api/notes/:id", function(req, res) {
  //In order to delete a note, you'll need to read all notes from the `db.json` file

  fs.readFile("db/db.json", (err, data) => {
    let db = JSON.parse(data);
    //Should receive a query parameter containing the id of a note to delete.
      let savedNote = db.filter((item) => item.id !== req.params.id);
      fs.writeFile("db/db.json", JSON.stringify(savedNote, null, 2), (err) => {
        if (err) throw err;
        res.send(req.body);
      });
    });
    //remove the note with the given `id` property,
    //and then rewrite the notes to the `db.json` file.
});


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  console.log("index.html sent");
});


//this tells the server to start listening and logs a notice that it is on
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


  //questions for tutor/teacher: why is index.html sending three times every time notes.html sends? why is it getting the < syntaxerror from js line 1 (Answer: the html file was looking for the javascript in the wrong place)? Why was the CSS turning off the save icon???