let models = require('../models')

const Sequelize = require('sequelize');
let fs = require('fs');
const default_quitus = 'user-icon-default.png'
const Op = Sequelize.Op;

module.exports = {

    getQuitus:async (req, res) => {
        const quitus = await models.quitus.findAll()
        res.json(quitus)
    },

    ajoutQuitus:async (req, res) => {
        let {id_quitus,info_quitus,upload_quitus} = req.body


        let data = {
            id_quitus: id_quitus,
            info_quitus: info_quitus,
            upload_quitus : default_quitus
        }

        if(req.file){
            // Accept images only
            if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                res.status(400).json({ 'result': "Erreur, Veuillez importer un image au format JPG,JPEG,PNG,GIF" })
                return
            }
            console.log(req.file)
            data['upload_quitus'] = req.file.path.split("\\")[2]
        }

        const isExist = await models.quitus.findOne({
            attributes: ['id_quitus'],
            where: {id_quitus: id_quitus}
        })
        
        if(!isExist){
            await models.quitus.create(data)
            res.status(200).json({'result': 'Succés, un quitus a été ajouté !' })
        }else
            res.status(500).json({ 'result': "Erreur, cet quitus existe déjà !" })
    },

    updateQuitus:async (req, res) => {
        let {info_quitus,upload_quitus} = req.body
        let id_quitus = req.params.id_quitus

         let data = {
            info_quitus: info_quitus,
            upload_quitus : default_quitus
        }

        if(req.file){
            // Accept images only
            if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                res.status(400).json({ 'result': "Erreur, Veuillez importer un image au format JPG,JPEG,PNG,GIF" })
                return
            }
            data['upload_quitus'] = req.file.path.split("\\")[2]
        } else 
            await delete data['upload_quitus']

        const quitus = await models.quitus.findOne({
            attributes: ['id_quitus'],
            where: {id_quitus: id_quitus}
        })
        if(quitus){
            const updateQuitus = await models.quitus.update(data, {
                where: {id_quitus: id_quitus}
            })
            if(updateQuitus >= 0)
                res.status(200).json({'result': ' Succés, un quitus a été modifié ! '})
        }else
            res.status(500).json({'result': "Erreur, cet quitus est introuvable ou il n'y a rien à modifié !" })

        
    },
    
    deleteQuitus:async (req, res) => {
        let id_quitus = req.params.id_quitus


        const quitus = await models.quitus.findOne({
            where: {id_quitus: id_quitus}
        })

        if(quitus){
            if(quitus.upload_quitus != default_quitus){
                fs.unlink('./uploads/quitus/'+quitus.upload_quitus, async(err) => {
                    if(err) return res.status(400).json({'result': "Erreur, quitus introuvable!"});

                    console.log('file deleted successfully');

                    const deleteQuitus = await models.quitus.destroy({
                        where: {id_quitus: id_quitus}
                    })
        
                    if(deleteQuitus > 0) 
                        res.status(200).json({'result': "quitus a été supprimé avec succès"})
                    else 
                        res.status(404).json({'result': "Erreur, ce quitus est introuvable"})
               })
            } else {
                const deleteQuitus = await models.quitus.destroy({
                    where: {id_quitus: id_quitus}
                })

                if(deleteQuitus > 0) 
                        res.status(200).json({'result': "quitus a été supprimé avec succès"})
                    else 
                        res.status(404).json({'result': "Erreur, ce quitus est introuvable"})
            }
        }else 
            res.status(404).json({'result': "Erreur, cet quitus est introuvable"})

    },

    rechercheQuitus:async (req, res) => {
        let idInscription = req.params.id_quitus

        const findQuitus = await models.quitus.findAll({
            where: {idInscription: idInscription}
        })

        res.json(findQuitus)
    },

    findQuitus:async (req, res) => {
        let text = req.params.text
        const findQuitus = await models.quitus.findAll({
            where: {
                [Op.or]: [
                    {
                        id_quitus: 
                        {
                            [Op.substring]: text
                        }
                    }, 
                    {
                        info_quitus: 
                        {
                            [Op.substring]: text
                        }
                    }
                ]
            }
        })

        res.json(findQuitus)
    },

     getLastQuitus:async (req, res) => {
        const lastQuitus = await models.quitus.findOne({
            limit: 1,
            order: [ [ 'id_quitus', 'DESC' ]]
        })
        res.json(lastQuitus)
    }

}