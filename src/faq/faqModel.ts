import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize as db } from '../config/dbconfig';


interface FaqAttributes {
    id: number;
    question: string;
    answer: string;
    createdAt?: string;
    updatedAt?:string;
}

type FaqCreationAttributes = Optional<FaqAttributes, 'id'>;

export class FaqModel extends Model<FaqAttributes, FaqCreationAttributes> {}

FaqModel.init({
   id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   question: {
    type: DataTypes.TEXT,
    allowNull: false
   },
   answer: {
    type: DataTypes.TEXT,
    allowNull: false
   }, 
},{
    sequelize: db,
    tableName: "faqs",
    modelName: "Faq"
});



