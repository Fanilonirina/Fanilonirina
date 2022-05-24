let models = require('../models')
const Sequelize = require('sequelize');
let fs = require('fs');
const default_icon = 'user-icon-default.png'
let jwt = require('jsonwebtoken')
const JWT_SIGN_SECRET = '20fsd5425dfq'
const Op = Sequelize.Op;


module.exports = {
    getCandidats:async (req, res) => {
        const candidats = await models.candidats.findAll()
        res.status(200).json(candidats)
    },

    ajoutCandidats:async (req, res, err) => {
        let {num_inscription_candidat,nom_candidat,prenom_candidat,telephone_candidat,email_candidat,
        status_candidat} = req.body

        let data = {
            num_inscription_candidat: num_inscription_candidat,
            nom_candidat: nom_candidat,
            prenom_candidat: prenom_candidat,
            telephone_candidat: telephone_candidat,
            email_candidat: email_candidat,
            status_candidat: 0,
            upload_profile_candidat : default_icon
        }

        if(req.file){
            // Accept images only
            if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                res.status(400).json({ 'result': "Erreur, Veuillez importer un image au format JPG,JPEG,PNG,GIF" })
                return
            }
            data['upload_profile_candidat'] = req.file.path.split("\\")[1]
        }

        const candidat = await models.candidats.findOne({
            attributes: ['num_inscription_candidat'],
            where: {num_inscription_candidat: num_inscription_candidat}
        })
        
        if(!candidat){
            
            const emailExist = await models.candidats.findOne({
                attributes: ['email_candidat'],
                where: {email_candidat: email_candidat}
            })

            if(!emailExist){
                await models.candidats.create(data)
                res.status(200).json({'result': 'Candidat a été ajouté avec succès' })
            } else 
                res.status(404).json({ 'result': "Erreur, ce mail existe déjà !" })

        }
        else
            res.status(409).json({ 'result': "Erreur, ce candidat existe déjà !" })
    },

    updateCandidats:async (req, res) => {
        let {nom_candidat,prenom_candidat,telephone_candidat,email_candidat} = req.body
        let num_inscription_candidat = req.params.num_inscription_candidat

        let data = {
            nom_candidat: nom_candidat,
            prenom_candidat: prenom_candidat,
            telephone_candidat: telephone_candidat,
            email_candidat: email_candidat,
            upload_profile_candidat : default_icon
        }

        if(req.file){
            // Accept images only
            if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                res.status(400).json({ 'result': "Erreur, Veuillez importer un image au format JPG,JPEG,PNG,GIF" })
                return
            }
            data['upload_profile_candidat'] = req.file.path.split("\\")[1]
        } else
            await delete data['upload_profile_candidat']

        const candidat = await models.candidats.findOne({
            attributes: ['num_inscription_candidat'],
            where: {num_inscription_candidat: num_inscription_candidat}
        })

        if(candidat){
            const updateCandidats = await models.candidats.update(data, {
                where: {num_inscription_candidat: num_inscription_candidat}
            })

            if(updateCandidats >= 0)
                res.status(200).json({'result': 'Candidat a été modifié avec succès'})
        } else 
            res.status(500).json({'result': "Erreur, ce candidats est introuvable" })
    },

    deleteCandidats:async (req, res) => {
        let num_inscription_candidat = req.params.num_inscription_candidat

        const candidat = await models.candidats.findOne({
            where: {num_inscription_candidat: num_inscription_candidat}
        })

        if(candidat){
            if(candidat.upload_profile_candidat != default_icon){
                fs.unlink('./uploads/'+candidat.upload_profile_candidat, async(err) => {
                    if(err) return res.status(400).json({'result': "Erreur, icône introuvable!"});

                    console.log('file deleted successfully');

                    const deleteCandidats = await models.candidats.destroy({
                        where: {num_inscription_candidat: num_inscription_candidat}
                    })
        
                    if(deleteCandidats > 0) 
                        res.status(200).json({'result': "Candidat a été supprimé avec succès"})
                    else 
                        res.status(404).json({'result': "Erreur, ce candidat est introuvable"})
               })
            } else {

                const deleteCandidats = await models.candidats.destroy({
                    where: {num_inscription_candidat: num_inscription_candidat}
                })
    
                if(deleteCandidats > 0) 
                    res.status(200).json({'result': "Candidat a été supprimé avec succès"})
                else 
                    res.status(404).json({'result': "Erreur, ce candidat est introuvable"})
            }
        } else
            res.status(404).json({'result': "Erreur, ce candidat est introuvable"})
    },

    rechercheCandidats:async (req, res) => {
        let num_inscription_candidat = req.params.num_inscription_candidat
        const findCandidats = await models.candidats.findOne({
            where: {num_inscription_candidat: num_inscription_candidat}
        })

        if(findCandidats != null)
            res.json(findCandidats)
        else
            res.status(404).json({'result': "Erreur, ce candidat est introuvable"})
    },

    sendMailCandidats: async (req, res) => {
        var nodemailer = require('nodemailer')

        let num_inscription_candidat = req.params.num_inscription_candidat

        const candidat = await models.candidats.findOne({
            where: {num_inscription_candidat: num_inscription_candidat}
        })

        if(candidat){
        
            const token_mail_verification = jwt.sign(
                {   "id": candidat.num_inscription_candidat
                }, JWT_SIGN_SECRET, { expiresIn: '1d' })

            // const url = "http://"+req.get('host')+"/eni/verification/"+token_mail_verification
            const url = `http://localhost:3000/register/${candidat.email_candidat}/${token_mail_verification}`
            
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'mialisonnochikara1106@gmail.com',
                    pass: 'gamecompte'
                }
            });
    
            var options = {
                from: 'mialisonnochikara1106@gmail.com',
                to: candidat.email_candidat,
                subject: 'Authorisation à l\'inscription à l\'ENI',
                html: `<h3> Félicitation ${candidat.nom_candidat} ${candidat.prenom_candidat} </h3> 
                        <p> J'ai l'honneur de vous informer que vous êtes parmi les candidats admis au concours d'entrée
                        an première année de la Formation de Licence professionnelle. </p><br/>
                        Pour vous inscrire, veuillez cliquez <a href="${url}">${url}</a>`
            }

            transporter.sendMail(options,async(error, info)=>{
                if(error){
                    if(error.code=='EDNS' || error.code=='ESOCKET')
                        res.status(503).json({'result': "Erreur à la connexion internet!"})
                    else
                        res.status(400).json({'result': "Erreur à l'envoi de l'email!"})
                    console.log(error)
                } else {
                    await models.candidats.update({status_candidat: 1}, {
                        where: {num_inscription_candidat: num_inscription_candidat}
                    })
                    res.status(200).json({'result': "E-mail envoyée avec succès"})
                    console.log('Email sent : ' + info.accepted)
                }
            })
        }  else
            res.status(404).json({'result': "Erreur, ce candidat est introuvable"})
    },

    verificationCandidats : async (req, res) => {
        let token = req.params.token
        if (token) {
            try {
                jwt.verify(token, JWT_SIGN_SECRET, (e, decoded) => {
                    if (e) {
                        console.log(e)
                        return res.sendStatus(403)
                    } else {
                        id = decoded.id
                        res.writeHead(302, {'Location': 'http://localhost:3000/form'})
                        res.end()
                    }
                });
            } catch (err) {
                console.log(err)
                return res.sendStatus(403)
            }
        } else {
            return res.sendStatus(403)
    
        }
    },

    findCandidats:async (req, res) => {
        let text = req.params.text
        const findCandidats = await models.candidats.findAll({
            where: {
                [Op.or]: [
                    {
                        num_inscription_candidat: 
                        {
                            [Op.substring]: text
                        }
                    }, 
                    {
                        nom_candidat: 
                        {
                            [Op.substring]: text
                        }
                    }, 
                    {
                        prenom_candidat: 
                        {
                            [Op.substring]: text
                        }
                    },
                    {
                        telephone_candidat: 
                        {
                            [Op.substring]: text
                        }
                    },
                    {
                        email_candidat: 
                        {
                            [Op.substring]: text
                        }
                    }
                ]
            }
        })

        res.json(findCandidats)
    },

    getLastCandidat:async (req, res) => {
        const lastCandidat = await models.candidats.findOne({
            limit: 1,
            order: [ [ 'num_inscription_candidat', 'DESC' ]]
        })
        res.json(lastCandidat)
    }

}