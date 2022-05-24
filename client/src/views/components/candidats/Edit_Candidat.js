import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import CandidatService from "../../../services/CandidatService";
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
  CRow,
  CFormCheck,
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Edit_Candidat = () => {
  const initialCandidatState = {
    num_inscription_candidat: 0,
    nom_candidat: "",
    prenom_candidat: "",
    telephone_candidat: "",
    email_candidat : "",
    status_candidat : true,
    upload_profile_candidat : ""
  };

const history = useHistory()
const location = useLocation()

  const [candidat, setCandidat] = useState(initialCandidatState);
  const [validated, setValidated] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({ color : "medium-emphasis", message : "Aucune image" });
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    getCandidat();
  }, []);

  const getCandidat = () => {
    const id = location.state ? location.state.selectedItemId : '0'
    CandidatService.findById(id)
      .then(response => {
        setCandidat(response.data);
      })
      .catch(error => {
        if (error.response) {
          var resultat = error.response.data.result
          setMessage(resultat)
          setValidated(true)
        }
      });
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCandidat({ ...candidat, [name]: value });
  };

  const handleInputFileChange = event => {
    const image = event.target.files[0]
    if(image){
      var ext = ["jpg","jpeg","png","gif"]
      var fileExtension = image.name.split('.').pop().toLowerCase()
      if(ext.indexOf(fileExtension)>-1){
        setCandidat({ ...candidat, upload_profile_candidat: image });
        setUploadMessage({color:"success", message : image.name})
      } else
        setUploadMessage({color:"danger", message : "Veuillez importer un image au format JPG,JPEG,PNG,GIF!"})
    }
  };

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

      CandidatService.update(candidat.num_inscription_candidat, formData)
        .then(response => {
          history.push({
            pathname: '/candidats',
            state: { 
                action : 'update',
                message : response.data.result,
                new_candidat_id: candidat.num_inscription_candidat
            }
          });
        })
        .catch(error => {
          if (error.response) {
            var resultat = error.response.data.result
            setMessage(resultat)
            setValidated(true)
          }
        });
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
                  invalid={validated}
                  min="1"
                  required
                  readOnly
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
                  required
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
                  required
                />
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
              <CRow className="mt-2 mb-2">
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
              </CRow>
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

export default Edit_Candidat
