require('dotenv').config();

console.log(process.env.NODE_ENV);
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/routes');
const errorHandler = require('./errors/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/Logger');

const { PORT, MONGO_URL } = require('./utils/config');

const app = express();

app.use(cors({
  origin: ['*'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // из celebrate
app.use(errorHandler); // центральный обработчик ошибок

async function main() {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.listen(PORT, () => {
    console.log(`Cлушаем ${PORT} порт`);
  });
}

main();
