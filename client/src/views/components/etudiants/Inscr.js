import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardText,
    CCardTitle,
    CCardFooter,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CCol,
    CForm,
    CFormControl,
    CFormFeedback,
    CInputGroup,
    CInputGroupText,
    CRow,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormLabel,
    CFormFloating
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import { freeSet } from '@coreui/icons'

const Inscription = () => {

    const currentUser =  JSON.parse(localStorage.getItem("user"))
    var curr = new Date()
    curr.setDate(curr.getDate() + 3)
    var date = curr.toISOString().substr(0,10)

    //console.log(currentUser)
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
            date_duplicata:'',
            lieu_duplicata:'',
            date_delivre:'',
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
            date:'',
            numero:'',
            montant:''
        },
        idPersonel:null,
        date_inscription:date,
        type_inscription:0,
        upload_borderau:""
    };

    const initialSec = { annee:'2021', classe:'', nature:''}
    const initialSup = { red:'', univ:'', annee:'2021', niveau:'', diplome:'', mention:'', formation:'', etablissement:''}

    const [etudiant, setEtudiant] = useState(initialEtudiantState)
    const [inscription, setInscription] = useState(initialInscriptionState)
    const [sec,setSec] = useState(initialSec)
    const [sup,setSup] = useState(initialSup)

    const [visible_esec, setVisibleEsec] = useState(false)
    const [visible_esup, setVisibleEsup] = useState(false)
    const [visible_droit, setVisibleDroit] = useState(false)
    const [uploadMessage, setUploadMessage] = useState({ color : "medium-emphasis", message : "Aucune image" })

    const confirmModalEsec = () => {
        setVisibleEsec(!visible_esec)
      }
    
      const confirmModalEsup = () => {
        setVisibleEsup(!visible_esup)
      }

      const confirmModalDroit = () => {
        setVisibleDroit(!visible_droit)
      }

      const handleInputChange = event => {
        const { name, value } = event.target;
        setEtudiant({ ...etudiant, [name]: value });
      };

      const handleInputChangeSec = event => {
        const { name, value } = event.target;
        setSec({ ...sec, [name]: value });
      };

      const handleInputChangeSup = event => {
        const { name, value } = event.target;
        setSup({ ...sup, [name]: value });
      };

      const handleInputChangeJson = event => {
        const { name, value } = event.target;
        const parent = event.target.dataset.parent;
        if(parent==='info_cin_etudiant') setEtudiant({ ...etudiant, info_cin_etudiant:{...etudiant.info_cin_etudiant, [name]: value} });
        else if(parent==='info_bacc_etudiant') setEtudiant({ ...etudiant, info_bacc_etudiant:{...etudiant.info_bacc_etudiant, [name]: value} });
        else if(parent==='info_logement_etudiant') setEtudiant({ ...etudiant, info_logement_etudiant:{...etudiant.info_logement_etudiant, [name]: value} });
        else if(parent==='info_parents_etudiant') setEtudiant({ ...etudiant, info_parents_etudiant:{...etudiant.info_parents_etudiant, [name]: value} });
        else if(parent==='info_enseignement_sup') setEtudiant({ ...etudiant, info_enseignement_sup:{...etudiant.info_enseignement_sup, [name]: value} });
        else if(parent==='info_enseignement_sec') setEtudiant({ ...etudiant, info_enseignement_sec:{...etudiant.info_enseignement_sec, [name]: value} });
      };

      /*const handleInputChangeJsonArray = event => {
        const { name, value } = event.target;
        const parent = event.target.dataset.parent;
        if(parent==='info_enseignement_sup'){
            let array = etudiant.info_enseignement_sup
            let newArr = array.map((item,i)=>{
                if(index===i){
                    return {...item,[name]:value}
                } else {
                    return item
                }
            })
            setEtudiant({ ...etudiant, info_enseignement_sup:newArr});
        } 
        else if(parent==='info_enseignement_sec') setEtudiant({ ...etudiant, info_bacc_etudiant:{...etudiant.info_bacc_etudiant, [name]: value} });
      };*/

    //   const handleInputChange2 = event => {
    //     const { name, value } = event.target;
    //     setInscription({ ...inscription, [name]: value });
    //   };

      const handleInputChangeJson2 = event => {
        const { name, value } = event.target;
        setInscription({ ...inscription, info_borderau:{...inscription.info_borderau, [name]: value} });
     
      };

      const handleInputFileChange = event => {
        const image = event.target.files[0]
        var ext = ["jpg","jpeg","png","gif"]
        var fileExtension = image.name.split('.').pop().toLowerCase()
        if(ext.indexOf(fileExtension)>-1){
          setUploadMessage({color:"success", message : image.name})
        } else
          setUploadMessage({color:"danger", message : "Veuillez importer un image au format JPG,JPEG,PNG,GIF!"})
      };


      const saveInfoEnsSec = () => {
        setEtudiant({ ...etudiant, info_enseignement_sec:[...etudiant.info_enseignement_sec, sec]});
        setSec(initialSec)
        setVisibleEsec(false)
      } 

      const saveInfoEnsSup = () => {
        setEtudiant({ ...etudiant, info_enseignement_sup:[...etudiant.info_enseignement_sup, sup]});
        setVisibleEsup(false)
      } 

      const removeItemSec = (id) =>{
        const newSec = etudiant.info_enseignement_sec.filter((_,index)=>index!==id)
        setEtudiant({ ...etudiant, info_enseignement_sec:newSec})
      }

      const removeItemSup = (id) =>{
        const newSup = etudiant.info_enseignement_sup.filter((_,index)=>index!==id)
        setEtudiant({ ...etudiant, info_enseignement_sup:newSup})
      }

    return (
        <>
          <CRow>
              <h1 style= {{textAlign: "center", fontFamily: "Algerian"}}>FICHE D INSCRIPTION</h1>
            <CCol className= "justify-content-center">
                <CCard>
                <CCardHeader color="dark">
                    <strong></strong> <small></small>
                </CCardHeader>
                <CForm
                    className="row g-3 needs-validation"
                    >
                <CCardBody >
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <CIcon name="cil-user" color="dark"/>
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                name="num_inscription_etudiant"
                                placeholder="N° D'INSCRIPTION AU CONCOURS"
                                value={etudiant.num_inscription_etudiant}
                                min="1"
                                required
                                readOnly
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                name="num_matricule"
                                placeholder="N° CARTE D'ETUDIANT"
                                value={etudiant.num_matricule}
                                onChange={handleInputChange}
                                min="1"
                                required
                                />
                                <CFormFeedback invalid></CFormFeedback>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CInputGroup className="mb-3">
                        <CInputGroupText color="danger">
                        <CIcon name="cil-user" /> &nbsp; NOM ET PRENOM
                        </CInputGroupText>
                        <CFormControl 
                        type="text"
                        id="nom_etudiant"
                        name="nom_etudiant"
                        value={etudiant.nom_etudiant}
                        onChange={handleInputChange}
                        placeholder="NOM"
                        required
                        />
                        <CFormControl 
                        type="text"
                        id="prenom_etudiant"
                        name="prenom_etudiant"
                        value={etudiant.prenom_etudiant}
                        onChange={handleInputChange}
                        placeholder="PRENOM"
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-3 has-validation">
                        <CInputGroupText >
                            @
                        </CInputGroupText>
                        <CFormControl 
                        type="email"
                        name="email_etudiant"
                        value={etudiant.email_etudiant}
                        placeholder="EMAIL"
                        readOnly
                        />
                    </CInputGroup>
                    <CRow>
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                <span>Né(e) le </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="date"
                                name="date_naissance_etudiant"
                                placeholder="Entrer l'email du candidat"
                                value={etudiant.date_naissance_etudiant}
                                onChange={handleInputChange}
                                required
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                <span> à </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="lieu_naissance_etudiant"
                                placeholder="LIEU DE NAISSANCE"
                                value={etudiant.lieu_naissance_etudiant}
                                onChange={handleInputChange}
                                className=""
                                required
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow> <br/>

                    <CInputGroup className="mb-3 has-validation">
                        <CInputGroupText >
                            <CIcon name="cil-phone" />
                        </CInputGroupText>
                        <CFormControl 
                        type="text"
                        name="telephone_etudiant"
                        value={etudiant.telephone_etudiant}
                        onChange={handleInputChange}
                        placeholder="N° TELEPHONE"
                        required
                        />
                    </CInputGroup>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect onChange={handleInputChange} name="situation_matrimoniale_etudiant" aria-label="Default select example">
                                    <option>SITUATION MATRIMONIALE</option>
                                    <option value="Célibataire">Célibataire</option>
                                    <option value="Marié">Marié(e)</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>
                        <CCol>
                        <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect  onChange={handleInputChange} name="sexe_etudiant" aria-label="Default select example">
                                    <option>SEXE</option>
                                    <option value="1">Masculin</option>
                                    <option value="0">Féminin</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>    
                    </CRow>
                    </CCardBody>
                    <CRow >
                    <br/>
                    <h4 style={{color:"darkgray", fontFamily:"Algerian", textAlign:"center"}}>Immatriculation Provisoire</h4>
                    <p style={{textAlign:"center"}}>**********</p> <br/>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-calendar" />
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                name="annee"
                                data-parent="info_bacc_etudiant"
                                value={etudiant.info_bacc_etudiant.annee}
                                onChange={handleInputChangeJson}
                                placeholder="ANNEE DU BACC"
                                required
                                />
                            </CInputGroup> 
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="numero"
                                data-parent="info_bacc_etudiant"
                                value={etudiant.info_bacc_etudiant.numero}
                                onChange={handleInputChangeJson}
                                placeholder="N° DU BACC"
                                required
                                />
                            </CInputGroup> 
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect data-parent="info_bacc_etudiant" onChange={handleInputChangeJson} aria-label="Default select example" name="serie">
                                    <option>SERIE</option>
                                    <option value="scientifique"> Scientifique</option>
                                    <option value="ose">Ose</option>
                                    <option value="litteraire">Litteraire</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                   <CRow>
                       <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect data-parent="info_bacc_etudiant" onChange={handleInputChangeJson} aria-label="Default select example" name="nature">
                                    <option>NATURE</option>
                                    <option value="general">Général</option>
                                    <option value="technique">Technique</option>
                                </CFormSelect>
                            </CInputGroup>
                       </CCol>
                       <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="centre"
                                data-parent="info_bacc_etudiant"
                                value={etudiant.info_bacc_etudiant.centre}
                                onChange={handleInputChangeJson}
                                placeholder="CENTRE DU BACC"
                                required
                                />
                            </CInputGroup>
                       </CCol>
                       <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect data-parent="info_bacc_etudiant" onChange={handleInputChangeJson} aria-label="Default select example" name="mention">
                                    <option>MENTION</option>
                                    <option value="tres_bien">Tres Bien</option>
                                    <option value="bien">Bien</option>
                                    <option value="assez_bien">Assez Bien</option>
                                    <option value="passable">Passable</option>
                                </CFormSelect>
                            </CInputGroup>
                       </CCol>
                   </CRow>
                   <br/>
                    <h4 style={{color:"darkgray", fontFamily:"Algerian", textAlign:"center"}}>Démande d inscription</h4>
                    <p style={{textAlign:"center"}}>**********</p>

                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect onChange={handleInputChange} aria-label="Default select example" name="niveau">
                                    <option>ANNEE D ETUDE</option>
                                    <option value="L1">L1</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect onChange={handleInputChange} aria-label="Default select example" name="parcours">
                                    <option>PARCOURS</option>
                                    <option value="GB">Génie Logiciel et Base de Donnée</option>
                                    <option value="SR">Administration Système et Reseau</option>
                                    <option value="GENERALISTE">Généraliste</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>
                    </CRow>

                    <h4 style={{color:"darkgray", fontFamily:"Algerian", textAlign:"center"}}>Etat civil</h4>
                    <p style={{textAlign:"center"}}>**********</p>

                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="nationalite_etudiant"
                                value={etudiant.nationalite_etudiant}
                                onChange={handleInputChange}
                                placeholder="NATIONALITE"
                                required
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="numero"
                                data-parent="info_cin_etudiant"
                                value={etudiant.info_cin_etudiant.numero}
                                onChange={handleInputChangeJson}
                                placeholder="N° CIN OU PASSEPORT"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                <span>Duplicata du </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="date"
                                name="date_duplicata"
                                data-parent="info_cin_etudiant"
                                value={etudiant.info_cin_etudiant.date_duplicata}
                                onChange={handleInputChangeJson}
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                <span> à </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="lieu_duplicata"
                                data-parent="info_cin_etudiant"
                                value={etudiant.info_cin_etudiant.lieu_duplicata}
                                onChange={handleInputChangeJson}
                                placeholder="LIEU"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                        <p></p>
                    <CRow >
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                <span>Délivré du </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="date"
                                name="date_delivre"
                                data-parent="info_cin_etudiant"
                                value={etudiant.info_cin_etudiant.date_delivre}
                                onChange={handleInputChangeJson}
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                    <span> à </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="lieu_delivre"
                                data-parent="info_cin_etudiant"
                                value={etudiant.info_cin_etudiant.lieu_delivre}
                                onChange={handleInputChangeJson}
                                placeholder="LIEU"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                    <CRow className="mt-2 mb-2">
                        <CCol md="3">
                        </CCol>
                        <CCol md="9">
                            <CFormLabel
                            className="btn btn-dark float-end" >
                            <CFormControl
                                type="file"
                                name="upload_cin_etudiant"
                                accept="image/*"
                                multiple={false}
                                onChange={handleInputFileChange}
                                hidden
                            />
                            Importer un image
                            </CFormLabel>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <p className={"small float-end text-"+uploadMessage.color}>{uploadMessage.message}</p>
                        </CCol>
                    </CRow>
                    </CRow>
                    <br/>
                    <h4 style={{color:"darkgray", fontFamily:"Algerian", textAlign:"center" , display:"none"}}>FAMILLE (SI MARIEE)</h4>

                    <CRow className="d-none">
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="nom_conjointe"
                                name="nom_conjointe"
                                placeholder="NOM DU (DE LA) CONJOINT(E)"
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="profession_conjointe"
                                name="profession_conjointe"
                                placeholder="PROFESSION CONJOINT(E)"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="d-none">
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                id=""
                                name=""
                                placeholder="NOMBRE D'ENFANT A CHARGE"
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="profession_etudiant"
                                name="profession_etudiant"
                                placeholder="PROFESSION DE L ETUDIANT(E)"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>

                    <h4 style={{color:"darkgray", fontFamily:"Algerian", textAlign:"center"}}>PARENTS</h4>
                    <p style={{textAlign:"center"}}>**********</p>

                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="pere"
                                data-parent="info_parents_etudiant"
                                value={etudiant.info_parents_etudiant.pere}
                                onChange={handleInputChangeJson}
                                placeholder="NOM DU PERE"
                                />
                            </CInputGroup>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="mere"
                                data-parent="info_parents_etudiant"
                                value={etudiant.info_parents_etudiant.mere}
                                onChange={handleInputChangeJson}
                                placeholder="NOM DE LA MERE"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="tuteur"
                                data-parent="info_parents_etudiant"
                                value={etudiant.info_parents_etudiant.tuteur}
                                onChange={handleInputChangeJson}
                                placeholder="NOM DU TUTEUR"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                name="nb_enfant_charge"
                                data-parent="info_parents_etudiant"
                                value={etudiant.info_parents_etudiant.nb_enfant_charge}
                                onChange={handleInputChangeJson}
                                placeholder="NOMBRE D'ENFANT A CHARGE"
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                name="boursier"
                                data-parent="info_parents_etudiant"
                                value={etudiant.info_parents_etudiant.boursier}
                                onChange={handleInputChangeJson}
                                placeholder="BOURSIERS"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="adresse"
                                data-parent="info_parents_etudiant"
                                value={etudiant.info_parents_etudiant.adresse}
                                onChange={handleInputChangeJson}
                                placeholder="ADRESSE DES PARENTS OU TUTEURS"
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                name="tel"
                                data-parent="info_parents_etudiant"
                                value={etudiant.info_parents_etudiant.tel}
                                onChange={handleInputChangeJson}
                                placeholder="N° TELEPHONE"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow><p></p>
                    <CCard className="text-center">
                        <CCardHeader><CCardTitle>ENSEIGNEMENT SECONDAIRE</CCardTitle></CCardHeader>
                        <CCardBody>
                        {etudiant.info_enseignement_sec.length > 0 ? (
                        <CTable hover responsive align="middle" className="mb-0">
                            <CTableHead color="dark">
                            <CTableRow>
                                <CTableHeaderCell className="text-center">Année</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Classe</CTableHeaderCell>
                                <CTableHeaderCell className="text-center">Nature</CTableHeaderCell>
                                <CTableHeaderCell className="text-center"></CTableHeaderCell>
                            </CTableRow>
                            </CTableHead>
                            <CTableBody>
                            {etudiant.info_enseignement_sec.map((sec,index) => (
                                <CTableRow key={index} >
                                    <CTableDataCell> {sec.annee} </CTableDataCell>
                                    <CTableDataCell> {sec.classe} </CTableDataCell>
                                    <CTableDataCell> {sec.nature} </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="danger" variant="outline" size="sm" shape="rounded-pill" onClick={()=>removeItemSec(index)}> <CIcon content={freeSet.cilTrash} size="sm" /> </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                            </CTableBody>
                        </CTable>
                        ): (
                            <CCardText>
                                Veuillez insérer votre enseignement secondaire (Optionnelle).
                            </CCardText>
                            )}
                        <div className="mt-3 d-grid gap-2 col-2 mx-auto">
                            <CButton className="mt-3 " onClick={confirmModalEsec} > <CIcon content={freeSet.cilUserPlus} /> Ajouter </CButton>
                        </div>
                        </CCardBody>
                        <CCardFooter className="text-medium-emphasis"></CCardFooter>
                    </CCard>
                    <CCard className="text-center">
                        <CCardHeader><CCardTitle>ENSEIGNEMENT SUPERIEUR</CCardTitle></CCardHeader>
                        <CCardBody>
                        {etudiant.info_enseignement_sup.length > 0 ? (
                        <CTable hover responsive align="middle" className="mb-0">
                            <CTableHead color="dark">
                                <CTableRow>
                                    <CTableHeaderCell className="text-center">Année</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Univ</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Etab</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Niveau</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Formation</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">RED</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Mention</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Diplome</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                                </CTableRow>
                                </CTableHead>
                                <CTableBody>
                            {etudiant.info_enseignement_sup.map((sup,index) => (
                                <CTableRow key={index} >
                                    <CTableDataCell> {sup.annee} </CTableDataCell>
                                    <CTableDataCell> {sup.univ} </CTableDataCell>
                                    <CTableDataCell> {sup.etablissement} </CTableDataCell>
                                    <CTableDataCell> {sup.niveau} </CTableDataCell>
                                    <CTableDataCell> {sup.formation} </CTableDataCell>
                                    <CTableDataCell> {sup.red} </CTableDataCell>
                                    <CTableDataCell> {sup.mention} </CTableDataCell>
                                    <CTableDataCell> {sup.diplome} </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="danger" variant="outline" size="sm" shape="rounded-pill" onClick={()=>removeItemSup(index)}> <CIcon content={freeSet.cilTrash} size="sm" /> </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                            </CTableBody>
                        </CTable>
                        ): (
                            <CCardText>
                                Veuillez insérer votre enseignement supérieur (Optionnelle).
                            </CCardText>
                            )}
                            <div className="mt-3 d-grid gap-2 col-2 mx-auto">
                                <CButton onClick={confirmModalEsup} > <CIcon content={freeSet.cilUserPlus} /> Ajouter </CButton>
                            </div>
                        </CCardBody>
                        <CCardFooter className="text-medium-emphasis"></CCardFooter>
                    </CCard>
                        <br/>
                        <p></p>
                    <CRow>
                        <CCol></CCol>
                        <CCol></CCol>
                        <CCol></CCol>
                        <CCol>
                            <CButton color="success" type="submit" onClick={()=>console.log(etudiant)}>
                                Enregistrer
                            </CButton>
                        </CCol>
                    </CRow>
                </CForm>
                </CCard>
            </CCol>
            </CRow> 

            <CModal alignment="top" visible={visible_esec}>
                <CModalHeader onDismiss={() => setVisibleEsec(false)}>
                    <CModalTitle> ENSEIGNEMENT SECONDAIRE </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormLabel>Année</CFormLabel>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon name="cil-user" color="dark"/>
                        </CInputGroupText>
                        <CFormControl 
                        type="number" name="annee" placeholder="ANNEE"
                        value={sec.annee}
                        onChange={handleInputChangeSec}
                        min="1"
                        required
                        />
                     </CInputGroup>
                     <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon name="cil-user" color="dark"/>
                        </CInputGroupText>
                        <CFormControl 
                        type="text" name="classe"
                        value={sec.classe}
                        onChange={handleInputChangeSec}
                        placeholder="CLASSE"
                        min="1"
                        required
                        />
                     </CInputGroup>
                     <CInputGroup className="mb-3 has-validation">
                        <CInputGroupText >
                            <CIcon name="cil-people" />
                        </CInputGroupText>
                        <CFormSelect onChange={handleInputChangeSec} aria-label="Default select example" name="nature">
                            <option>NATURE</option>
                            <option value="Géneral">Général</option>
                            <option value="Technique">Technique</option>
                        </CFormSelect>
                    </CInputGroup>
                </CModalBody>
                <CModalFooter>
                    <CButton color="default" onClick={() => {setVisibleEsec(false)}}>
                    Annuler
                    </CButton>
                    <CButton color="dark" onClick={saveInfoEnsSec} >Ajouter</CButton>
                </CModalFooter>
            </CModal>

            <CModal alignment="top" visible={visible_esup}>
                <CModalHeader onDismiss={() => setVisibleEsup(false)}>
                    <CModalTitle> ENSEIGNEMENT SUPERIEUR </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon name="cil-user" color="dark"/>
                        </CInputGroupText>
                        <CFormControl 
                        type="number" name="annee" placeholder="ANNEE"
                        value={sup.annee}
                        onChange={handleInputChangeSup}
                        min="1"
                        required
                        />
                     </CInputGroup>
                     <CInputGroup className="mb-3 has-validation">
                        <CInputGroupText >
                            <CIcon name="cil-people" />
                        </CInputGroupText>
                        <CFormSelect onChange={handleInputChangeSup} aria-label="Default select example" name="univ">
                            <option>UNIVERSITE</option>
                            <option value="UF">U/F</option>
                            <option value="UF">U/A</option>
                        </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className="mb-3 has-validation">
                        <CInputGroupText >
                            <CIcon name="cil-people" />
                        </CInputGroupText>
                        <CFormControl 
                        type="text" name="etablissement" placeholder="ETABLISSEMENT"
                        value={sup.etablissement}
                        onChange={handleInputChangeSup}
                        required
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-3 has-validation">
                        <CInputGroupText >
                            <CIcon name="cil-people" />
                        </CInputGroupText>
                        <CFormSelect onChange={handleInputChangeSup} aria-label="Default select example" name="niveau">
                            <option>NIVEAU</option>
                            <option value="1ère année">1ère année</option>
                            <option value="2ème année">2ème année</option>
                            <option value="3ème année">3ème année</option>
                        </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className="mb-3 has-validation">
                        <CInputGroupText >
                            <CIcon name="cil-people" />
                        </CInputGroupText>
                        <CFormSelect onChange={handleInputChangeSup} aria-label="Default select example" name="formation">
                            <option>FORMATION</option>
                            <option value="Licence professionnelle">Licence professionnelle</option>
                            <option value="Master professionnelle">Master professionnelle</option>
                        </CFormSelect>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon name="cil-user" color="dark"/>
                        </CInputGroupText>
                        <CFormControl 
                        type="text" name="red" placeholder="RED" value={sup.red}
                        onChange={handleInputChangeSup}
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon name="cil-user" color="dark"/>
                        </CInputGroupText>
                        <CFormControl 
                        type="text" name="mention" placeholder="MENTION" value={sup.mention}
                        onChange={handleInputChangeSup}
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon name="cil-user" color="dark"/>
                        </CInputGroupText>
                        <CFormSelect onChange={handleInputChangeSup} aria-label="Default select example" name="diplome">
                            <option>DIPLOME</option>
                            <option value="Licence">LICENCE</option>
                            <option value="Master">MASTER</option>
                            <option value="Doctorat">DOCTORAT</option>
                        </CFormSelect>
                     </CInputGroup>
                    
                </CModalBody>
                <CModalFooter>
                    <CButton color="default" onClick={() => {setVisibleEsup(false)}}>
                    Annuler
                    </CButton>
                    <CButton color="dark" onClick={saveInfoEnsSup} >Ajouter</CButton>
                </CModalFooter>
            </CModal> 

            <CModal alignment="top" visible={visible_droit}>
                <CModalHeader onDismiss={() => setVisibleDroit(false)}>
                    <CModalTitle> QUITANCE DROIT D INSCRIPTION </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon name="cil-user" color="dark"/>
                        </CInputGroupText>
                        <CFormControl 
                        type="number" name="numero" placeholder="NUMERO BORDEREAU"
                        value={inscription.info_borderau.numero}
                        onChange={handleInputChangeJson2}
                        max="7"
                        required
                        />
                     </CInputGroup>
                     <CInputGroup>
                        <CInputGroupText>
                        <span>Payé le </span>
                        </CInputGroupText>
                        <CFormControl 
                        type="date" name="date" value={inscription.info_borderau.date}
                        onChange={handleInputChangeJson2} />
                     </CInputGroup> <br/>
                     <CInputGroup>
                        <CFormControl 
                        type="number" name="montant" placeholder="MONTANT" value={inscription.info_borderau.montant}
                        onChange={handleInputChangeJson2} />
                        <CInputGroupText>
                        <span>Ariary </span>
                        </CInputGroupText>
                     </CInputGroup>
                <CRow className="mt-2 mb-2">
                  <CCol md="3">
                  </CCol>
                  <CCol md="9">
                    <CFormLabel
                      className="btn btn-dark float-end"
                    >
                      <CFormControl
                        type="file"
                        name="upload_borderau"
                        accept="image/*"
                        multiple={false}
                        onChange={handleInputFileChange}
                        hidden
                      />
                      Importer un image
                    </CFormLabel>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <p className={"small float-end text-"+uploadMessage.color}>{uploadMessage.message}</p>
                  </CCol>
                </CRow>
                    
                </CModalBody>
                <CModalFooter>
                    <CButton color="default" onClick={() => {setVisibleDroit(false)}}>
                    Annuler
                    </CButton>
                    <CButton color="dark" >Ajouter</CButton>
                </CModalFooter>
            </CModal> 



            <CCard className="text-center">
            <CCardHeader><CCardTitle>MON IDENTITE</CCardTitle></CCardHeader>
            <CCardBody>
                <CForm className="g-3">
                    
                </CForm>
            </CCardBody>
            <CCardFooter className="text-medium-emphasis">2 days ago</CCardFooter>
          </CCard>
        </>
    )
}

export default Inscription
