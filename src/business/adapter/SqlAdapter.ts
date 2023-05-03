
import { readFileSync } from 'fs'

type Methods = "post" | "put" | "delete" | "getOne" | "get"
const sqlAdapter = (table: string, method: Methods) => {


    switch (method) {
        case "post":
            return readFileSync(`./src/bussiness/template/sql/${table}-insert.sql`).toString();
        case "put":
            return readFileSync(`./src/bussiness/template/sql/${table}-update.sql`).toString();
        case "delete":
            return readFileSync(`./src/bussiness/template/sql/${table}-delete.sql`).toString();
        case "getOne":
            return readFileSync(`./src/bussiness/template/sql/${table}-get-one.sql`).toString();
        default:
            return readFileSync(`./src/bussiness/template/sql/${table}-get.sql`).toString();

    }

}

export default sqlAdapter