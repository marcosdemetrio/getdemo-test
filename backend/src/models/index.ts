import { Sequelize } from 'sequelize';
import createDemoModel from './demo';
import createFrameModel from './frame';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

const Demo = createDemoModel(sequelize);
const Frame = createFrameModel(sequelize);

Demo.hasMany(Frame, { as: 'frames', foreignKey: 'demoId' });
Frame.belongsTo(Demo, { as: 'demo', foreignKey: 'demoId' });

export {
  sequelize,
  Demo,
  Frame
};
