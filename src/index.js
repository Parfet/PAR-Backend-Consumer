const express = require('express');
const app = express();

const usersRouter = require('./routers/users_router');
const partiesRouter = require('./routers/parties_router');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/user', usersRouter);
app.use('/party', partiesRouter);

app.listen(3000, () => {
  console.log('Run on http://localhost:3000');
});
