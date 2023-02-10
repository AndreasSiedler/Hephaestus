import app from "./api/index";
import dotenv from "dotenv";

dotenv.config();

app.listen(4000, () => console.info("Server started"));
