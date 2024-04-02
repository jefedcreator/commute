const express = require('express');
const cors = require('cors');
const http = require('http');
const createError = require('http-errors');
const mongoose = require('mongoose');
const config = require('./config/index');
const router = require('./routes')
const app = express();

const PORT = process.env.PORT || 3000
const db = config.MONGODB_URI

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

//Catch 404 and forard to error handler 
app.use((req,res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
// set locals, only providing error in development
res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
// render the error page
res.status(err.status || 500);
res.send({
  status: 'ERROR',
  message: err.message,
  payload: { ...err }
});
});

//Connect to db 
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>console.log('Mongodb Connected'))
    .catch(err=>console.log(err));

app.listen(PORT, () =>
  console.log(`Campusride server is live on port http://0.0.0.0.:${PORT}`)
);
