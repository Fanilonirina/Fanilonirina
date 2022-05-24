import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from "react-router-dom";
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Edit_Personnel = () => {
  const initialPersonnelState = {
    id_personnel: 0,
    idAdmin: "",
    nom_personnel: "",
    email_personnel : "",
    departement: ""
  };

const history = useHistory()
const location = useLocation()

  const [personnel, setPersonnel] = useState(initialPersonnelState);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    getPersonnel();
  }, []);

  const getPersonnel = () => {
    const id = location.state ? location.state.selectedItemId : '0'
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
          history.push({
            pathname: '/admin/personnels',
            state: { 
                action : 'update',
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
      <CCol md="9" lg="7" xl="6">
        <CCard className="mx-4">
          <CCardHeader color="dark">
            <strong>Nouveau personnel</strong> <small></small>
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
                />
              </CInputGroup>
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

export default Edit_Personnel
