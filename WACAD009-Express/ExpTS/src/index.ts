import path from 'node:path';
import dotenv from 'dotenv';
import express from 'express';
import { engine } from 'express-handlebars';
import { accessLogger, LogFormat } from './middlewares/accessLogger';
import router from './router/router';
import validateEnv from './utils/validateEnv';
import helpers from './views/helpers/helpers';

dotenv.config();
const env = validateEnv();
const app = express();
const viewsDirectory = path.join(process.cwd(), 'src', 'views');

app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    layoutsDir: path.join(viewsDirectory, 'layouts'),
    helpers,
  }),
);
app.set('view engine', 'handlebars');
app.set('views', viewsDirectory);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/css', express.static(path.join(process.cwd(), 'public', 'css')));
app.use(accessLogger(env.LOG_FORMAT as LogFormat, env.LOG_DIR));
app.use(router);
app.use((req, res) => {
  res.status(404).render('main/error', {
    title: 'Página não encontrada',
    message: 'A rota solicitada não existe.',
  });
});

app.listen(env.PORT, () => {
  console.log(`Express app iniciada na porta ${env.PORT}.`);
});
