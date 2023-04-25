export const setConfig = ()=>{
    process.env.PGUSER =  process.env.PGUSER || "postgres"
    process.env.PGPASSWORD =  process.env.PGPASSWORD || "M4l9ARVwp2RGFsasFZ4e"
    process.env.PGHOST =  process.env.PGHOST || "containers-us-west-100.railway.app"
    process.env.PGDATABASE =  process.env.PGDATABASE  || "railway"
    process.env.PGPORT =  process.env.PGPORT || "7306"
}
