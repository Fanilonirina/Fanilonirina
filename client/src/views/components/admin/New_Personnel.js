import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
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
  CFormLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const New_Personnel = () => {
  const initialPersonnelState = {
    id_personnel: 0,
    idAdmin: "",
    nom_personnel: "",
    login_personnel: "",
    mot_de_passe_personnel: "",
    email_personnel: "",
    departement : ""
  };

  const [personnel, setPersonnel] = useState(initialPersonnelState);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');
  let history = useHistory();

  useEffect(() => {
    getLastId();
  }, []);

  const getLastId = () => {
    PersonnelService.last()
      .then(response => {
        if(response.data !== null)
          setPersonnel({ ...personnel, id_personnel: response.data.id_personnel + 1});
        else
          setPersonnel({ ...personnel, id_personnel: 1 });
        
        setPersonnel({ ...personnel, idAdmin: JSON.parse(localStorage.getItem("user")).id_admin })
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
     
      PersonnelService.create(personnel)
        .then(response => {
          history.push({
            pathname: '/admin/personnels',
            state: { 
              action : 'add',
              message : response.data.result,
              new_personnel_id: personnel.id_personnel
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
      <CCol md="8">
        <CCard className="mx-4">
          <CCardHeader color="dark">
            <strong>Nouveau personnel</strong> <small></small>
          </CCardHeader>
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
    </CRow>
  )
}

export default New_Personnel
