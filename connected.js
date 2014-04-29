var connect = require('connect');
var staticServe = require('serve-static');

var app = connect();
app.use(staticServe(__dirname + '/public'));
app.listen(9004);
