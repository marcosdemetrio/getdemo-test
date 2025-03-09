import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './models/index';
import demoRoutes from './routes/demoRoutes';
import frameRoutes from './routes/frameRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use('/demos', demoRoutes);
app.use('/frames', frameRoutes);

export default app;
