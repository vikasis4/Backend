var file1 = require('../material_json/pdfs.json')
var file2 = require('../material_json/pyqs.json')

const getMaterial = async (req, res) => {
    try {
        res.json({ status: true, data: { file1, file2 } })
    } catch (error) {
        res.json({ status: false });
        console.log(error);
    }
}

module.exports = { getMaterial }