

const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require('multer');

const storage = new GridFsStorage({
    url:`mongodb://localhost:27017/blog_app`,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file:(request,file) =>{
        const match = ["image/png","image/jpg"];

        if(match.indexOf(file.memeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName:"photos", 
            filename: `${Date.now()}-blog-${file.orginalname}`
        }
    }
})

module.exports = multer({storage}) ;