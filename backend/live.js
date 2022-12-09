const Live = require('./models/live')

const live = async () => {

    try {
        await Live.find({}).then((data) => {
            for (let i = 0; i < data.length; i++) {
                var date = new Date();
                var mins = date.getMinutes();
                var secs = date.getSeconds();
                //////////////////////////////
                var string = data[i].time;
                var Smin = 0;
                var Ssec = 0;
                if (string.slice(0, 1) === 'x') {
                    Smin = parseInt(string.slice(1, 2));
                } else {
                    Smin = parseInt(string.slice(0, 2));
                }
                if (string.slice(3, 4) === 'x') {
                    Ssec = parseInt(string.slice(4, 5));
                } else {
                    Ssec = parseInt(string.slice(3, 5));
                }
                ////////////////////////////////
                if (Smin === mins) {
                    if (Ssec - secs > 30) {
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
                } else if (mins > Smin) {
                    var gappers = 60 - Ssec + secs;
                    if (gappers - secs > 30) {
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
                } else if (mins < Smin) {
                    var gapper = 60 - Ssec + secs + (mins) * 60
                    if (gapper - secs > 30) {
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
            }
        })
    } catch (error) {
        console.log('live file error');
        console.log(error);
    }
}

module.exports = live
