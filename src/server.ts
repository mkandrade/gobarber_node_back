import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import './database';

const app = express();

// Para que a aplicação entenda o formato JSON nas requisições
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('😆 🚀 Server started on port: 3333');
});
