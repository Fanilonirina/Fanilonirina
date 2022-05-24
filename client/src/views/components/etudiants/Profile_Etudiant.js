import React, { useState, useRef } from 'react'
import EtudiantService from 'src/services/EtudiantService'
import { useHistory,useLocation } from "react-router-dom"
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
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CAlert,
    CAlertHeading,
    CFormLabel,
    CToastBody,
    CToastClose,
    CToast,
    CToaster,

  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import { freeSet } from '@coreui/icons'

const Profile_Etudiant = () => {

    //const currentUser =  JSON.parse(localStorage.getItem("user"))
    let history = useHistory()
    const toaster = useRef()

    var curr = new Date()
    curr.setDate(curr.getDate() + 3)

    const location = useLocation()
  
    const Toast =  (color, message) => {
        addToast (
        <CToast autohide={true} className="align-items-center">
          <div className={"d-flex c-alert-" + color}>
            <CToastBody>{message}</CToastBody>
            <CToastClose className="me-2 m-auto" />
          </div>
        </CToast>
      );
    }

    
    const initialEtudiantState = {
        num_inscription_etudiant: "",
        nom_etudiant: "",
        prenom_etudiant: "",
        date_naissance_etudiant: "",
        lieu_naissance_etudiant: "",
        sexe_etudiant: 0,
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
        photo_etudiant: "",
        login_etudiant:'',
        mot_de_passe_etudiant:''
      };

    const initialSec = { annee:'2021', classe:'', nature:''}
    const initialSup = { red:'', univ:'', annee:'2021', niveau:'', diplome:'', mention:'', formation:'', etablissement:''}


    const [toast, addToast] = useState(0)
    const [etudiant, setEtudiant] = useState(initialEtudiantState)

    const [sec,setSec] = useState(initialSec)
    const [sup,setSup] = useState(initialSup)
    const [visible_esec, setVisibleEsec] = useState(false)
    const [visible_esup, setVisibleEsup] = useState(false)
    const [rowInserted, setRowInserted] = useState(() => {
        return !(location.state == null)
    })

    const [preview, setPreview] = useState({photo_etudiant:null, upload_borderau:null, upload_bacc_etudiant:null, upload_cin_etudiant:null})

    const [uploadMessage, setUploadMessage] = useState({photo_etudiant:null, upload_borderau:null, upload_bacc_etudiant:null, upload_cin_etudiant:null})

      const handleInputChange = event => {
        const { name, value } = event.target;
        setEtudiant({ ...etudiant, [name]: value });
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

    const confirmModalEsup = () => {
        setVisibleEsup(!visible_esup)
      }

      const confirmModalEsec = () => {
        setVisibleEsec(!visible_esec)
      }

      const saveInfoEnsSec = () => {
        setEtudiant({ ...etudiant, info_enseignement_sec:[...etudiant.info_enseignement_sec, sec]});
        setSec(initialSec)
        setVisibleEsec(false)
      } 

      const saveInfoEnsSup = () => {
        setEtudiant({ ...etudiant, info_enseignement_sup:[...etudiant.info_enseignement_sup, sup]});
        setVisibleEsup(false)
      } 

      const handleInputChangeSec = event => {
        const { name, value } = event.target;
        setSec({ ...sec, [name]: value });
      };

      const handleInputChangeSup = event => {
        const { name, value } = event.target;
        setSup({ ...sup, [name]: value });
      };

      const removeItemSec = (id) =>{
        const newSec = etudiant.info_enseignement_sec.filter((_,index)=>index!==id)
        setEtudiant({ ...etudiant, info_enseignement_sec:newSec})
      }

      const removeItemSup = (id) =>{
        const newSup = etudiant.info_enseignement_sup.filter((_,index)=>index!==id)
        setEtudiant({ ...etudiant, info_enseignement_sup:newSup})
      }

      const getCurrentEtudiant = () => {
        const num_inscription_etudiant = JSON.parse(localStorage.getItem("user")).num_inscription_etudiant
        EtudiantService.findById(num_inscription_etudiant)
            .then(response => {
                setPreview({
                    photo_etudiant:'http://localhost:8000/users/'+response.data.photo_etudiant, 
                    upload_cin_etudiant:'http://localhost:8000/cin/'+response.data.upload_cin_etudiant
                })
                setUploadMessage({
                    photo_etudiant: response.data.photo_etudiant, 
                    upload_cin_etudiant: response.data.upload_cin_etudiant
                })

                setEtudiant(response.data)
                console.log(response.data)
            })
            .catch(error => {
            if (error.response) {
                console.log(error.response)
            }
            });
      }
    
    React.useEffect(() => {
        getCurrentEtudiant()

        if(rowInserted){
            showNotificationRowInserted()
        }
        
    }, [])

    const showNotificationRowInserted = () => {
        var result = location.state;
        switch (result.action) {
          case "add":
            Toast('success', result.message)
            break;
          case "update":
            Toast('warning', result.message)
            break;
          default:
            break;
        }
    
        setTimeout(() => {
            setRowInserted(false)
            history.replace()
        }, 3000);
        
      }

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
                    setPreview({...preview, [name]:result})
                };
                reader.readAsDataURL(image);
            } else{
                setUploadMessage({...uploadMessage, [name]:'error'})
            }
        }
    };

    const updateEtudiant = () => {
        var formData = new FormData()
        var jsonData = [
            "info_cin_etudiant",
            "info_parents_etudiant",
            "info_bacc_etudiant",
            "info_logement_etudiant",
            "info_enseignement_sec",
            "info_enseignement_sup"
        ]

        for(let key in etudiant){
            if(jsonData.indexOf(key)>-1)
                formData.append(key,JSON.stringify(etudiant[key]))
            else
                formData.append(key,etudiant[key])
        }
        jsonData = ["info_borderau"]

        for(var value of formData.values()){
            console.log(value)
        }

        EtudiantService.updateProfile(etudiant.num_inscription_etudiant , formData)
        .then(response => {
            Toast('success', response.data.result)
            getCurrentEtudiant()
        }).catch(error=>{
          if(error.response){
            const data = error.response.data
            Toast('danger', data.result)
            console.log(data)
          } else {
            alert('Erreur survenue dans le serveur!')
          }
        })

    }


    return (
        <>
        <CToaster ref={toaster} push={toast} placement="top-center" />

        <CAlert color="secondary text-center">
        {!etudiant.statut_etudiant ? (<>
            <CAlertHeading className="text-center text-danger" tag="h3">Inscription en attente</CAlertHeading>
            <p> Veuillez valider votre inscription dans le menu inscription</p>
            </>
                ) : (
                    <CAlertHeading className="text-center text-success" tag="h3">Vous êtes déjà inscrit</CAlertHeading>
                )}
        </CAlert>

        <CCard className="text-center mb-3">
            <CCardHeader><CCardTitle>MON IDENTITE</CCardTitle></CCardHeader>
            <CCardBody>
                <CForm className="g-3">
                    <CRow>
                        <CCol></CCol>
                        <CCol className="pl-3 pb-5" sm="2">
                            <CCard>
                                <CFormLabel>
                                    <CFormControl
                                    type="file"
                                    name="photo_etudiant"
                                    accept="image/*"
                                    multiple={false}
                                    onChange={handleInputFileChange}
                                    hidden
                                    />
                                    <img alt=""  src={preview.photo_etudiant ? preview.photo_etudiant : "http://localhost:8000/users/no-image-icon-23485.png"} width="150" height="150" className="image-preview__image" />
                                    <p className="text-medium-emphasis"> Importer une image </p>
                                </CFormLabel>
                            </CCard>
                            {uploadMessage.photo_etudiant ? (
                                uploadMessage.photo_etudiant==='error' ? 
                                    ( <p className="text-danger">Veuillez importer un image au format JPG,JPEG,PNG,GIF!</p>)
                                    : (<p className="text-success"> { uploadMessage.photo_etudiant } </p>)
                            ) : (<p className="text-medium-emphasis"> Aucune image </p>)}
                            
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
                                        <CFormControl size="sm"
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
                                        <CFormControl size="sm"
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
                                        <CFormControl size="sm"
                                        type="email"
                                        name="email_etudiant"
                                        value={etudiant.email_etudiant}
                                        placeholder="EMAIL"
                                        readOnly
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
                                            <CIcon content={freeSet.cilNotes} size="sm" />
                                        </CInputGroupText>
                                        <CFormSelect value={etudiant.situation_matrimoniale_etudiant} size="sm" onChange={handleInputChange} name="situation_matrimoniale_etudiant" aria-label="Default select example">
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
                                            <CIcon content={freeSet.cilInfinity} size="sm" />
                                        </CInputGroupText>
                                        <CFormSelect value={etudiant.sexe_etudiant} size="sm" onChange={handleInputChange} name="sexe_etudiant" aria-label="Default select example">
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
                                <CFormControl size="sm"
                                type="text"
                                id="nom_etudiant"
                                name="nom_etudiant"
                                value={etudiant.nom_etudiant}
                                onChange={handleInputChange}
                                placeholder="NOM"
                                required
                                />
                                <CFormControl size="sm"
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
                                <CFormControl size="sm"
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
                                <CFormControl size="sm"
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
                                <CFormControl size="sm"
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
                                        <CFormControl size="sm"
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
                                        <CFormControl size="sm"
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
                                        <CFormSelect value={etudiant.info_bacc_etudiant.serie} size="sm"data-parent="info_bacc_etudiant" onChange={handleInputChangeJson} aria-label="Default select example" name="serie">
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
                                    <CFormSelect value={etudiant.info_bacc_etudiant.nature} size="sm"data-parent="info_bacc_etudiant" onChange={handleInputChangeJson} aria-label="Default select example" name="nature">
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
                                    <CFormControl size="sm"
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
                                    <CFormSelect value={etudiant.info_bacc_etudiant.mention} size="sm"data-parent="info_bacc_etudiant" onChange={handleInputChangeJson} aria-label="Default select example" name="mention">
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
                                        <CFormSelect value={etudiant.niveau} size="sm"onChange={handleInputChange} aria-label="Default select example" name="niveau">
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
                                        <CFormSelect value={etudiant.parcours} size="sm"onChange={handleInputChange} aria-label="Default select example" name="parcours">
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
                                    <CFormControl
                                    type="file"
                                    name="upload_cin_etudiant"
                                    accept="image/*"
                                    multiple={false}
                                    onChange={handleInputFileChange}
                                    hidden
                                    />
                                    <img alt=""  src={preview.upload_cin_etudiant ? preview.upload_cin_etudiant : "http://localhost:8000/users/no-image-icon-23485.png"} width="350" height="250" className="image-preview__image" />
                                    <p className="text-medium-emphasis"> Importer une image </p>
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
                                        <CFormSelect  value={etudiant.nationalite_etudiant} size="sm" onChange={handleInputChange} aria-label="Default select example" name="nationalite_etudiant">
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
                                        <CFormControl size="sm"
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
                                        <CFormControl size="sm"
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
                                        <CFormControl size="sm"
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
                                        <CFormControl size="sm"
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
                                        <CFormControl size="sm"
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
                                <CFormControl size="sm"
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
                                <CFormControl size="sm"
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
                                <CFormControl size="sm"
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
                                        <CFormControl size="sm"
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
                                        <CFormControl size="sm"
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
                                        <CFormControl size="sm"
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
                                        <CFormControl size="sm"
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
                    <CTableHeaderCell className="text-center"></CTableHeaderCell>
                </CTableRow>
                </CTableHead>
                <CTableBody>
                {etudiant.info_enseignement_sec.map((sec,index) => (
                    <CTableRow key={index} >
                        <CTableDataCell> <small>{sec.annee} </small> </CTableDataCell>
                        <CTableDataCell> <small>{sec.classe} </small></CTableDataCell>
                        <CTableDataCell> <small>{sec.nature} </small></CTableDataCell>
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
                        <CTableHeaderCell className="text-center"></CTableHeaderCell>
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
        </CCard>

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
                    <CFormControl size="sm"
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
                    <CFormControl size="sm"
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
                    <CFormSelect value={etudiant.info_bacc_etudiant.nature} size="sm" onChange={handleInputChangeSec} aria-label="Default select example" name="nature">
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
                    <CFormControl size="sm"
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
                    <CFormSelect size="sm" onChange={handleInputChangeSup} aria-label="Default select example" name="univ">
                        <option>UNIVERSITE</option>
                        <option value="UF">U/F</option>
                        <option value="UF">U/A</option>
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="mb-3 has-validation">
                    <CInputGroupText >
                        <CIcon name="cil-people" />
                    </CInputGroupText>
                    <CFormControl size="sm"
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
                    <CFormSelect size="sm" onChange={handleInputChangeSup} aria-label="Default select example" name="niveau">
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
                    <CFormSelect size="sm"onChange={handleInputChangeSup} aria-label="Default select example" name="formation">
                        <option>FORMATION</option>
                        <option value="Licence professionnelle">Licence professionnelle</option>
                        <option value="Master professionnelle">Master professionnelle</option>
                    </CFormSelect>
                </CInputGroup>
                <CInputGroup className="mb-3">
                    <CInputGroupText>
                    <CIcon name="cil-user" color="dark"/>
                    </CInputGroupText>
                    <CFormControl size="sm"
                    type="text" name="red" placeholder="RED" value={sup.red}
                    onChange={handleInputChangeSup}
                    />
                </CInputGroup>
                <CInputGroup className="mb-3">
                    <CInputGroupText>
                    <CIcon name="cil-user" color="dark"/>
                    </CInputGroupText>
                    <CFormControl size="sm"
                    type="text" name="mention" placeholder="MENTION" value={sup.mention}
                    onChange={handleInputChangeSup}
                    />
                </CInputGroup>
                <CInputGroup className="mb-3">
                    <CInputGroupText>
                    <CIcon name="cil-user" color="dark"/>
                    </CInputGroupText>
                    <CFormSelect size="sm"onChange={handleInputChangeSup} aria-label="Default select example" name="diplome">
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

        <br />

        <CCard className="text-center mb-3">
            <CCardHeader><CCardTitle>AUTHENTIFICATION</CCardTitle></CCardHeader>
            <CCardBody>
                <CForm className="g-3">
                    <CRow>
                        <CCol>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    LOGIN :
                                </CFormLabel>
                                <CCol>
                                <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-user" />
                                        </CInputGroupText>
                                        <CFormControl size="sm"
                                        type="text"
                                        name="login_etudiant"
                                        value={etudiant.login_etudiant}
                                        onChange={handleInputChange}
                                        placeholder="LOGIN"
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol>
                            <CRow>
                                <CFormLabel className="col-sm-3 col-form-label col-form-label-sm text-end">
                                    MOT DE PASSE :
                                </CFormLabel>
                                <CCol>
                                    <CInputGroup className="mb-3 has-validation">
                                        <CInputGroupText >
                                            <CIcon name="cil-lock-locked" />
                                        </CInputGroupText>
                                        <CFormControl size="sm"
                                        type="password"
                                        name="mot_de_passe_etudiant"
                                        value={etudiant.mot_de_passe_etudiant}
                                        onChange={handleInputChange}
                                        placeholder="MOT DE PASSE"
                                        />
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CForm>
            </CCardBody>
          </CCard>
          
        {etudiant.statut_etudiant && (
             <div className="m-3 d-grid gap-2 col-4 mx-auto">
                <CButton onClick={updateEtudiant} size="lg" color="success"> <CIcon content={freeSet.cilSave} /> Modifier mon profile </CButton>
            </div>
        )}
           
        </>
    )
}

export default Profile_Etudiant
