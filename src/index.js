const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connectDB  = require("./db/db.config");
const auth_routes=  require("./routes/auth_routes");
const contact_routes=  require("./routes/contact_routes");

connectDB();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/auth", auth_routes);
app.use("/contact", contact_routes);

module.exports = app;
