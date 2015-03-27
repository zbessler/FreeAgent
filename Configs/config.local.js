var url = '162.209.107.84';
var port = 9001;


module.exports = {
    env: 'local',
    url: url,
    port: port,

    database: { 
        username: 'root',
        password: '',
        host: 'localhost',
        port: 3306,
        database_name: 'FreeAgent',
        dialect: 'mysql' // Can be mysql, sqllite, mariadb, or postgress
    },

    console_level: 4,  // 4 = all, 3 = warn+, 2 = error+, 1 = fatal only
    log_level: 0,
};