//import
let models = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken')
//routes
module.exports = {
    // manao recherche administrateur rehetra
    getAdministrateur:async (req, res) => {
        const administrateurs = await models.administrateur.findAll()
        res.status(200).json(administrateurs)
    },

    connexionAdministrateur:async (req, res) => {
        let {login, mot_de_passe} = req.body

        const user = await models.administrateur.findOne({
            where: { [Op.and]: [{login: login},{mot_de_passe : mot_de_passe}]}
        })

        if(user){
            const id_admin = user.id_admin
            const token = jwt.sign({id_admin},"jwtSecret",{
                expiresIn: 300
            })
            res.status(200).json({auth : true, token: token, user: user })
            // res.status(200).json({ 'result': user.login+' est connecté' })
        } else {
            res.status(404).json({auth : false, result: "Erreur, cet administrateur est introuvable"})
        }
    },

    isUserAuth: async(req, res) => {
        const token = req.headers["x-access-token"]
        
        if(!token){
            res.json({auth : false, result: "Erreur, token non trouvée"})
        } else {
            jwt.verify(token,"jwtSecret", (err, decoded) => {
                if (err) {
                    res.json({auth : false, result: "Authentification non authorisée"})
                } else {
                    res.json({auth : true, message : "Vous avez connectée user n°"+decoded.id_admin})
                }
            })
        }
    },

    ajoutAdministrateur:async (req, res) => {
        let {id_admin,login,mot_de_passe} = req.body

        console.log(req.body)

        let data = {
            id_admin: id_admin,
            login: login,
            mot_de_passe: mot_de_passe
        }

        const administrateur = await models.administrateur.findOne({
            attributes: ['id_admin'],
            where: { id_admin: id_admin }
        })

        if(!administrateur) {
            await models.administrateur.create(data)
            res.status(200).json({ 'result': 'Succès, un administrateur a été ajouté !' })
        }
        else 
            res.status(500).json({ 'result': "Erreur, cet administrateur existe déjà !" })
    },
    
    updateAdministrateur:async (req, res) => {
        let {login, mot_de_passe} = req.body
        let id_admin = req.params.id_admin

        let data = {
            login: login,
            mot_de_passe: mot_de_passe
        }

        const administrateur = await models.administrateur.findOne({
            attributes: ['id_admin'],
            where: {id_admin: id_admin}
        })

         if(administrateur){
            const updateAdministrateur = await models.administrateur.update(data, {
                where: {id_admin: id_admin}
            })

            if(updateAdministrateur >= 0)
                res.status(200).json({'result': 'administrateur a été modifié avec succès'})
        } else 
            res.status(500).json({ 'result': "Erreur, cet administrateur est introuvable ou il n'y a rien à modifié !" })
    },

    deleteAdministrateur:async (req, res) => {
        let id_admin = req.params.id_admin
        
        const administrateur = await models.administrateur.findOne({
            where: { id_admin: id_admin }
        })

        if(administrateur){
             const deleteAdministrateur = await models.administrateur.destroy({
                where: {id_admin: id_admin}
            })

            if(deleteAdministrateur > 0) 
                res.status(200).json({'result': "Succés, un administrateur a bien été supprimé !"})
            else 
                res.status(404).json({'result': "Erreur, cet administrateur est introuvable"})
        } else
            res.status(404).json({'result': "Erreur, ce candidat est introuvable"})
    },

    rechercheAdministrateur:async (req, res) => {
        let id_admin = req.params.id_admin
        
        const findadministrateur = await models.administrateur.findOne({
            where: {id_admin: id_admin}
        })
        res.json(findadministrateur)
    },


    findAdministrateurs:async (req, res) => {
        let text = req.params.text
        const findAdministrateurs = await models.administrateur.findAll({
            where: {
                [Op.or]: [
                    {
                        id_admin: 
                        {
                            [Op.substring]: text
                        }
                    }, 
                    {
                        login: 
                        {
                            [Op.substring]: text
                        }
                    }, 
                    {
                        mot_de_passe: 
                        {
                            [Op.substring]: text
                        }
                    }
                ]
            }
        })

        res.json(findAdministrateurs)
    },

    getLastAdministrateur:async (req, res) => {
        const lastAdministrateur = await models.administrateur.findOne({
            limit: 1,
            order: [[ 'id_admin', 'DESC' ]]
        })
        res.json(lastAdministrateur)
    }

}
