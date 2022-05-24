import React, { useState, useRef,  useEffect } from 'react'
import PersonnelService from "../../../services/PersonnelService";
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
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CFormLabel,
  CCardTitle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Profile_Personnel = () => {

  const initialPersonnelState = {
    id_personnel: 0,
    idAdmin: "",
    login_personnel: "",
    mot_de_passe_personnel: "",
    nom_personnel: "",
    email_personnel : "",
    departement: ""
  };

//const history = useHistory()
const toaster = useRef()

  const [personnel, setPersonnel] = useState(initialPersonnelState);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");

  const [toast, addToast] = useState(0)
  
  
  //Afficher un erreur si le serveur est éteint
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


  useEffect(() => {
    getPersonnel();
  }, []);

  const getPersonnel = () => {
    const id = JSON.parse(localStorage.getItem("user")).id_personnel
    PersonnelService.findById(id)
      .then(response => {
        setPersonnel(response.data);
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
    setPersonnel({ ...personnel, [name]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {

      PersonnelService.update(personnel.id_personnel, personnel)
        .then(response => {
            Toast('success', "Profile s'est mis à jour")
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
      <CCol md="8" >
        <CCard>
        <CCardHeader className="text-center"><CCardTitle>MON PROFILE</CCardTitle></CCardHeader>
          <CCardBody className="p-4">
            <CForm
              className="row g-3 needs-validation"
              onSubmit={handleSubmit}
            >
                <CRow className="pt-3">
                    <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                        NUMERO :
                    </CFormLabel>
                    <CCol>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl 
                        type="number"
                        id="id_personnel"
                        name="id_personnel"
                        placeholder="Entrer le numéro de personnel"
                        value={personnel.id_personnel}
                        onChange={handleInputChange}
                        invalid={validated}
                        min="1"
                        required
                        readOnly
                        />
                        <CFormFeedback invalid>{message}</CFormFeedback>
                    </CInputGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                        ID ADMIN :
                    </CFormLabel>
                    <CCol>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl 
                        type="text"
                        id="idAdmin"
                        name="idAdmin"
                        placeholder="Entrer idAdmin"
                        value={personnel.idAdmin}
                        onChange={handleInputChange}
                        required
                        readOnly
                        />
                    </CInputGroup>
                </CCol>
                </CRow>
                <CRow>
                    <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                        NOM :
                    </CFormLabel>
                    <CCol>
                    <CInputGroup className="mb-3 has-validation">
                        <CInputGroupText>
                        <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl 
                        type="text"
                        id="nom_personnel"
                        name="nom_personnel"
                        placeholder="Entrer le nom du personnel"
                        value={personnel.nom_personnel}
                        onChange={handleInputChange}
                        required
                        />
                    </CInputGroup>
                </CCol>
                </CRow>
                <CRow>
                    <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                        EMAIL :
                    </CFormLabel>
                    <CCol>
                        <CInputGroup className="mb-3 has-validation">
                            <CInputGroupText>@</CInputGroupText>
                            <CFormControl 
                            type="email"
                            id="email_personnel"
                            name="email_personnel"
                            placeholder="Entrer l'email du personnel"
                            value={personnel.email_personnel}
                            onChange={handleInputChange}
                            required
                            />
                        </CInputGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                        DEPARTEMENT :
                    </CFormLabel>
                    <CCol>
                        <CInputGroup className="mb-3 has-validation">
                            <CInputGroupText>@</CInputGroupText>
                            <CFormControl 
                            type="text"
                            id="departement"
                            name="departement"
                            placeholder="Entrer departement"
                            value={personnel.departement}
                            onChange={handleInputChange}
                            required
                            />
                        </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                    <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                        LOGIN :
                    </CFormLabel>
                    <CCol>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl 
                        type="text"
                        id="login_personnel"
                        name="login_personnel"
                        placeholder="Login"
                        value={personnel.login_personnel}
                        onChange={handleInputChange}
                        invalid={validated}
                        required
                        />
                        <CFormFeedback invalid>{message}</CFormFeedback>
                    </CInputGroup>
                    </CCol>
                </CRow>
                <CRow  className="mb-3">
                    <CFormLabel className="col-sm-4 col-form-label col-form-label-sm text-end">
                        MOT DE PASSE :
                    </CFormLabel>
                    <CCol>
                        <CInputGroup className="mb-3">
                            <CInputGroupText>
                            <CIcon name="cil-user" />
                            </CInputGroupText>
                            <CFormControl 
                            type="password"
                            id="mot_de_passe_personnel"
                            name="mot_de_passe_personnel"
                            placeholder="Mot de passe"
                            value={personnel.mot_de_passe_personnel}
                            onChange={handleInputChange}
                            invalid={validated}
                            required
                            />
                            <CFormFeedback invalid>{message}</CFormFeedback>
                        </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="text-center">
                    <CButton className="float-end" color="success" type="submit">
                        Enregistrer
                    </CButton>
                    </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CToaster ref={toaster} push={toast} placement="top-center" />
    </CRow>

    
  )
}

export default Profile_Personnel
