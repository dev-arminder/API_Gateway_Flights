const express = require('express');
const app = express();
const { serverConfig } = require('./config')
const { rateLimit } = require('express-rate-limit')
const apiRoutes = require('./routes')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 2,
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes)

app.listen(serverConfig.PORT, () => {
  console.log(`Server Started On Port - ${serverConfig.PORT}`)
})