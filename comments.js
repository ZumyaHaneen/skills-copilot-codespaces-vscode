//create web server
const express = require('express');
const app = express();
const port = 3000;

//set up the server to serve static files
app.use(express.static('public'));

//set up the server to parse JSON body
app.use(express.json());

//set up server to parse form data
app.use(express.urlencoded({ extended: true }));

//create a route that listens for POST requests to /comments
app.post('/comments', (req, res) => {
  console.log('POST request to /comments');
  console.log(req.body);
  res.json({ msg: 'Comment received' });
});

//start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
//end of comments.js
// Path: index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Comments</title>
  </head>
  <body>
    <h1>Comments</h1>
    <form id="comment-form">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div>
        <label for="comment">Comment</label>
        <textarea id="comment" name="comment"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div id="response"></div>
    <script src="app.js"></script>
  </body>
</html>
//end of index.html
// Path: app.js
//get the form
const form = document.getElementById('comment-form');

//event listener for form submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  //get the form data
  const formData = new FormData(form);

  //send the form data to the server
  const response = await fetch('/comments', {
    method: 'POST',
    body: formData,
  });

  //get the server response
  const data = await response.json();

  //add the server response to the page
  const responseDiv = document.getElementById('response');
  responseDiv.innerHTML = `<p>${data.msg}</p>`;
});
//end of app.js
// Path: styles.css
body {
  font-family: Arial, sans-serif;
}
form {
  margin-bottom: 20px;
}
label {
  display: block


