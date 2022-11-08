const Live = require('./models/live')

const live = async () => {
     await Live.find({}).then((data) => {
        for (let i = 0; i < data.length; i++) {
            const date = new Date();
            const hrs = date.getHours();
            const mins = date.getMinutes();
            const secs = date.getSeconds();
            const sum = hrs * 3600 + mins * 60 + secs;
            if (sum - data[i].time > 60) {
                if (data[i].register === 'non-reg') {
                    const newfxn = async () => {
                        await Live.deleteOne({ username: data[i].username })
                    }
                    newfxn()
                }
                else if (data[i].register === 'reg') {
                    const oldfxn = async () => {
                        await Live.findOneAndUpdate({ username: data[i].username }, { status: 'offline' })
                    }
                    oldfxn()
                }
            }
        }
    })
}

module.exports = live

