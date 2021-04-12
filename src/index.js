const express = require('express');
const app = express();

const handleErrors = require('./middlewares/handle_errors');

const usersRouter = require('./routers/users_router');
const partiesRouter = require('./routers/parties_router');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/user', usersRouter);
app.use('/party', partiesRouter);

app.use(handleErrors);

app.listen(3000, () => {
  console.log('Run on http://localhost:3000');
});
