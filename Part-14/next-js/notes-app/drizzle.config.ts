
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import fs from "node:fs";

dotenv.config({ path: ".env.local" });

const ca = fs.readFileSync("./certificates/ca.pem", "utf8");

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    ssl: {
      ca,
    },
  },
});
