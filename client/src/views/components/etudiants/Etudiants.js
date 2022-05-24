import React,{useState} from 'react'
import EtudiantService from 'src/services/EtudiantService'
import { useHistory } from "react-router-dom"
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
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormLabel,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import { freeSet } from '@coreui/icons'

const Reinscription = () => {

    var curr = new Date()
    curr.setDate(curr.getDate() + 3)
    var date = curr.toISOString().substr(0,10)

    const initialInscriptionState =
    {
        info_borderau:{
            date:date,
            numero:'19145621',
            montant:'400000'
        },
        date_inscription:date,
        type_inscription:1,
        upload_borderau:""
    };

    const initialQuitusState = []

    const initialSec = {
        info_quitus: "",
        upload_quitus : ""
      };

    let history = useHistory()

    const [quitus, setQuitus] = useState(initialQuitusState);
    const [sec,setSec] = useState(initialSec)

    const [visible_esec, setVisibleEsec] = useState(false)

    const [inscription, setInscription] = useState(initialInscriptionState)
    const [preview, setPreview] = useState({photo_etudiant:null, upload_borderau:null, upload_bacc_etudiant:null, upload_cin_etudiant:null})
    const [uploadMessage, setUploadMessage] = useState({upload_quitus:null, upload_borderau:null})

    const [message, setMessage] = useState('Aucun image')

    const handleInputChangeJson2 = event => {
        const { name, value } = event.target;
        setInscription({ ...inscription, info_borderau:{...inscription.info_borderau, [name]: value} });
     
      };

      const handleInputChangeQuitus = event => {
        const { name, value } = event.target;
        setSec({ ...sec, [name]: value});
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
                    setInscription({ ...inscription, [name]:image})
                    setUploadMessage({...uploadMessage, [name]:image.name})
                    setPreview({...preview, [name]:result})
                };
                reader.readAsDataURL(image);
            } else{
                setUploadMessage({...uploadMessage, [name]:'error'})
            }
        }
    };

    const handleInputFileChangeQuitus = event => {
        const image = event.target.files[0]
        const { name } = event.target
        var ext = ["jpg","jpeg","png","gif"]
        if(image){
            var fileExtension = image.name.split('.').pop().toLowerCase()
            if(ext.indexOf(fileExtension)>-1){
                const reader = new FileReader();
                reader.onload = ({ target: { result } }) => {
                    setSec({ ...sec, [name]:image})
                    setMessage(image.name)
                };
                reader.readAsDataURL(image);
            } else{
                
            }
        }
    };

    // const removeItemSec = (id) =>{
    //     const newSec = quitus.filter((_,index)=>index!==id)
    //     setQuitus(newSec)
    //   }

      const confirmModalEsec = () => {
        setVisibleEsec(!visible_esec)
      }

    const saveInfoEnsSec = () => {
        setQuitus([...quitus, sec]);
        setSec(initialSec)
        setMessage('Aucun image')
        setVisibleEsec(false)
        console.log(quitus)
      } 

    const saveInscription = () => {
        var formData = new FormData()
        var num_inscription_etudiant = JSON.parse(localStorage.getItem("user")).num_inscription_etudiant

        formData.append("info_borderau",JSON.stringify(inscription.info_borderau))
        formData.append("date_inscription",inscription.date_inscription)
        formData.append("type_inscription",inscription.type_inscription)
        formData.append("upload_borderau",inscription.upload_borderau)
        formData.append("quitus",JSON.stringify(quitus))
       
       for (let index = 0; index < quitus.length; index++) {
          formData.append("upload_quitus", quitus[index].upload_quitus)
        }
       
       for(var value of formData.values()){ 
            console.log(value)
        }

        EtudiantService.updateReinscription(num_inscription_etudiant,formData)
        .then(response => {
          history.push({
            pathname: '/etudiants/profile',
            state: { 
              action : 'add',
              message : response.data.result
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
            <CCardHeader><CCardTitle>QUITANCE DROIT D&apos;INSCRIPTION </CCardTitle></CCardHeader>
            <CCardBody>
                <CForm className="row g-3">
                <CCol></CCol>
                    <CCol className="pl-3" sm="5">
                        <CCard>
                            <CFormLabel>
                                <CFormControl
                                type="file"
                                name="upload_borderau"
                                accept="image/*"
                                multiple={false}
                                onChange={handleInputFileChange}
                                hidden
                                />
                                <img alt=""  
                                    src={preview.upload_borderau ? preview.upload_borderau : "http://localhost:8000/users/no-image-icon-23485.png"} 
                                    width="350" 
                                    height="250" 
                                    className="image-preview__image" 
                                />
                                <p className="text-medium-emphasis"> Importer une image </p>
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
                                        <CFormControl 
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
                                <CFormControl 
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
                                <CFormControl 
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
                        <CTableDataCell> <small>{sec.upload_quitus ? sec.upload_quitus.name : ''} </small></CTableDataCell>
                        <CTableDataCell>
                            {/* <CButton color="danger" variant="outline" size="sm" shape="rounded-pill" onClick={()=>removeItemSec(index)}> </CButton> */}
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

                {quitus.length < 1 ? (
                    <div className="mt-3 d-grid gap-2 col-2 mx-auto">
                        <CButton className="mt-3 " onClick={confirmModalEsec} > <CIcon content={freeSet.cilUserPlus} /> Ajouter </CButton>
                    </div>
                ): (<></>)}
            
            </CCardBody>
        </CCard>

          <CModal alignment="top" visible={visible_esec}>
            <CModalHeader onDismiss={() => setVisibleEsec(false)}>
                <CModalTitle> QUITUS </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm>
                <CFormLabel> NATURE : </CFormLabel>
                <CInputGroup className="mb-5">
                    <CInputGroupText>
                    <CIcon name="cil-user" color="dark"/>
                    </CInputGroupText>
                    <CFormControl
                    type="text" name="info_quitus" placeholder="Nature"
                    value={sec.info_quitus}
                    onChange={handleInputChangeQuitus}
                    min="1"
                    required
                    />
                    </CInputGroup>
                    <CRow>
                  <CCol>
                  <CFormLabel
                      className="btn btn-primary"
                    >
                      <CFormControl
                        type="file"
                        id="upload_quitus"
                        name="upload_quitus"
                        accept="image/*"
                        multiple={false}
                        onChange={handleInputFileChangeQuitus}
                        hidden
                      />
                      Importer un image
                    </CFormLabel>
                    <p className={"small float-end text-medium-emphasis"}>{message}</p>
                  </CCol>
                </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="default" onClick={() => {setVisibleEsec(false)}}>
                Annuler
                </CButton>
                <CButton color="dark" onClick={saveInfoEnsSec} >Ajouter</CButton>
            </CModalFooter>
        </CModal>

          <div className="m-3 d-grid gap-2 col-4 mx-auto">
                <CButton onClick={saveInscription} size="lg" color="success"> <CIcon content={freeSet.cilSave} /> Faire une reinscription </CButton>
            </div>
    </>
  )
}

export default Reinscription