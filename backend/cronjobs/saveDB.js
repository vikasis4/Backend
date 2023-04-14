const path = require("path");

const DB_name = 'paceway';
const Archive_path = path.join(__dirname, 'backup', `${DB_name}.gzip`)
const backupDB = () => {
    spawn('mongodump', [
        `--db=${DB_name}`,
        `--archive=${Archive_path}`,
        '--gzip'
    ])
}

var job1 = new CronJob(
    '0 1 * * *',
    function () {
        backupDB()
    },
    null,
    true
);