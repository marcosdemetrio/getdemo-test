import { Model, DataTypes, Sequelize } from 'sequelize';

interface FrameAttributes {
  id?: string; 
  html: string;
  order: number;
  demoId: string;
}

export class Frame extends Model<FrameAttributes> implements FrameAttributes {
  public id!: string; 
  public html!: string;
  public order!: number;
  public demoId!: string;

  static initModel(sequelize: Sequelize): typeof Frame {
    return Frame.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        html: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        demoId: {
          type: DataTypes.UUID,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Frame'
      }
    );
  }
}

export default (sequelize: Sequelize): typeof Frame => Frame.initModel(sequelize);
