const { details } = require('../middleware/products')

const products_info = async (req, res) => {
    try {
        res.json({ status: true, details })
    } catch (error) {
        res.json({ status: false })
        console.log(error);
    }
}

module.exports = products_info