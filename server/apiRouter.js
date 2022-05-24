let express =  require('express')
let utilisateursCtrl = require('./routes/utilisateursCtrl')
let personnelCtrl = require('./routes/personnelCtrl')
let quitusCtrl = require('./routes/quitusCtrl')
let candidatsCtrl = require('./routes/candidatsCtrl')
let etudiantCtrl = require('./routes/etudiantCtrl')
let inscriptionCtrl = require('./routes/inscriptionCtrl')
let administrateurCtrl = require('./routes/administrateurCtrl')
let upload = require('./uploadServer')
// Router

exports.router = (() => {
    let apiRouter = express.Router()

    // routes administrateurs
    apiRouter.route('/administrateurs/')
        .post(administrateurCtrl.ajoutAdministrateur)
        .get(administrateurCtrl.getAdministrateur)

    apiRouter.route('/administrateurs/:id_admin')
        .put(administrateurCtrl.updateAdministrateur)
        .delete(administrateurCtrl.deleteAdministrateur)
        .get(administrateurCtrl.rechercheAdministrateur)

    apiRouter.route('/administrateurs/search/:text')
        .get(administrateurCtrl.findAdministrateurs)
    apiRouter.route('/administrateurs_last')
        .get(administrateurCtrl.getLastAdministrateur)

    // routes utilisateurs
    apiRouter.route('/utilisateurs/')
        .post(utilisateursCtrl.ajoutUtilisateur)
        .get(utilisateursCtrl.getUtilisateur)

    apiRouter.route('/utilisateurs/:id_utilisateur') 
        .put(utilisateursCtrl.updateUtilisateur)
        .delete(utilisateursCtrl.deleteUtilisateur)
        .get(utilisateursCtrl.rechercheUtilisateur)

    apiRouter.route('/connexion/admin')
        .post(utilisateursCtrl.connexionUtilisateur)

    apiRouter.route('/isUserAuth/')
        .get(utilisateursCtrl.isUserAuth)

    // routes personnels
    apiRouter.route('/personnels/')
        .post(personnelCtrl.ajoutPersonnel)
        .get(personnelCtrl.getPersonnels)

    apiRouter.route('/personnels/:id_personnel')
        .put(personnelCtrl.updatePersonnel)
        .delete(personnelCtrl.deletePersonnel)
        .get(personnelCtrl.recherchePersonnel)

    apiRouter.route('/personnels/search/:text')
        .get(personnelCtrl.findPersonnels)
    apiRouter.route('/personnels_last')
        .get(personnelCtrl.getLastPersonnel)


    //routes quitus
    apiRouter.route('/quitus/')
        .get(quitusCtrl.getQuitus)
        .post(upload.single('upload_quitus'),quitusCtrl.ajoutQuitus)

    apiRouter.route('/quitus/:id_quitus')
        .put(upload.single('upload_quitus'),quitusCtrl.updateQuitus)
        .delete(quitusCtrl.deleteQuitus)
        .get(quitusCtrl.rechercheQuitus)

        apiRouter.route('/quitus/search/:text')
        .get(quitusCtrl.findQuitus)
    apiRouter.route('/quitus_last')
        .get(quitusCtrl.getLastQuitus)

    //routes candidats
    apiRouter.route('/candidats/')
        .get(candidatsCtrl.getCandidats)
        .post(upload.single('upload_profile_candidat'), candidatsCtrl.ajoutCandidats)

    apiRouter.route('/candidats/:num_inscription_candidat')
        .put(upload.single('upload_profile_candidat'), candidatsCtrl.updateCandidats)
        .delete(candidatsCtrl.deleteCandidats)
        .get(candidatsCtrl.rechercheCandidats)
        .post(candidatsCtrl.sendMailCandidats)
    
    apiRouter.route('/candidats/search/:text')
        .get(candidatsCtrl.findCandidats)
    apiRouter.route('/candidats_last')
        .get(candidatsCtrl.getLastCandidat)

    apiRouter.route('/verification/:token')
        .get(candidatsCtrl.verificationCandidats)

    //routes etudiants
    apiRouter.route('/connexion/etudiant')
        .post(etudiantCtrl.connexionEtudiant)

    apiRouter.route('/etudiants/')
        .get(etudiantCtrl.getEtudiants)
        .post(etudiantCtrl.ajoutEtudiant)
    
    apiRouter.route('/etudiants_insc/')
        .get(etudiantCtrl.getEtudiantsInsc)
    
        apiRouter.route('/etudiants_reinsc/')
        .get(etudiantCtrl.getEtudiantsReInsc)

    apiRouter.route('/etudiants/:num_inscription_etudiant')
        .put(upload.fields([
            {name:'photo_etudiant'},
            {name:'upload_borderau'},
            {name:'upload_bacc_etudiant'},
            {name:'upload_cin_etudiant'}]), etudiantCtrl.updateEtudiant)
        .delete(etudiantCtrl.deleteEtudiant) 
        .get(etudiantCtrl.rechercheEtudiant)

    apiRouter.route('/etudiants_profile/:num_inscription_etudiant')
        .put(upload.fields([
            {name:'photo_etudiant'},
            {name:'upload_bacc_etudiant'},
            {name:'upload_cin_etudiant'}]), etudiantCtrl.updateProfileEtudiant)

        apiRouter.route('/etudiantsre/:num_inscription_etudiant')
        .put(upload.fields([
            {name:'upload_quitus'},
            {name:'upload_borderau'}]), etudiantCtrl.updateRe)

    apiRouter.route('/etudiants/validation/:num_inscription_etudiant')
        .put(etudiantCtrl.validationEtudiant)
    
        apiRouter.route('/etudiants/validationre/:num_inscription_etudiant')
        .put(etudiantCtrl.validationReEtudiant)
        
    //routes inscriptions
    apiRouter.route('/inscriptions/')
        .get(inscriptionCtrl.getInscription)
        .post(inscriptionCtrl.ajoutInscription)
    
    apiRouter.route('/inscriptions/:id/:type')
        .put(inscriptionCtrl.updateInscription)
        .delete(inscriptionCtrl.deleteInscription)
        .get(inscriptionCtrl.rechercheInscription)

        apiRouter.route('/inscriptionarray/:id/:type')
        .get(inscriptionCtrl.rechercheAllInscription)
    return apiRouter

})()
