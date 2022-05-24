let models = require('../models')
const Sequelize = require('sequelize');
let fs = require('fs');
const default_borderau = 'user-icon-default.png'
const Op = Sequelize.Op;

module.exports = {
    getInscription:async (req, res) => {
        const inscrptions = await models.inscription.findAll()
        res.json(inscrptions)
    },

    ajoutInscription:async (req, res) => {
        let {id,idQuitus,idEtudiant,idPersonnel,info_borderau,upload_info_borderau,
            date_inscription,type_inscription} = req.body

            let data = {
                id: id,
                idQuitus: idQuitus,
                idEtudiant: idEtudiant,
                idPersonnel: idPersonnel,
                info_borderau: info_borderau,
                upload_borderau: default_borderau,
                date_inscription: date_inscription,
                type_inscription: type_inscription
            }

        if(req.file){
            // Accept images only
            if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                res.status(400).json({ 'result': "Erreur, Veuillez importer un image au format JPG,JPEG,PNG,GIF" })
                return
            }
            data['upload_borderau'] = req.file.path.split("\\")[1]
        }

        const isExist = await models.inscription.findOne({
            attributes: ['id'],
            where: {id: id}
        })
        
        if(!isExist){
            await models.inscription.create(data)
            res.status(200).json({'resultat': 'Succés, une inscription a été ajouté !' })
        }
        else
            res.status(500).json({ 'resultat': "Erreur, cette inscription existe déjà !" })
    },

    updateInscription:async (req, res) => {
        let {idQuitus,idEtudiant,idPersonnel,info_borderau,upload_borderau,date_inscription,
            type_inscription} = req.body
        let id = req.params.id

        let data = {
            idQuitus: idQuitus,
            idEtudiant: idEtudiant,
            idPersonnel: idPersonnel,
            info_borderau: info_borderau,
            upload_borderau: default_borderau,
            date_inscription: date_inscription,
            type_inscription: type_inscription
        }

        if(req.file){
            // Accept images only
            if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                res.status(400).json({ 'result': "Erreur, Veuillez importer un image au format JPG,JPEG,PNG,GIF" })
                return
            }
            data['upload_borderau'] = req.file.path.split("\\")[1]
        } else
            await delete data['upload_borderau']

        const inscription = await models.inscription.findOne({
            attributes: ['id'],
            where: {id: id}
        })

        if (inscription) {
            const updateInscription = await models.inscription.update(data, {
                where: {id: id}
            })
            if(updateInscription >= 0)
                res.status(200).json({'resultat': ' Succés, une inscription a été modifié ! '})
        }
        else
            res.status(500).json({'result': "Erreur, cette inscription est introuvable ou il n'y a rien à modifié !" })
    },

    deleteInscription:async (req, res) => {
        let id = req.params.id
        
         const inscription = await models.inscription.findOne({
            where: {id: id}
        })

         if (inscription){
         if(inscription.upload_borderau != default_borderau){
                fs.unlink('./uploads/'+inscription.upload_borderau, async(err) => {
                    if(err) return res.status(400).json({'result': "Erreur, icône introuvable!"});

                    console.log('file deleted successfully');

                    const deleteInscription = await models.inscription.destroy({
                        where: {id: id}
                    })
        
                    if(deleteInscription > 0) 
                        res.status(200).json({'result': "inscription a été supprimé avec succès"})
               })
            }
        }else 
            res.status(404).json({'result': "Erreur, cette inscription est introuvable"})
    },

    rechercheInscription:async (req, res) => {
        let id = req.params.id
        let type_inscription = req.params.type

        const findInscription = await models.inscription.findOne({
            where: { idEtudiant: id , type_inscription: type_inscription}
        })

        res.json(findInscription)
    },

    rechercheAllInscription:async (req, res) => {
        let id = req.params.id
        let type_inscription = req.params.type

        const findInscription = await models.inscription.findAll({
            where: { idEtudiant: id , type_inscription: type_inscription}
        })
        
        res.json(findInscription)
    },

    findInscriptions:async (req, res) => {
        let text = req.params.text
        const findInscriptions = await models.inscription.findAll({
            where: {
                [Op.or]: [
                    {
                        id: 
                        {
                            [Op.substring]: text
                        }
                    }, 
                    {
                        info_borderau: 
                        {
                            [Op.substring]: text
                        }
                    },
                    {
                        date_inscription: 
                        {
                            [Op.substring]: text
                        }
                    },
                    {
                        type_inscription: 
                        {
                            [Op.substring]: text
                        }
                    }
                ]
            }
        })

        res.json(findInscriptions)
    },

     getLastInscription:async (req, res) => {
        const lastInscription = await models.inscription.findOne({
            limit: 1,
            order: [ [ 'id', 'DESC' ]]
        })
        res.json(lastInscription)
    }
}