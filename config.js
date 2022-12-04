import dotenv from "dotenv";

dotenv.config();

const { PORT, pgConnection } = process.env;

export var  port = PORT
export var  urlConnection = pgConnection

