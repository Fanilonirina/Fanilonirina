// import
let models = require('../models')

module.exports = {
    getPersonels:async (req, res) => {
        const personels = await models.personel.findAll()
        if(personels != "")
            res.json(personels)
        else
            res.status(404).json({'resultat': "vide ! ajoutez des personels"})

    },

    ajoutPersonel:async (req, res) => {
        let {id_personel,nom_personel,email_personel,departement} = req.body

        const isExist = await models.personel.findOne({
            attributes: ['id_personel'],
            where: {id_personel: id_personel}
        })
        
        if(!isExist){
            await models.personel.create({
                id_personel: id_personel,
                nom_personel: nom_personel,
                email_personel: email_personel,
                departement: departement
            })
            res.status(200).json({'resultat': 'Succés, un personel a été ajouté !' })
        }
        else
            res.status(500).json({ 'resultat': "Erreur, ce personel existe déjà !" })
    },

    updatePersonel:async (req, res) => {
        let {nom_personel,email_personel,departement} = req.body
        let id_personel = req.params.id_personel

        const updatePersonel = await models.personel.update({
            nom_personel: nom_personel,
            email_personel: email_personel,
            departement: departement
        },{
            where: {id_personel: id_personel}
        })

        if(updatePersonel > 0)
            res.status(200).json({'resultat': ' Succés, un personel a été modifié ! '})
        else
            res.status(500).json({'result': "Erreur, ce personel est introuvable ou il n'y a rien à modifié !" })
    },

    deletePersonel:async (req, res) => {
        let id_personel = req.params.id_personel

        const deletePersonel = await models.personel.destroy({
            where: {id_personel: id_personel}
        })
        if(deletePersonel > 0) 
            res.status(200).json({'result': "Succés, un personel a bien été supprimé !"})
        else 
            res.status(404).json({'result': "Erreur, ce personel est introuvable"})

    },

    recherchePersonel:async (req, res) => {
        let id_personel = req.params.id_personel
        const findPersonel = await models.personel.findOne({
            where: {id_personel: id_personel}
        })
        if(findPersonel != null)
            res.json(findPersonel)
        else
            res.status(404).json({'result': "Erreur, cet persone est introuvable"})
    }
}