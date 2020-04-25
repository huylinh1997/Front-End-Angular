//Install express server
const express = require('express');
const path = require('path');
 
const app = express();
 
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/WebApp'));
 
app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/WebApp/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

