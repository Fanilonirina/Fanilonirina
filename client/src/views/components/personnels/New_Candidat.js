import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import CandidatService from "../../../services/CandidatService"
import UserService from "../../../services/UserService"

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormControl,
  CFormFeedback,
  CInputGroup,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const New_Candidat = () => {

  const history = useHistory()
  
  const initialCandidatState = {
    num_inscription_candidat: 0,
    nom_candidat: "",
    prenom_candidat: "",
    telephone_candidat: "",
    email_candidat : "",
    status_candidat : true,
    upload_profile_candidat : ""
  };

  const [candidat, setCandidat] = useState(initialCandidatState);
  const [invalid, setInvalid] = useState(0);
  //const [uploadMessage, setUploadMessage] = useState({ color : "medium-emphasis", message : "Aucune image" });
  const [message, setMessage] = useState('');


  useEffect(() => {
    checkAuthenticated()
  }, []);

  const checkAuthenticated = () => {
    UserService.isUserAuth().then(response=>{
      if(!response.data.auth){
        history.push({pathname: '/login'});
      } else {
        getLastId()
      }
      console.log(response.data)
    }).catch(error=>{
      if(error.response){
        const data = error.response.data
        console.log(data)
      } else {
        alert('Erreur survenue dans le serveur!')
      }
    })
  }

  const getLastId = () => {
    CandidatService.last()
      .then(response => {
        if(response.data !== null)
          setCandidat({ ...candidat, num_inscription_candidat: response.data.num_inscription_candidat + 1});
        else
          setCandidat({ ...candidat, num_inscription_candidat: 1 });
      })
      .catch(error=>{
        if(error.response){
          const data = error.response.data
          setMessage(data.result)
          setInvalid(1)
          console.log(data)
        } else {
          setInvalid(0)
          alert('Erreur survenue dans le serveur!')
        }
      })
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCandidat({ ...candidat, [name]: value });
  };

  // const handleInputFileChange = event => {
  //   const image = event.target.files[0]
  //   var ext = ["jpg","jpeg","png","gif"]
  //   if(image){
  //     var fileExtension = image.name.split('.').pop().toLowerCase()
  //     if(ext.indexOf(fileExtension)>-1){
  //       setCandidat({ ...candidat, upload_profile_candidat: image })
  //       setUploadMessage({color:"success", message : image.name})
  //     } else
  //       setUploadMessage({color:"danger", message : "Veuillez importer un image au format JPG,JPEG,PNG,GIF!"})
  //   }
  // };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {

      const formData = new FormData()
      formData.append('num_inscription_candidat',candidat.num_inscription_candidat)
      formData.append('nom_candidat',candidat.nom_candidat)
      formData.append('prenom_candidat',candidat.prenom_candidat)
      formData.append('telephone_candidat',candidat.telephone_candidat)
      formData.append('email_candidat',candidat.email_candidat)
      formData.append('status_candidat',candidat.status_candidat)
      formData.append('upload_profile_candidat',candidat.upload_profile_candidat)

      CandidatService.create(formData)
        .then(response => {
          setInvalid(0)
          history.push({
            pathname: '/personnels/candidats',
            state: { 
              action : 'add',
              message : response.data.result,
              new_candidat_id: candidat.num_inscription_candidat
            }
          });
        }).catch(error=>{
          if(error.response){
            const data = error.response.data
            setMessage(data.result)
            error.response.status===404 ? setInvalid(2) : setInvalid(1)
            console.log(data)
          } else {
            setInvalid(0)
            alert('Erreur survenue dans le serveur!')
          }
        })
    }
  }

  return (
    <CRow className="justify-content-center">
      <CCol md="9" lg="7" xl="6">
        <CCard className="mx-4">
          <CCardHeader color="dark">
            <strong>Nouveau candidat</strong> <small></small>
          </CCardHeader>
          <CCardBody className="p-4">
            <CForm
              className="row g-3 needs-validation"
              onSubmit={handleSubmit}
            >
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon name="cil-user" />
                </CInputGroupText>
                <CFormControl 
                  type="number"
                  id="num_inscription_candidat"
                  name="num_inscription_candidat"
                  placeholder="Entrer le numéro de concours du candidat"
                  value={candidat.num_inscription_candidat}
                  onChange={handleInputChange}
                  invalid={invalid===1}
                  min="1"
                  required
                />
                <CFormFeedback invalid>{message}</CFormFeedback>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon name="cil-user" />
                </CInputGroupText>
                <CFormControl 
                  type="text"
                  id="nom_candidat"
                  name="nom_candidat"
                  placeholder="Entrer le nom du candidat"
                  value={candidat.nom_candidat}
                  onChange={handleInputChange}
                  required
                />
              </CInputGroup>
              <CInputGroup className="mb-3 has-validation">
                <CInputGroupText>
                  <CIcon name="cil-user" />
                </CInputGroupText>
                <CFormControl 
                  type="text"
                  id="prenom_candidat"
                  name="prenom_candidat"
                  placeholder="Entrer le prénom du candidat"
                  value={candidat.prenom_candidat}
                  onChange={handleInputChange}
                />
              </CInputGroup>
              <CInputGroup className="mb-3 has-validation">
                <CInputGroupText>@</CInputGroupText>
                <CFormControl 
                  type="email"
                  id="email_candidat"
                  name="email_candidat"
                  placeholder="Entrer l'email du candidat"
                  value={candidat.email_candidat}
                  onChange={handleInputChange}
                  invalid={invalid===2}
                  required
                />
                <CFormFeedback invalid>{message}</CFormFeedback>
              </CInputGroup>
              <CInputGroup className="mb-3 has-validation">
                <CInputGroupText>@</CInputGroupText>
                <CFormControl 
                  type="text"
                  id="telephone_candidat"
                  name="telephone_candidat"
                  placeholder="Entrer le numéro de téléphone du candidat"
                  value={candidat.telephone_candidat}
                  onChange={handleInputChange}
                  required
                />
              </CInputGroup>
                {/* <CRow className="mt-2 mb-2">
                  <CCol md="3">
                    <CFormCheck
                      id="status_candidat"
                      name="status_candidat"
                      className="mt-2"
                      label="Admis"
                      defaultChecked={candidat.status_candidat}
                      onChange={e => setCandidat({...candidat, status_candidat:e.target.checked})}
                    />
                  </CCol>
                  <CCol md="9">
                    <CFormLabel
                      className="btn btn-dark float-end"
                    >
                      <CFormControl
                        type="file"
                        id="upload_profile_candidat"
                        name="upload_profile_candidat"
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
                </CRow> */}
                <CButton color="success" type="submit">
                  Enregistrer
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default New_Candidat
