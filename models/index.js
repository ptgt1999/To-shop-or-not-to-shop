// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'categoryID',
  onDelete: 'CASCADE',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'categoryID',
  onDelete: 'Cascade',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(tag, {
  through: ProductTag,
  foreignKey: 'productId',
  onDelete: 'CASCADE',
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'tagId',
  onDelete: 'CASCADE',
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
