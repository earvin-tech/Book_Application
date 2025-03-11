const { databaseConnect } = require("../Utils/database");
const { app } = require("./server");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    databaseConnect();
});