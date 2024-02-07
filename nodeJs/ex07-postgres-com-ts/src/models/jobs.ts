import { BelongsToManyAddAssociationMixin, BelongsToManyCountAssociationsMixin, BelongsToManyRemoveAssociationMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { candidatesInstance } from "./candidates";

interface JobInterface extends Model {
  id: number;
  title: string;
  description: string;
  limitDate: Date;
  companyId: number;
  addCandidate: BelongsToManyAddAssociationMixin<candidatesInstance, number>;
  removeCandidate: BelongsToManyRemoveAssociationMixin<candidatesInstance, number>;
  countCandidates: BelongsToManyCountAssociationsMixin
}

export const Job = sequelize.define<JobInterface>("jobs", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  limitDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "companies",
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT"
  }
});
