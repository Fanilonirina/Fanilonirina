import React, { useState } from 'react'
import EtudiantService from "../../../services/EtudiantService";
import { useHistory } from "react-router-dom";
//import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {

  let history = useHistory()

  const initialUserState = {
    login: "",
    password: ""
  };

  const [user, setUser] = useState(initialUserState)
  const [invalid, setInvalid] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    EtudiantService.connect(user)
    .then(response => {
      setInvalid(false)
      if(response.data.auth){
        localStorage.setItem("user", JSON.stringify(response.data.user))
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("identifier", response.data.identifier)

        const identifier = response.data.identifier
        switch (identifier) {
          case 0:
            response.data.user.statut_etudiant ?
            history.push({pathname: '/etudiants/profile'}) : history.push({pathname: '/etudiants/inscription'})
            break;
          case 1:
            history.push({pathname: '/personnels/profile'})
            break;
          case 2:
            history.push({pathname: '/admin/dashboard'})
            break;
          default:
            break;
        }
        //window.location.reload()
      }
    })
    .catch(error => {
      if (error.response) {
        setInvalid(true)
        setMessage('Login ou mot de passe incorrect')
      } else {
        // Something happened in setting up the request that triggered an Error
        setInvalid(true)
        alert('Erreur liée au serveur')
      }
    });
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8" lg="6" xl="5">
            <CCardGroup>
              <CCard className="mx-4 p-4">
                <CCardHeader className="text-center">
                  <h1> Authentification</h1>
                  <p className="text-medium-emphasis">Veuillez connecter à votre compte</p>
                </CCardHeader>
                <CCardBody>
                  <CForm
                    className="needs-validation"
                    onSubmit={handleSubmit}
                  >
                    <CInputGroup className="mt-3 mb-4">
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                      <CFormControl 
                        name="login" 
                        placeholder="Login" 
                        minLength="4" 
                        autoComplete="Login" 
                        onChange={handleInputChange}
                        invalid={invalid} 
                        required/>
                    </CInputGroup>
                    <CInputGroup className="mb-5">
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        type="password"
                        name="password"
                        minLength="4"
                        placeholder="Mot de passe"
                        autoComplete="password"
                        onChange={handleInputChange}
                        invalid={invalid}
                        required
                      />
                      <CFormFeedback invalid>{message}</CFormFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Mot de passe oublié?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
