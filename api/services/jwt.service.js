const jsonwebtoken = require('jsonwebtoken');

const SECRET_KEY= '!!#f!>,u^z{yzhEk}zt:VD=fMJVtdB@jkSm`@md*NAU@GC<3n/%[jgsyP`jR>TB.GhWDX3#SyL/9a/K)y.U_{H*-sz:u63:Z[&pYQp?+TdZxvhWbkHJUJ[Fp*CQ>'

const crearToken = (payload) => {

    return jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: 60*60*60 } )
    
}

const validarToken = (token) => {
    return jsonwebtoken.verify(token,SECRET_KEY)
}

module.exports = {crearToken, validarToken}