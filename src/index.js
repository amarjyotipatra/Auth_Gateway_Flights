const express = require('express');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const apiRoutes = require('./routes');
const { ServerConfig } = require('../src/config');

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 5, // Limit each IP to 5 requests per `window` (here, per 10 minutes)
})

app.use(limiter);

app.use('/flightsServices', createProxyMiddleware({ 
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    pathRewrite: {'^/flightsService' : '/'} 
    }));
app.use('/bookingServices', createProxyMiddleware({
     target: ServerConfig.BOOKING_SERVICE,
      changeOrigin: true,
      pathRewrite: {'^/bookingServices' : '/'}
    }));

app.use("/api",apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
