import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});

const mult = multer({storage});

export default mult;