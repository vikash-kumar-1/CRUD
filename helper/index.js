
module.exports= require('knex')({
    client:'mysql',
    connection:{
        host:'78.46.173.229',
        port:3306,
        user:'root',
        password:'GermanMemsql',
        database:'cloudedh'
    }
});