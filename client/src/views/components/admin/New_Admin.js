import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import AdministrateurService from "../../../services/AdministrateurService";
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

const New_Admin = () => {
  const initialAdminState = {
    id_admin: 0,
    login: "",
    mot_de_passe: ""
  };

  const [admin, setAdmin] = useState(initialAdminState);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');
  let history = useHistory();

  useEffect(() => {
    getLastId();
  }, []);

  const getLastId = () => {
    AdministrateurService.last()
      .then(response => {
        if(response.data !== null)
          setAdmin({ ...admin, id_admin: response.data.id_admin + 1});
        else
          setAdmin({ ...admin, id_admin: 1 });
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
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {

      AdministrateurService.create(admin)
        .then(response => {
          history.push({
            pathname: '/admin',
            state: { 
              action : 'add',
              message : response.data.result,
              new_admin_id: admin.id_admin
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
            <strong>Nouveau admin</strong> <small></small>
          </CCardHeader>
          <CCardBody className="p-4">
            <CForm
              className="row g-3 needs-validation"
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon name="cil-user" />
                </CInputGroupText>
                <CFormControl 
                  type="number"
                  id="id_admin"
                  name="id_admin"
                  placeholder="Entrer le numéro admin"
                  value={admin.id_admin}
                  onChange={handleInputChange}
                  invalid={validated}
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
                  id="login"
                  name="login"
                  placeholder="Entrer login"
                  value={admin.login}
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
                  id="mot_de_passe"
                  name="mot_de_passe"
                  placeholder="Entrer mot de passe"
                  value={admin.mot_de_passe}
                  onChange={handleInputChange}
                />
              </CInputGroup>
             
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

export default New_Admin
