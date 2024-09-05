import app from "./app.js";
import { sequelize } from "./database/database.js";
import "./models/Project.js";
import "./models/Task.js";

async function main() {
  try {
    await sequelize.sync({ force: false });
    app.listen(5000);
    console.log("Server listening on port", 5000);
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

main();
