let models = require('../models')
const Sequelize = require('sequelize');
let fs = require('fs')
const jwt = require('jsonwebtoken')

const default_cin = 'user-icon-default.png'
const default_bacc = 'user-icon-default.png'
const Op = Sequelize.Op;

module.exports = {
    getEtudiants:async (req, res) => {
        const etudiants = await models.etudiant.findAll()
        res.json(etudiants)
    },

    getEtudiantsInsc:async (req, res) => {
        const etudiants = await models.inscription.findAll({include:[models.etudiant],
            where: {
                type_inscription:0
            }})
        res.json(etudiants)
    },

    getEtudiantsReInsc:async (req, res) => {
        const etudiants = await models.inscription.findAll({include:[models.etudiant],
            where: {
                type_inscription:1
            }})
        res.json(etudiants)
    },

    connexionEtudiant:async (req, res) => {
        let {login, password} = req.body
        
        let user = await models.etudiant.findOne({
            where: { [Op.and]: [{login_etudiant: login},{mot_de_passe_etudiant : password}]}
        })

        if(user){
            const id = user.num_inscription_etudiant
            const token = jwt.sign({id},"jwtSecret",{
                expiresIn: 3000
            })
            res.status(200).json({auth : true, token: token, user: user, identifier:0 })
            // res.status(200).json({ 'result': user.login+' est connecté' })
        } else {

            user = await models.personnel.findOne({
                where: { [Op.and]: [{login_personnel: login},{mot_de_passe_personnel : password}]}
            })

            if(user){
                const id = user.id_personnel
                const token = jwt.sign({id},"jwtSecret",{
                    expiresIn: 3000
                })
                res.status(200).json({auth : true, token: token, user: user, identifier:1 })
            } else {

                user = await models.administrateur.findOne({
                    where: { [Op.and]: [{login: login},{mot_de_passe : password}]}
                })
    
                if(user){
                    
                    const id = user.id_admin
                    const token = jwt.sign({id},"jwtSecret",{
                        expiresIn: 3000
                    })
                    res.status(200).json({auth : true, token: token, user: user, identifier:2 })
                } else {
                    res.status(404).json({auth : false, result: "Erreur, cet utilisateur est introuvable"})
                }

            }
        }
    },


    validationEtudiant:async (req, res) => {
        let {num_matricule,num_etudiant} = req.body
        let num_inscription_etudiant = req.params.num_inscription_etudiant

        let data = {
            num_matricule: num_matricule,
            num_etudiant: num_etudiant,
            statut_etudiant : true
        }

        await models.etudiant.update(data,{
            where: {num_inscription_etudiant: num_inscription_etudiant}
        })

        res.status(200).json({'result': ' Succès, l\' etudiant est validée ! '})

    },

    validationReEtudiant:async (req, res) => {
        let num_inscription_etudiant = req.params.num_inscription_etudiant

        let data = {
            statut_etudiant_re : true
        }

        await models.etudiant.update(data,{
            where: {num_inscription_etudiant: num_inscription_etudiant}
        })

        res.status(200).json({'result': ' Succès, l\' etudiant est validée ! '})

    },


    ajoutEtudiant:async (req, res) => {
        let {num_inscription_etudiant,email,login,password} = req.body

        console.log(req.body)

        let data = {
            num_inscription_etudiant: num_inscription_etudiant,
            login_etudiant:login,
            mot_de_passe_etudiant:password,
            email_etudiant:email,
            info_cin_etudiant: {
                numero:'',
                duplicata:'',
                date_duplicata:'',
                lieu_duplicata:'',
                date_delivre:'',
                lieu_delivre:''
            },
            info_bacc_etudiant: {
                annee: '',
                serie: '',
                centre: '',
                nature: '',
                numero: '',
                mention: ''
            },
            info_logement_etudiant: {
                nature:'',
                adresse:'',
                residence:'',
                annee_premier_occupation:'',
            },
            info_parents_etudiant: {
                tel:'',
                mere:'',
                pere:'',
                tuteur:'',
                adresse: '', 
                boursier: "", 
                nb_enfant_charge:''
            },
            info_enseignement_sec:[],
            info_enseignement_sup:[]
        }

        const isExist = await models.etudiant.findOne({
            attributes: ['num_inscription_etudiant'],
            where: {num_inscription_etudiant: num_inscription_etudiant}
        })
        
        if(!isExist){
            const isExistLogin = await models.etudiant.findOne({
                where: { login_etudiant: login }
            })

            if(!isExistLogin){
                await models.etudiant.create(data)
                res.status(200).json({'result': 'Succés, un etudiant a été ajouté !' })
            } else {
                res.status(500).json({ 'result': "Erreur, cet utilisateur existe déjà !" })
            }
        }
        else
            res.status(500).json({ 'result': "Erreur, cet etudiant existe déjà !" })
    },

    updateEtudiant:async (req, res) => {
        let { nom_etudiant, prenom_etudiant, date_naissance_etudiant, lieu_naissance_etudiant,sexe_etudiant,
        situation_matrimoniale_etudiant,nationalite_etudiant,adresse_etudiant,telephone_etudiant,email_etudiant, 
        parcours, niveau, info_cin_etudiant, info_bacc_etudiant, info_logement_etudiant,info_parents_etudiant,
        info_enseignement_sec, info_enseignement_sup,
        info_borderau, date_inscription,type_inscription  } = req.body

        let num_inscription_etudiant = req.params.num_inscription_etudiant

        let data_etudiant = {
            nom_etudiant: nom_etudiant,
            prenom_etudiant: prenom_etudiant,
            date_naissance_etudiant: date_naissance_etudiant,
            lieu_naissance_etudiant: lieu_naissance_etudiant,
            sexe_etudiant: sexe_etudiant,
            situation_matrimoniale_etudiant: situation_matrimoniale_etudiant,
            nationalite_etudiant: nationalite_etudiant,
            adresse_etudiant: adresse_etudiant,
            telephone_etudiant: telephone_etudiant,
            email_etudiant: email_etudiant,
            parcours: parcours,
            niveau: niveau,
            info_cin_etudiant: JSON.parse(info_cin_etudiant),
            info_bacc_etudiant: JSON.parse(info_bacc_etudiant),
            info_logement_etudiant: JSON.parse(info_logement_etudiant),
            info_parents_etudiant: JSON.parse(info_parents_etudiant), 
            info_enseignement_sec: JSON.parse(info_enseignement_sec), 
            info_enseignement_sup: JSON.parse(info_enseignement_sup)
        }

        let data_inscription = {
            idEtudiant: num_inscription_etudiant,
            info_borderau: JSON.parse(info_borderau),
            date_inscription: date_inscription,
            type_inscription: type_inscription
        }

        if(req.files){
            if(req.files['photo_etudiant']){
                data_etudiant['photo_etudiant'] = req.files['photo_etudiant'][0].path.split("\\")[2]
            }

            if(req.files['upload_bacc_etudiant']){
                data_etudiant['upload_bacc_etudiant'] = req.files['upload_bacc_etudiant'][0].path.split("\\")[2]
            }

            if(req.files['upload_cin_etudiant']){
                data_etudiant['upload_cin_etudiant'] = req.files['upload_cin_etudiant'][0].path.split("\\")[2]
            }

            if(req.files['upload_borderau']){
                data_inscription['upload_borderau'] = req.files['upload_borderau'][0].path.split("\\")[2]
            }
        }

        const etudiant = await models.etudiant.findOne({
            attributes: ['num_inscription_etudiant'],
            where: {num_inscription_etudiant: num_inscription_etudiant}
        })

        if (etudiant) {
            await models.etudiant.update(data_etudiant,{
                where: {num_inscription_etudiant: num_inscription_etudiant}
            })

            await models.inscription.create(data_inscription)

            res.status(200).json({'result': ' Demande inscription envoyée ! '})
        } else
            res.status(500).json({'result': "Erreur, cet etudiant est introuvable ou il n'y a rien à modifié !" })
    },

    updateProfileEtudiant:async (req, res) => {
        let { login_etudiant, mot_de_passe_etudiant, nom_etudiant, prenom_etudiant, date_naissance_etudiant, lieu_naissance_etudiant,sexe_etudiant,
        situation_matrimoniale_etudiant,nationalite_etudiant,adresse_etudiant,telephone_etudiant,email_etudiant, 
        parcours, niveau, info_cin_etudiant, info_bacc_etudiant, info_logement_etudiant,info_parents_etudiant,
        info_enseignement_sec, info_enseignement_sup } = req.body

        let num_inscription_etudiant = req.params.num_inscription_etudiant

        let data_etudiant = {
            login_etudiant: login_etudiant,
            mot_de_passe_etudiant: mot_de_passe_etudiant,
            nom_etudiant: nom_etudiant,
            prenom_etudiant: prenom_etudiant,
            date_naissance_etudiant: date_naissance_etudiant,
            lieu_naissance_etudiant: lieu_naissance_etudiant,
            sexe_etudiant: sexe_etudiant,
            situation_matrimoniale_etudiant: situation_matrimoniale_etudiant,
            nationalite_etudiant: nationalite_etudiant,
            adresse_etudiant: adresse_etudiant,
            telephone_etudiant: telephone_etudiant,
            email_etudiant: email_etudiant,
            parcours: parcours,
            niveau: niveau,
            info_cin_etudiant: JSON.parse(info_cin_etudiant),
            info_bacc_etudiant: JSON.parse(info_bacc_etudiant),
            info_logement_etudiant: JSON.parse(info_logement_etudiant),
            info_parents_etudiant: JSON.parse(info_parents_etudiant), 
            info_enseignement_sec: JSON.parse(info_enseignement_sec), 
            info_enseignement_sup: JSON.parse(info_enseignement_sup)
        }

        if(req.files){
            if(req.files['photo_etudiant']){
                data_etudiant['photo_etudiant'] = req.files['photo_etudiant'][0].path.split("\\")[2]
            }

            if(req.files['upload_bacc_etudiant']){
                data_etudiant['upload_bacc_etudiant'] = req.files['upload_bacc_etudiant'][0].path.split("\\")[2]
            }

            if(req.files['upload_cin_etudiant']){
                data_etudiant['upload_cin_etudiant'] = req.files['upload_cin_etudiant'][0].path.split("\\")[2]
            }
        }

        const etudiant = await models.etudiant.findOne({
            attributes: ['num_inscription_etudiant'],
            where: {num_inscription_etudiant: num_inscription_etudiant}
        })

        if (etudiant) {
            await models.etudiant.update(data_etudiant,{
                where: {num_inscription_etudiant: num_inscription_etudiant}
            })

            res.status(200).json({'result': ' Profile s\'est mis à jour ! '})
        } else
            res.status(500).json({'result': "Erreur, cet etudiant est introuvable ou il n'y a rien à modifié !" })
    },

    updateRe: async (req, res) => {
        let { info_borderau, date_inscription,type_inscription, quitus  } = req.body
        let num_inscription_etudiant = req.params.num_inscription_etudiant

        let data_inscription = {
            idEtudiant: num_inscription_etudiant,
            info_borderau: JSON.parse(info_borderau),
            date_inscription: date_inscription,
            type_inscription: type_inscription
        }

        const {id} = await models.inscription.create(data_inscription)

        if(id>0){

        let q = JSON.parse(quitus)

        for (let index = 0; index < q.length; index++) {

            if(req.files){
                if(req.files['upload_quitus']){

                    let data_quitus = {
                        idInscription:id,
                        info_quitus: q[index].info_quitus,
                        upload_quitus: req.files['upload_quitus'][0].path.split("\\")[2],
                    }

                    await models.quitus.create(data_quitus)

                }
            }
        }  
                                
        res.status(200).json({'result': ' Demande reinscription envoyée ! '})
                       
        } else 
            res.status(500).json({'result': ' Erreur à l\'envoie du demande ! '})
    },

    deleteEtudiant:async (req, res) => {
        let num_inscription_etudiant = req.params.num_inscription_etudiant

        const etudiant = await models.etudiant.findOne({
            attributes: ['num_inscription_etudiant'],
            where: {num_inscription_etudiant: num_inscription_etudiant}
        })

        if (etudiant) {
             if(etudiant.upload_cin_etudiant != default_icon){
                fs.unlink('./uploads/'+etudiant.upload_cin_etudiant, async(err) => {
                    if(err) return res.status(400).json({'result': "Erreur, icône introuvable!"});

                    console.log('file deleted successfully');

                    const deleteEtudiant = await models.etudiant.destroy({
                        where: {num_inscription_etudiant: num_inscription_etudiant}
                    })
                   if(deleteEtudiant > 0) 
                        res.status(200).json({'result': "Succés, un etudiant a bien été supprimé !"})
               })
            }
        }else 
            res.status(404).json({'result': "Erreur, cet etudiant est introuvable"})

    },

    rechercheEtudiant:async (req, res) => {
        let num_inscription_etudiant = req.params.num_inscription_etudiant
        const findEtudiant = await models.etudiant.findOne({
            where: {num_inscription_etudiant: num_inscription_etudiant}
        })
        res.json(findEtudiant)
    },

    findEtudiants:async (req, res) => {
        let text = req.params.text
        const findEtudiants = await models.etudiant.findAll({
            where: {
                [Op.or]: [
                    {
                        num_matricule: 
                        {
                            [Op.substring]: text
                        }
                    }, 
                    {
                        nom_etudiant: 
                        {
                            [Op.substring]: text
                        }
                    },
                    {
                        prenom_etudiant: 
                        {
                            [Op.substring]: text
                        }
                    },
                    {
                        telephone_etudiant: 
                        {
                            [Op.substring]: text
                        }
                    },
                    {
                        email_etudiant: 
                        {
                            [Op.substring]: text
                        }
                    },
                    {
                        niveau: 
                        {
                            [Op.substring]: text
                        }
                    }
                ]
            }
        })

        res.json(findCandidats)
    },

    getLastEtudiant:async (req, res) => {
        const lastEtudiant = await models.etudiant.findOne({
            limit: 1,
            order: [ [ 'num_inscription_etudiant', 'DESC' ]]
        })
        res.json(lastEtudiant)
    }
}