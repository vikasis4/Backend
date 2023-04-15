const path = require("path");
const { details } = require('../middleware/products')

const products_info = async (req, res) => {
    try {
        res.json({ status: true, details })
    } catch (error) {
        res.json({ status: false })
        console.log(error);
    }
}
const dbBackUp = async (req, res) => {
    try {
        const options = {
            root: path.join(__dirname,'..','db')
        };
        const filename = 'paceway.gzip'
        res.sendFile(filename,options)
    } catch (error) {
        res.status(404)
        console.log(error);
    }
}
module.exports = {products_info, dbBackUp}