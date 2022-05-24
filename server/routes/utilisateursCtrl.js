//import
let models = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken')
//routes
module.exports = {
    // manao recherche utilisateur rehetra
    getUtilisateur:async (req, res) => {
        const utilisateurs = await models.utilisateur.findAll()
        res.status(200).json(utilisateurs)
    },

    connexionUtilisateur:async (req, res) => {
        let {login, password} = req.body

        const user = await models.utilisateur.findOne({
            where: { [Op.and]: [{login: login},{mot_de_passe : password}]}
        })

        if(user){
            const id = user.id_utilisateur
            const token = jwt.sign({id},"jwtSecret",{
                expiresIn: 300
            })
            res.status(200).json({auth : true, token: token, user: user })
            // res.status(200).json({ 'result': user.login+' est connecté' })
        } else {
            res.status(404).json({auth : false, result: "Erreur, cet utilisateur est introuvable"})
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
                    res.json({auth : true, message : "Vous avez connectée user n°"+decoded.id})
                }
            })
        }
    },

    ajoutUtilisateur:async (req, res) => {
        let {login, password} = req.body

        let data = {
            login: login,
            mot_de_passe: password,
            droit: 0
        }

        const isExist = await models.utilisateur.findOne({
            where: { login: login }
        })

        if(!isExist) {
            await models.utilisateur.create(data)
            res.status(200).json({ 'result': 'Succès, un utilisateur a été ajouté !' })
        }
        else 
            res.status(500).json({ 'result': "Erreur, cet utilisateur existe déjà !" })
    },
    
    updateUtilisateur:async (req, res) => {
        let {login, mot_de_passe, droit} = req.body
        let id_utilisateur = req.params.id_utilisateur

        let data = {
            id_utilisateur: id_utilisateur,
            login: login,
            mot_de_passe: mot_de_passe,
            droit: droit
        }

        const utilisateur = await models.utilisateur.findOne({
            attributes: ['id_utilisateur'],
            where: {id_utilisateur: id_utilisateur}
        })

         if(utilisateur){
            const updateUtilisateur = await models.utilisateur.update(data, {
                where: {id_utilisateur: id_utilisateur}
            })

            if(updateUtilisateur >= 0)
                res.status(200).json({'result': 'utilisateur a été modifié avec succès'})
        } else 
            res.status(500).json({ 'result': "Erreur, cet utilisateur est introuvable ou il n'y a rien à modifié !" })
    },

    deleteUtilisateur:async (req, res) => {
        let id_utilisateur = req.params.id_utilisateur
        
        const utilisateur = await models.utilisateur.findOne({
            where: { id_utilisateur: id_utilisateur }
        })

        if(utilisateur){
             const deleteUtilisateur = await models.utilisateur.destroy({
                where: {id_utilisateur: id_utilisateur}
            })

            if(deleteUtilisateur > 0) 
                res.status(200).json({'result': "Succés, un utilisateur a bien été supprimé !"})
            else 
                res.status(404).json({'result': "Erreur, cet utilisateur est introuvable"})
        } else
            res.status(404).json({'result': "Erreur, ce candidat est introuvable"})
    },

    rechercheUtilisateur:async (req, res) => {
        let id_utilisateur = req.params.id_utilisateur
        
        const findUtilisateur = await models.utilisateur.findOne({
            where: { id_utilisateur: id_utilisateur }
        })
        res.json(findUtilisateur)
    },


    findUtilisateurs:async (req, res) => {
        let text = req.params.text
        const findUtilisateurs = await models.utilisateur.findAll({
            where: {
                [Op.or]: [
                    {
                        id_utilisateur: 
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
                    },
                    {
                        droit: 
                        {
                            [Op.substring]: text
                        }
                    }
                ]
            }
        })

        res.json(findUtilisateurs)
    },

    getLastUtilisateur:async (req, res) => {
        const lastUtilisateur = await models.utilisateur.findOne({
            limit: 1,
            order: [ [ 'id_utilisateur', 'DESC' ]]
        })
        res.json(lastUtilisateur)
    }

}
