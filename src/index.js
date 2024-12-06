const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('./router/router');
const path = require('path');
const { engine } = require('express-handlebars');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(morgan('short'));
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');
app.use(
  session({
    secret: 'seu-segredo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Defina como true se estiver usando HTTPS
  }),
);
app.use(router);
//app.use(express.static(path.join(__dirname, 'public')));

app.engine(
  'handlebars',
  engine({
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: 'main',
  }),
);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
