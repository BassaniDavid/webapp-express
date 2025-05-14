const multer = require('multer');
const slugify = require('slugify');

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, './public/movies')
    },
    filename: function (req, file, cd) {

        const slugifiedImage = slugify(file.originalname, {
            lower: true,
            trim: true
        })

        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${slugifiedImage}`
        cd(null, uniqueName);
    }
})

const upload = multer({ storage });

module.exports = upload;