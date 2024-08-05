import { sequelize } from "./db";
import app from "./app";
import "./Models/index";

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  app.listen(3000, () => console.log("Server running on port 3000"));
})();
