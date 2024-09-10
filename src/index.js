import app from "./app.js";
import { sequelize } from "./database/database.js";
import "./models/Laboratories.js";
import "./models/Computers.js";

async function main() {
  try {
    await sequelize.sync({ force: true });
    app.listen(5000);
    console.log("Server listening on port", 5000);
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

main();
