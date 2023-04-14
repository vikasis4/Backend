const { v4: uuidv4 } = require('uuid');

const uploadFile = (folder) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./public/${folder}`)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + uuidv4() + path.extname(file.originalname))
        }
    })
    const upload = multer({ storage: storage })
    var multerupload = upload.single('image')
    return multerupload
}

module.exports = uploadFile

// FileName = req.file.filename