const express = require('express');

const app = express();

const apiRoutes = require('./routes');
const { ServerConfig } = require('../src/config');

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/",apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
