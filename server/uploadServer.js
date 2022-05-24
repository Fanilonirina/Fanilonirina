let multer = require('multer')

//Path to upload file
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./uploads/") 
    },
    filename:  (req,file,cb) => { 
        const ext = file.mimetype.split("/")[1]
        if(file.fieldname=='upload_quitus'){
            let {quitus} = req.body
            let num_inscription_etudiant = req.params.num_inscription_etudiant
            let quitusName = JSON.parse(quitus)
            cb(null,`quitus/QUITUS-${num_inscription_etudiant}-${quitusName[0].info_quitus}.${ext}`)

        } else if(file.fieldname=='upload_profile_candidat'){
            let {num_inscription_candidat, nom_candidat,prenom_candidat} = req.body
            //cb(null,`uploads/${file.originalname}-${Date.now()}.${ext}`)
            let id = num_inscription_candidat ? num_inscription_candidat : (req.params ? req.params.num_inscription_candidat : '0') 
            cb(null,`${id}-${nom_candidat}-${prenom_candidat}.${ext}`)

        } else if(file.fieldname=='upload_cin_etudiant'){
            let {num_inscription_etudiant, nom_etudiant, prenom_etudiant} = req.body
            //cb(null,`uploads/${file.originalname}-${Date.now()}.${ext}`)
            let id = num_inscription_etudiant ? num_inscription_etudiant : (req.params ? req.params.num_inscription_etudiant : '0') 
            cb(null,`cin/CIN-${num_inscription_etudiant}-${nom_etudiant}-${prenom_etudiant}.${ext}`)
        } else if(file.fieldname=='upload_bacc_etudiant'){
            let {num_inscription_etudiant, nom_etudiant, prenom_etudiant} = req.body
            //cb(null,`uploads/${file.originalname}-${Date.now()}.${ext}`)
            let id = num_inscription_etudiant ? num_inscription_etudiant : (req.params ? req.params.num_inscription_etudiant : '0') 
            cb(null,`bacc/BACC-${num_inscription_etudiant}-${nom_etudiant}-${prenom_etudiant}.${ext}`)
        }
        else if(file.fieldname=='upload_borderau'){
            let {num_inscription_etudiant, nom_etudiant, prenom_etudiant} = req.body
            //cb(null,`uploads/${file.originalname}-${Date.now()}.${ext}`)
            let id = num_inscription_etudiant ? num_inscription_etudiant : (req.params ? req.params.num_inscription_etudiant : '0') 
            cb(null,`borderau/BR-${num_inscription_etudiant}-${nom_etudiant}-${prenom_etudiant}.${ext}`)
        }
        else if(file.fieldname=='photo_etudiant'){
            let {num_inscription_etudiant, nom_etudiant, prenom_etudiant} = req.body
            //cb(null,`uploads/${file.originalname}-${Date.now()}.${ext}`)
            let id = num_inscription_etudiant ? num_inscription_etudiant : (req.params ? req.params.num_inscription_etudiant : '0') 
            cb(null,`users/${num_inscription_etudiant}-${nom_etudiant}-${prenom_etudiant}.${ext}`)
        }
       
        
    }
})

const imageFilter = function(req, file, cb) {
// Accept images only
if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter : imageFilter
})

module.exports = upload