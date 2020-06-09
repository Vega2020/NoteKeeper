# NoteTaker
Note taker app for U of A full stack bootcamp unit 11

# Description
This is a simple app for making and storing notes. The app uses an Express server as a back end.

# Learning goals:
This project is about learning to set up a functioning express server. The app only uses the server to send and receive simple blocks of text, but this is teaching us how to use express to set up a website/app.

# Process notes:
1: Opening html files in browser and inspecting them with chrome tools led to the realization that the css and js files were not loading. The "/" at the beginning of their file paths needed to be removed.

2: After outlining the required ajax calls from the instructions in the apiroutes.js file, I am getting the error message that my access is blocked by CORS policy. This makes sense because I have not actually filled in the ajax calls yet, so I'm just encouraged that the browser is attempting to read them.

3: The ajax calls are loading the html files, but I am getting a MIME error related to the css sheet. Stack overflow says that the server is trying to provide an html file when the browser is looking for a css file, but I haven't been able to solve the problem this way.

4: Still getting errors in the ajax calls. Having trouble getting the js files to route correctly. Getting an error from line 1 of the js file that makes me think there's a conflict in how the js is trying to load it
