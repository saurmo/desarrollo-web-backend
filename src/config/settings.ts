export const setConfig = ()=>{
    process.env.PGUSER =  process.env.PGUSER || "postgres"
    process.env.PGPASSWORD =  process.env.PGPASSWORD || "VU1AC0yEOuvBB3xj8Lvl"
    process.env.PGHOST =  process.env.PGHOST || "containers-us-west-131.railway.app"
    process.env.PGDATABASE =  process.env.PGDATABASE  || "railway"
    process.env.PGPORT =  process.env.PGPORT || "5879"
}
