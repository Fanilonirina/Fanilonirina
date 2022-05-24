const initialEtudiantState = {
    num_inscription_etudiant: currentUser.num_inscription_etudiant,
    num_matricule: "",
    num_etudiant: "",
    nom_etudiant: "",
    prenom_etudiant: "",
    date_naissance_etudiant: "1999-01-01",
    lieu_naissance_etudiant: "",
    sexe_etudiant: "",
    situation_matrimoniale_etudiant: "",
    nationalite_etudiant: "",
    adresse_etudiant: "",
    telephone_etudiant: "",
    email_etudiant: currentUser.email_etudiant,
    parcours: "",
    niveau: "",
    info_cin_etudiant: {
        numero:'',
        duplicata:'',
        date_duplicata:'1999-01-01',
        lieu_duplicata:'',
        date_delivre:'1999-01-01',
        lieu_delivre:''
    },
    upload_cin_etudiant: "",
    info_bacc_etudiant: {
        annee: '',
        serie: '',
        centre: '',
        nature: '',
        numero: '',
        mention: ''
    },
    upload_bacc_etudiant: "",
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
    info_enseignement_sup:[],
    photo_etudiant: ""
  };

const initialInscriptionState =
{
    info_borderau:{
        date:date,
        numero:'',
        montant:''
    },
    idPersonel:null,
    date_inscription:date,
    type_inscription:0,
    upload_borderau:""
};