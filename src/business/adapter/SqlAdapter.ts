
import { readFileSync } from 'fs'

type Methods = "post" | "put" | "delete" | "getOne" | "get"

const sqlAdapter = (table: string, method: Methods) => {
    try {
        switch (method) {
            case "post":
                const pathFile = `./src/business/templates/sql/${table}-insert.sql`
                const queryBuffer = readFileSync(pathFile)
                return queryBuffer.toString();
            case "put":
                return readFileSync(`./src/business/templates/sql/${table}-update.sql`).toString();
            case "delete":
                return readFileSync(`./src/business/templates/sql/${table}-delete.sql`).toString();
            case "getOne":
                return readFileSync(`./src/business/templates/sql/${table}-get-one.sql`).toString();
            default:
                return readFileSync(`./src/business/templates/sql/${table}-get.sql`).toString();

        }
    } catch (error) {
        return null
    }

}

export default sqlAdapter