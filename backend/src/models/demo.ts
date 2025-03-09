import { Model, DataTypes, Sequelize } from 'sequelize';

interface DemoAttributes {
  id: string;
  name: string;
}

export class Demo extends Model<DemoAttributes> implements DemoAttributes {
  public id!: string;
  public name!: string;

  static initModel(sequelize: Sequelize): typeof Demo {
    Demo.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Demo'
      }
    );
    return Demo;
  }
}

export default (sequelize: Sequelize): typeof Demo => Demo.initModel(sequelize);