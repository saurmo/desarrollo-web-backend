import { DataSource } from "typeorm"

const myDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || "5879"),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: ["src/entities/*.ts"],
    logging: true,
    synchronize: true,
})
export default myDataSource;