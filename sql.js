import Sequelize from "sequelize";
import express from "express";

const sequelize = new Sequelize("shop", "root", "PFvenrf33", {
  host: "127.0.0.1",
  dialect: "mysql",
});

const PORT = 3000;
const app = express();

const Customer = sequelize.define(
  "customer",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: Sequelize.STRING(128),
    productID: Sequelize.MEDIUMINT.UNSIGNED,
  },
  { tableName: "customer", timestamps: false }
);

const Product = sequelize.define(
  "product",
  {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    product: Sequelize.STRING(128),
    price: Sequelize.MEDIUMINT.UNSIGNED,
    rating: Sequelize.DECIMAL(3, 2),
    category: Sequelize.STRING(128),
    brand: Sequelize.STRING(64),
  },
  { tableName: "product", timestamps: false }
);

Customer.hasOne(Product, { foreignKey: "id", sourceKey: "productID" });
Product.belongsTo(Customer, { foreignKey: "productID", targetKey: "id" });

app.get("/", (req, res) => {
  Customer.findAll({
    where: { name: ["Mike", "Bob"] },
    include: [
      {
        model: Product,
        attributes: ["product", "price"],
      },
    ],
  })
    .then((users) => {
      const usersHtml = users.map(
        (user) => `
<div style="width: 400px; border: 1px solid #0000FF; margin: 10px; padding: 10px">
  <span style="font-weight: bold; color: blue">${user.dataValues.name}</span>
  <span>Product: ${user.dataValues.product.product}</span>
  <span>Price: ${user.dataValues.product.price}</span>
</div>
      `
      );
      res.send(usersHtml.join(""));
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(3000, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
