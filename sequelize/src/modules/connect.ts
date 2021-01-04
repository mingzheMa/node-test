import User from "./User";
import Book from "./Book";
import BookSort from "./BookSort";

// 书，书的类型
BookSort.hasMany(Book, {
  foreignKey: "id"
});
Book.belongsTo(BookSort);

// 用户，书，借书
User.belongsToMany(Book, { through: "Borrows" });
Book.belongsToMany(User, { through: "Borrows" });
