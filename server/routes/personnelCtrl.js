// import
let models = require('../models')
const Sequelize = require('sequelize');
let fs = require('fs');
const Op = Sequelize.Op;

module.exports = {
    getPersonnels:async (req, res) => {
        const personnels = await models.personnel.findAll()
         res.json(personnels)
    },

    ajoutPersonnel:async (req, res) => {
        let {id_personnel,login_personnel,mot_de_passe_personnel,idAdmin,nom_personnel,email_personnel,departement} = req.body

        let data = {
            id_personnel: id_personnel,
            idAdmin:idAdmin,
            login_personnel: login_personnel,
            mot_de_passe_personnel: mot_de_passe_personnel,
            nom_personnel: nom_personnel,
            email_personnel: email_personnel,
            departement: departement
        }

        const isExist = await models.personnel.findOne({
            attributes: ['id_personnel'],
            where: {id_personnel: id_personnel}
        })
        
        if(!isExist){
            await models.personnel.create(data)
            res.status(200).json({'result': 'Succés, un personnel a été ajouté !' })
        }
        else
            res.status(500).json({ 'result': "Erreur, ce personnel existe déjà !" })
    },

    updatePersonnel:async (req, res) => {
        let {nom_personnel,login_personnel, mot_de_passe_personnel, idAdmin,email_personnel,departement} = req.body
        let id_personnel = req.params.id_personnel

         let data = {
            idAdmin:idAdmin,
            login_personnel: login_personnel,
            mot_de_passe_personnel: mot_de_passe_personnel,
            nom_personnel: nom_personnel,
            email_personnel: email_personnel,
            departement: departement
        }

        const personnel = await models.personnel.findOne({
            attributes: ['id_personnel'],
            where: {id_personnel: id_personnel}
        })

        if (personnel) {
            const updatePersonnel = await models.personnel.update(data, {
                where: {id_personnel: id_personnel}
            })

            if(updatePersonnel >= 0)
                res.status(200).json({'result': ' Succés, un personnel a été modifié ! '})
        }
        else
            res.status(500).json({'result': "Erreur, ce personnel est introuvable ou il n'y a rien à modifié !" })
    },

    deletePersonnel:async (req, res) => {
        let id_personnel = req.params.id_personnel

        const personnel = await models.personnel.findOne({
            where: {id_personnel: id_personnel}
        })

        if (personnel) {
            const deletePersonnel = await models.personnel.destroy({
                where: {id_personnel: id_personnel}
            })
            if(deletePersonnel > 0) 
                res.status(200).json({'result': "Succés, un personnel a bien été supprimé !"})
        }else 
            res.status(404).json({'result': "Erreur, ce personnel est introuvable"})

    },

    recherchePersonnel:async (req, res) => {
        let id_personnel = req.params.id_personnel
        const findPersonnel = await models.personnel.findOne({
            where: {id_personnel: id_personnel}
        })
        res.json(findPersonnel)
    },

    findPersonnels:async (req, res) => {
        let text = req.params.text
        const findPersonnels = await models.personnel.findAll({
            where: {
                [Op.or]: [
                    {
                        id_personnel: 
                        {
                            [Op.substring]: text
                        }
                    }, 
                    {
                        nom_personnel: 
                        {
                            [Op.substring]: text
                        }
                    }, 
                    {
                        email_personnel: 
                        {
                            [Op.substring]: text
                        }
                    },
                    {
                        departement: 
                        {
                            [Op.substring]: text
                        }
                    }
                ]
            }
        })

        res.json(findPersonnels)
    },
    getLastPersonnel:async(req, res) => {
        const lastPersonnel = await models.personnel.findOne({
            limit: 1,
            order: [ [ 'id_personnel', 'DESC' ]]
        })
        res.json(lastPersonnel)
    }
}