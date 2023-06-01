const { data } = require('../material_json/comman')

const comman_data = async (req, res) => {
    try {
        res.json({ status: true, data })
    } catch (error) {
        res.json({ status: false })
        console.log(error);
    }
}

module.exports = { comman_data }