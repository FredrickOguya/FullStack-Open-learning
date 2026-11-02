import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL)
export const db = drizzle(process.env.DATABASE_URL!, { schema, logger: true })