import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './sequelize';

interface ProductAttributes {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

class ProductModal extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public quantity!: number;
}

ProductModal.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'products'
});

export default ProductModal;