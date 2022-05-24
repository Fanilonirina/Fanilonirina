import React, { useState, useEffect } from 'react'
import EtudiantService from 'src/services/EtudiantService'
import { useHistory, useLocation } from "react-router-dom"

import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardText,
    CCardTitle,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CCol,
    CForm,
    CFormControl,
    CInputGroup,
    CInputGroupText,
    CRow,
    CFormSelect,
    CFormLabel,
    CLink,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import { freeSet } from '@coreui/icons'

const Profile_Etudiants_Reinscription = () => {

    //const currentUser =  JSON.parse(localStorage.getItem("user"))
    const location = useLocation()
    const history = useHistory()

    var curr = new Date()
    curr.setDate(curr.getDate() + 3)
    var date = curr.toISOString().substr(0,10)

    var id_personnel = JSON.parse(localStorage.getItem("user")).id_personnel

    //console.log(currentUser)
    const initialEtudiantState = {
        num_inscription_etudiant: "",
        nom_etudiant: "",
        prenom_etudiant: "",
        date_naissance_etudiant: "",
        lieu_naissance_etudiant: "",
        sexe_etudiant: "",
        situation_matrimoniale_etudiant: "",
        nationalite_etudiant: "",
        adresse_etudiant: "",
        telephone_etudiant: "",
        email_etudiant: "",
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
        info_enseignement_sec:[{ annee:'', classe:'', nature:''},{ annee:'', classe:'', nature:''}],
        info_enseignement_sup:[],
        photo_etudiant: ""
      };

    const initialInscriptionState =
    {
        id:0,
        idEtudiant:0,
        idPersonnel:id_personnel,
        info_borderau:{
            date:date,
            numero:'',
            montant:''
        },
        date_inscription:date,
        type_inscription:0,
        upload_borderau:""
    };

    const initialQuitusState = []

    const [etudiant, setEtudiant] = useState(initialEtudiantState)
    const [newEtudiant, setNewEtudiant] = useState({
        num_matricule:'',
        num_etudiant:''
    })

    const [inscription, setInscription] = useState(initialInscriptionState)
    
    const [quitus, setQuitus] = useState(initialQuitusState);

    const [uploadMessage, setUploadMessage] = useState({photo_etudiant:null, upload_borderau:null, upload_bacc_etudiant:null, upload_cin_etudiant:null})

    useEffect(() => {
        const id = location.state ? location.state.num_inscription_etudiant : '0'
        EtudiantService.findById(id)
            .then(response => {
                setEtudiant(response.data)
            })
            .catch(error => {
            if (error.response) {
                console.log(error.response)
            }
            });
        
        EtudiantService.findByIdInscription(id,1)
            .then(response => {

                setInscription(response.data)
                console.log(response.data)

                EtudiantService.findByIdQuitus(response.data.id)
                    .then(response => {

                        setQuitus(response.data)
                        console.log(response.data)

                    })
                    .catch(error => {
                    if (error.response) {
                        console.log(error.response)
                    }
                    });
                    })
            .catch(error => {
            if (error.response) {
                console.log(error.response)
            }
            });  


    }, [])

      const handleInputChange = event => {
        const { name, value } = event.target;
        setNewEtudiant({ ...newEtudiant, [name]: value });
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
        const { name } = event.target
        var ext = ["jpg","jpeg","png","gif"]
        if(image){
            var fileExtension = image.name.split('.').pop().toLowerCase()
            if(ext.indexOf(fileExtension)>-1){
                const reader = new FileReader();
                reader.onload = ({ target: { result } }) => {
                    setEtudiant({ ...etudiant, [name]:image})
                    setUploadMessage({...uploadMessage, [name]:image.name})
                };
                reader.readAsDataURL(image);
            } else{
                setUploadMessage({...uploadMessage, [name]:'error'})
            }
        }
    };

      const saveInscription = () => {

        EtudiantService.validationRe(etudiant.num_inscription_etudiant, newEtudiant)
        .then(response => {
            history.push({
                pathname: '/personnels/reinscription',
                state: { 
                  action : 'add',
                  message : response.data.result,
                  new_etudiant_id: etudiant.num_inscription_etudiant
                }
              });
        }).catch(error=>{
          if(error.response){
            const data = error.response.data
            console.log(data)
          } else {
            alert('Erreur survenue dans le serveur!')
          }
        })
      }
      

    return (
        <>
          <CCard className="text-center mb-3">
            <CCardHeader><CCardTitle>{etudiant.nom_etudiant}</CCardTitle></CCardHeader>
            <CCardBody>
                <CForm className="g-3">
                    <CRow>
                        <CCol></CCol>
                        <CCol className="pl-3 pb-5" sm="2">
                            <CCard>
                                <CFormLabel>
                                    <CFormControl disabled
                                    type="file"
                                    name="photo_etudiant"
                                    accept="image/*"
                                    multiple={false}
                                    onChange={handleInputFileChange}
                                    hidden
                                    />
                                    <img alt=""  src={"http://localhost:8000/users/"+ etudiant.photo_etudiant } width="150" height="150" className="image-preview__image" />
                                    
                                </CFormLabel>
                            </CCard>
                        </CCol>
                        <CCol></CCol>
                        <CCol sm="8">
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    N° D&apos;INSCRIPTION :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                        <CIcon name="cil-user" color="dark"/>
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
                                            type="number"
                                            name="num_inscription_etudiant"
                                            placeholder="N° D'INSCRIPTION AU CONCOURS"
                                            value={etudiant.num_inscription_etudiant}
                                            min="1"
                                            required
                                            
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
{/*                             
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    N° MATRICULE :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                        <CIcon name="cil-user" />
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
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
                            </CRow> */}
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    E-MAIL :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            @
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
                                        type="email"
                                        name="email_etudiant"
                                        value={etudiant.email_etudiant}
                                        placeholder="EMAIL"
                                        
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    SITUATION MATRIMONIALE
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-people" />
                                        </CInputGroupText>
                                        <CFormSelect disabled size="sm" value={etudiant.situation_matrimoniale_etudiant} onChange={handleInputChange} name="situation_matrimoniale_etudiant" aria-label="Default select example">
                                            <option value="Célibataire">Célibataire</option>
                                            <option value="Marié">Marié(e)</option>
                                        </CFormSelect>
                                    </CInputGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    SEXE :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-people" />
                                        </CInputGroupText>
                                        <CFormSelect disabled value={etudiant.sexe_etudiant}  size="sm" onChange={handleInputChange} name="sexe_etudiant" aria-label="Default select example">
                                            <option value="1">Masculin</option>
                                            <option value="0">Féminin</option>
                                        </CFormSelect>
                                    </CInputGroup>
                                </CCol>
                            </CRow>    
                        </CCol>
                    </CRow>
                    <CRow>
                        <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                            N° MATRICULE :
                        </CFormLabel>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <span> </span>
                                </CInputGroupText>
                                <CFormControl readOnly size="sm"
                                type="text"
                                name="num_matricule"
                                placeholder="N° MATRICULE"
                                value={etudiant.num_matricule}
                                onChange={handleInputChange}
                                required
                                />
                            </CInputGroup>
                        </CCol>
                            <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                               ETUDIANT N° : 
                            </CFormLabel>
                            <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <span>  </span>
                                </CInputGroupText>
                                <CFormControl readOnly size="sm"
                                type="text"
                                name="num_etudiant"
                                placeholder="N° ETUDIANT"
                                value={etudiant.num_etudiant}
                                onChange={handleInputChange}
                                className=""
                                required
                                />
                            </CInputGroup>
                            </CCol>
                    </CRow>
                    <CRow>
                        <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                            NOM ET PRENOM :
                        </CFormLabel>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText color="danger">
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl readOnly size="sm"
                                type="text"
                                id="nom_etudiant"
                                name="nom_etudiant"
                                value={etudiant.nom_etudiant}
                                onChange={handleInputChange}
                                placeholder="NOM"
                                required
                                />
                                <CFormControl readOnly size="sm"
                                type="text"
                                id="prenom_etudiant"
                                name="prenom_etudiant"
                                value={etudiant.prenom_etudiant}
                                onChange={handleInputChange}
                                placeholder="PRENOM"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                            NAISSANCE :
                        </CFormLabel>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <span>Né(e) le </span>
                                </CInputGroupText>
                                <CFormControl readOnly size="sm"
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
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <span> à </span>
                                </CInputGroupText>
                                <CFormControl readOnly size="sm"
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
                        
                    </CRow>
                    <CRow>
                        <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                            TELEPHONE :
                        </CFormLabel>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-phone" />
                                </CInputGroupText>
                                <CFormControl readOnly size="sm"
                                type="text"
                                name="telephone_etudiant"
                                value={etudiant.telephone_etudiant}
                                onChange={handleInputChange}
                                placeholder="N° TELEPHONE"
                                required
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                </CForm>
            </CCardBody>
          </CCard>

          <CCard className="text-center mb-3">
            <CCardHeader><CCardTitle>IMMATRICULATION PROVISOIRE</CCardTitle></CCardHeader>
            <CCardBody>
                <CForm className="g-3">
                    <CRow>
                        <CCol>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    ANNEE DU BACC :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-calendar" />
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
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
                            </CRow>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    N° BACC :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-pencil" />
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
                                        type="text"
                                        name="numero"
                                        data-parent="info_bacc_etudiant"
                                        value={etudiant.info_bacc_etudiant.numero}
                                        onChange={handleInputChangeJson}
                                        placeholder="N° BACC"
                                        required
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    SERIE :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-people" />
                                        </CInputGroupText>
                                        <CFormSelect disabled value={etudiant.info_bacc_etudiant} size="sm"data-parent="info_bacc_etudiant" onChange={handleInputChangeJson} aria-label="Default select example" name="serie">
                                            <option value="A"> Série A </option>
                                            <option value="C"> Série C </option>
                                            <option value="D"> Série D </option>
                                            <option value="Scientifique"> Scientifique</option>
                                            <option value="Ose">Ose</option>
                                            <option value="Littéraire">Littéraire</option>
                                        </CFormSelect>
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol>
                        <CRow>
                            <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                                NATURE :
                            </CFormLabel>
                            <CCol>
                                <CInputGroup className="mb-3 has-validation">
                                    <CInputGroupText >
                                        <CIcon name="cil-people" />
                                    </CInputGroupText>
                                    <CFormSelect disabled value={etudiant.info_bacc_etudiant} size="sm"data-parent="info_bacc_etudiant" onChange={handleInputChangeJson} aria-label="Default select example" name="nature">
                                        <option value="Général">Général</option>
                                        <option value="Technique">Technique</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                                CENTRE :
                            </CFormLabel>
                            <CCol>
                                <CInputGroup className="mb-3 has-validation">
                                    <CInputGroupText >
                                        <CIcon name="cil-pencil" />
                                    </CInputGroupText>
                                    <CFormControl readOnly size="sm"
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
                        </CRow>
                        <CRow>
                            <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                                MENTION :
                            </CFormLabel>
                            <CCol>
                                <CInputGroup className="mb-3 has-validation">
                                    <CInputGroupText >
                                        <CIcon name="cil-people" />
                                    </CInputGroupText>
                                    <CFormSelect disabled value={etudiant.info_bacc_etudiant} size="sm"data-parent="info_bacc_etudiant" onChange={handleInputChangeJson} aria-label="Default select example" name="mention">
                                        <option value="Très Bien">Très Bien</option>
                                        <option value="Bien">Bien</option>
                                        <option value="Assez Bien">Assez Bien</option>
                                        <option value="Passable">Passable</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                        </CRow>
                       </CCol>
                   </CRow>
                </CForm>
            </CCardBody>
          </CCard>

          <CCard className="text-center mb-3">
            <CCardHeader><CCardTitle>DEMANDE D&apos;INSCRIPTION</CCardTitle></CCardHeader>
            <CCardBody>
                <CForm className="g-3">
                    <CRow>
                        <CCol>
                            <CRow>
                                <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                                    NIVEAU :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-people" />
                                        </CInputGroupText>
                                        <CFormSelect value={etudiant.niveau} disabled  size="sm"onChange={handleInputChange} aria-label="Default select example" name="niveau">
                                            <option value="L1">L1</option>
                                            <option value="L2">L2</option>
                                            <option value="L3">L3</option>
                                            <option value="M1">M1</option>
                                            <option value="M2">M2</option>
                                        </CFormSelect>
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol>
                            <CRow>
                                <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                                    PARCOURS :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-people" />
                                        </CInputGroupText>
                                        <CFormSelect disabled value={etudiant.parcours} size="sm"onChange={handleInputChange} aria-label="Default select example" name="parcours">
                                            <option value="Génie Logiciel et Base de Donnée">Génie Logiciel et Base de Donnée</option>
                                            <option value="Administration Système et Reseau">Administration Système et Reseau</option>
                                            <option value="Généraliste">Généraliste</option>
                                        </CFormSelect>
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CForm>
            </CCardBody>
          </CCard>

          <CCard className="text-center mb-3">
            <CCardHeader><CCardTitle>ETAT CIVIL</CCardTitle></CCardHeader>
            <CCardBody>
                <CForm className="g-3">
                <CRow>
                    <CCol></CCol>
                    <CCol className="pl-3" sm="4">
                            <CCard>
                                <CFormLabel>
                                    <CFormControl disabled
                                    type="file"
                                    name="upload_cin_etudiant"
                                    accept="image/*"
                                    multiple={false}
                                    onChange={handleInputFileChange}
                                    hidden
                                    />
                                    <img alt=""  src={"http://localhost:8000/cin/"+etudiant.upload_cin_etudiant} width="350" height="250" className="image-preview__image" />
                                   
                                </CFormLabel>
                            </CCard>
                            {uploadMessage.upload_cin_etudiant ? (
                                uploadMessage.upload_cin_etudiant==='error' ? 
                                    ( <p className="text-danger">Veuillez importer un image au format JPG,JPEG,PNG,GIF!</p>)
                                    : (<p className="text-success"> { uploadMessage.upload_cin_etudiant } </p>)
                            ) : (<p className="text-medium-emphasis"> Aucune image </p>)}
                        </CCol>
                        <CCol></CCol>
                        <CCol sm="6">
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    NATIONALITE :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-pencil" />
                                        </CInputGroupText>
                                        <CFormSelect disabled value={etudiant.nationalite_etudiant} size="sm" onChange={handleInputChange} aria-label="Default select example" name="nationalite_etudiant">
                                            <option value="Malagasy">MALAGASY</option>
                                            <option value="Français">FRANCAIS</option>
                                        </CFormSelect>
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    N° CIN OU PASSEPORT :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-pencil" />
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
                                        type="number"
                                        name="numero"
                                        data-parent="info_cin_etudiant"
                                        value={etudiant.info_cin_etudiant.numero}
                                        onChange={handleInputChangeJson}
                                        maxLength="12"
                                        placeholder="N° CIN OU PASSEPORT"
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    DATE DELIVRANCE :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText>
                                        <span>Délivré du </span>
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
                                        type="date"
                                        name="date_delivre"
                                        data-parent="info_cin_etudiant"
                                        value={etudiant.info_cin_etudiant.date_delivre}
                                        onChange={handleInputChangeJson}
                                        placeholder="DATE DELIVRANCE"
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    LIEU DELIVRANCE :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation" >
                                        <CInputGroupText>
                                            <span> à </span>
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
                                        type="text"
                                        name="lieu_delivre"
                                        data-parent="info_cin_etudiant"
                                        value={etudiant.info_cin_etudiant.lieu_delivre}
                                        onChange={handleInputChangeJson}
                                        placeholder="LIEU DELIVRANCE"
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    DATE DUPLICATA :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText>
                                        <span>Duplicata du </span>
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
                                        type="date"
                                        name="date_duplicata"
                                        data-parent="info_cin_etudiant"
                                        value={etudiant.info_cin_etudiant.date_duplicata}
                                        onChange={handleInputChangeJson}
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    LIEU DUPLICATA :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText>
                                        <span> à </span>
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
                                        type="text"
                                        name="lieu_duplicata"
                                        data-parent="info_cin_etudiant"
                                        value={etudiant.info_cin_etudiant.lieu_duplicata}
                                        onChange={handleInputChangeJson}
                                        placeholder="LIEU DUPLICATA"
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CForm>
            </CCardBody>
          </CCard>

          <CCard className="text-center mb-3">
            <CCardHeader><CCardTitle>PARENTS</CCardTitle></CCardHeader>
            <CCardBody>
                <CForm className="g-3">
                    <CRow>
                        <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                            NOM DU PERE :
                        </CFormLabel>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl readOnly size="sm"
                                type="text"
                                name="pere"
                                data-parent="info_parents_etudiant"
                                value={etudiant.info_parents_etudiant.pere}
                                onChange={handleInputChangeJson}
                                placeholder="NOM DU PERE"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                            NOM DE LA MERE :
                        </CFormLabel>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl readOnly size="sm"
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
                        <CFormLabel className="col-sm-2 col-form-label col-form-label-sm text-end">
                            NOM DU TUTEUR :
                        </CFormLabel>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl readOnly size="sm"
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
                            <CRow>
                                <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                                    NOMBRE D&apos;ENFANT A CHARGE
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-user" />
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
                                        type="number"
                                        name="nb_enfant_charge"
                                        data-parent="info_parents_etudiant"
                                        value={etudiant.info_parents_etudiant.nb_enfant_charge}
                                        onChange={handleInputChangeJson}
                                        placeholder="NOMBRE D'ENFANT A CHARGE"
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                     BOURSIERS :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-pencil" />
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
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
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CRow>
                                <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                                    ADRESSE DES PARENTS OU TUTEURS :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-user" />
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
                                        type="text"
                                        name="adresse"
                                        data-parent="info_parents_etudiant"
                                        value={etudiant.info_parents_etudiant.adresse}
                                        onChange={handleInputChangeJson}
                                        placeholder="ADRESSE DES PARENTS OU TUTEURS"
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    N° TELEPHONE :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-pencil" />
                                        </CInputGroupText>
                                        <CFormControl readOnly size="sm"
                                        type="text"
                                        name="tel"
                                        data-parent="info_parents_etudiant"
                                        value={etudiant.info_parents_etudiant.tel}
                                        onChange={handleInputChangeJson}
                                        placeholder="N° TELEPHONE"
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CForm>
            </CCardBody>
          </CCard>

          <CCard className="text-center mb-3">
            <CCardHeader><CCardTitle>ENSEIGNEMENT SECONDAIRE</CCardTitle></CCardHeader>
            <CCardBody>
            {etudiant.info_enseignement_sec.length > 0 ? (
            <CTable hover responsive align="middle" className="mb-0">
                <CTableHead color="dark">
                <CTableRow>
                    <CTableHeaderCell className="text-center">Année</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Classe</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Nature</CTableHeaderCell>
                    
                </CTableRow>
                </CTableHead>
                <CTableBody>
                {etudiant.info_enseignement_sec.map((sec,index) => (
                    <CTableRow key={index} >
                        <CTableDataCell> <small>{sec.annee} </small> </CTableDataCell>
                        <CTableDataCell> <small>{sec.classe} </small></CTableDataCell>
                        <CTableDataCell> <small>{sec.nature} </small></CTableDataCell>
                        
                    </CTableRow>
                ))}
                </CTableBody>
            </CTable>
            ): (
                <CCardText>
                    Aucune données inserée
                </CCardText>
                )}
            </CCardBody>
        </CCard>

        <CCard className="text-center mb-3">
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
                        
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                {etudiant.info_enseignement_sup.map((sup,index) => (
                    <CTableRow key={index} >
                        <CTableDataCell> <small>{sup.annee}</small>  </CTableDataCell>
                        <CTableDataCell> <small>{sup.univ}</small>  </CTableDataCell>
                        <CTableDataCell> <small>{sup.etablissement}</small>  </CTableDataCell>
                        <CTableDataCell> <small>{sup.niveau}</small>  </CTableDataCell>
                        <CTableDataCell> <small>{sup.formation}</small>  </CTableDataCell>
                        <CTableDataCell> <small>{sup.red} </small> </CTableDataCell>
                        <CTableDataCell> <small>{sup.mention}</small> </CTableDataCell>
                        <CTableDataCell> <small>{sup.diplome}</small>  </CTableDataCell>
                        
                    </CTableRow>
                ))}
                </CTableBody>
            </CTable>
            ): (
                <CCardText>
                    Aucune données inserée
                </CCardText>
                )}
               
            </CCardBody>
        </CCard>

        <CCard className="text-center mb-3">
            <CCardHeader><CCardTitle>QUITANCE DROIT D&apos;INSCRIPTION </CCardTitle></CCardHeader>
            <CCardBody>
                <CForm className="row g-3">
                <CCol></CCol>
                    <CCol className="pl-3" sm="5">
                        <CCard>
                            <CFormLabel>
                                <CFormControl disabled
                                type="file"
                                name="upload_borderau"
                                accept="image/*"
                                multiple={false}
                                onChange={handleInputFileChange}
                                hidden
                                />
                                <img alt=""  src={!inscription.upload_borderau ? "http://localhost:8000/users/no-image-icon-23485.png":"http://localhost:8000/borderau/"+ inscription.upload_borderau } width="150" height="150" className="image-preview__image" />    
                    
                            </CFormLabel>
                        </CCard>
                        {uploadMessage.upload_borderau ? (
                                uploadMessage.upload_borderau==='error' ? 
                                    ( <p className="text-danger">Veuillez importer un image au format JPG,JPEG,PNG,GIF!</p>)
                                    : (<p className="text-success"> { uploadMessage.upload_borderau } </p>)
                            ) : (<p className="text-medium-emphasis"> Aucune image </p>)}
                    </CCol>
                    <CCol></CCol>
                    <CCol sm="4">
                        <CRow>
                            <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                                N° BORDEREAU :
                            </CFormLabel>
                            <CCol>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                        <CIcon name="cil-user" color="dark"/>
                                        </CInputGroupText>
                                        <CFormControl readOnly 
                                        type="number" name="numero" placeholder="NUMERO BORDEREAU"
                                        value={inscription.info_borderau.numero}
                                        onChange={handleInputChangeJson2}
                                        max="7"
                                        required
                                        />
                                    </CInputGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                                DATE :
                            </CFormLabel>
                            <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                    <CIcon name="cil-calendar" />
                                </CInputGroupText>
                                <CFormControl readOnly 
                                type="date" name="date" value={inscription.info_borderau.date}
                                onChange={handleInputChangeJson2} />
                                </CInputGroup>
                            </CCol>
                        </CRow> <br/>
                        <CRow>
                            <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                                MONTANT :
                            </CFormLabel>
                            <CCol>
                                <CInputGroup>
                                <CFormControl readOnly 
                                type="number" name="montant" placeholder="MONTANT" value={inscription.info_borderau.montant}
                                onChange={handleInputChangeJson2} />
                                <CInputGroupText>
                                <span>Ariary </span>
                                </CInputGroupText>
                                </CInputGroup>
                            </CCol>
                        </CRow>
                     </CCol>
                </CForm>
            </CCardBody>
          </CCard>
          <CCard className="text-center mb-3">
            <CCardHeader><CCardTitle>QUITUS</CCardTitle></CCardHeader>
            <CCardBody>
            {quitus.length > 0 ? (
            <CTable hover responsive align="middle" className="mb-0">
                <CTableHead color="dark">
                <CTableRow>
                    <CTableHeaderCell className="text-center">NATURE</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">FICHIER</CTableHeaderCell>
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                </CTableRow>
                </CTableHead>
                <CTableBody>
                {quitus.map((sec,index) => (
                    <CTableRow key={index} >
                        <CTableDataCell> <small>{sec.info_quitus} </small> </CTableDataCell>
                        <CTableDataCell> {sec.upload_quitus ? (
                            <CLink href={"http://localhost:8000/quitus/"+sec.upload_quitus}><small>{sec.upload_quitus}</small> </CLink>
                        ): (
                            <small> Aucun image quitus </small>
                        )}
                            {/* <CButton color="danger" variant="outline" size="sm" shape="rounded-pill" onClick={()=>removeItemSec(index)}> </CButton> */}
                        </CTableDataCell>
                    </CTableRow>
                ))}
                </CTableBody>
            </CTable>
            ): (
                <CCardText>
                    Aucun données inserée.
                </CCardText>
                )}
            
            </CCardBody>
        </CCard>
                <br />
                <br />
                <br />
        {!etudiant.statut_etudiant_re ? (
            <>
            <div className="m-3 d-grid gap-2 col-4 mx-auto">
                <CButton onClick={saveInscription} size="lg" color="success"> <CIcon content={freeSet.cilSave} /> Valider la réinscription </CButton>
            </div>
            </>
             ) : (
                <>
                <CCard className="success text-center mb-3">
                  <CCardHeader><CCardTitle> VALIDATION </CCardTitle></CCardHeader>
                  <CCardBody>
                      <h3 className="text-center text-success"> Déjà Validéé </h3> 
                  </CCardBody>
                  </CCard>
                </>
            )}
        </>
    )
}

export default Profile_Etudiants_Reinscription
