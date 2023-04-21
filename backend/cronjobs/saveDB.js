const path = require("path");
var CronJob = require('cron').CronJob;
const { spawn } = require('node:child_process');

const DB_name = 'paceway';
const Archive_path = path.join(__dirname, 'db', `${DB_name}.gzip`)
const backupDB = () => {
    spawn('mongodump', [
        `--db=${DB_name}`,
        `--archive=${Archive_path}`,
        '--gzip'
    ])
}
console.log('Cron_1 is Active -> saveDB');

var job1 = new CronJob(
    '0 1 * * *',
    function () {
        backupDB()
    },
    null,
    true
);

module.exports = job1