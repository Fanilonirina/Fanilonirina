import React , { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import EtudiantService from "../../../services/EtudiantService";
import jwt from 'jsonwebtoken'
import { useHistory } from "react-router-dom"

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
  CAlert,
  CAlertHeading,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Register = () => {
  
  const history = useHistory()
  const {email,token} = useParams()

  const initialRegisterState = {
    num_inscription_etudiant:0,
    email: "",
    login: "",
    password: "",
    re_password: ""
  };

  const [register, setRegister] = useState(initialRegisterState)
  const [invalid, setInvalid] = useState(0)
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);


  useEffect(() => {

    
    jwt.verify(token,"20fsd5425dfq", (err, decoded) => {
      if (err) {
          history.push({pathname:'/404'})
      } else {
        console.log(decoded.id)
          setRegister({
            num_inscription_etudiant:decoded.id,
            email: email,
            login: "",
            password: "",
            re_password: "" })
      }
    })
  }, [])
 
  // const invalidUrl = () =>{
    
  // }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if(register.password !== register.re_password){
      setMessage('Veuillez saisir le même mot de passe')
      setInvalid(2)
    } else {
      setInvalid(0)

      EtudiantService.create(register)
      .then(response => {
        if(response.status===200)
          setSuccess(true)
      })
      .catch(error => {
        if (error.response) {
          setInvalid(1)
          setMessage('Login est déjà utilisé, veuillez essayez une autre!')
        } else {
          setInvalid(0)
          alert('Erreur liée au serveur')
        }
      });
      
    }
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRegister({ ...register, [name]: value });
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          {!success ?
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4 p-4">
              <CCardHeader className="text-center">
                <h1>Inscription</h1>
                <p className="text-medium-emphasis">Créer votre propre compte</p>
              </CCardHeader>
              <CCardBody className="p-4">
                <CForm
                  className="needs-validation"
                  onSubmit={handleSubmit}
                >
                  <CInputGroup className="mb-4">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormControl name="email" placeholder="Email" autoComplete="email" value={email} readOnly/>
                    <CFormControl name="num_inscription_etudiant" type="hidden" readOnly/>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>
                    <CFormControl 
                      name="login" 
                      placeholder="Login" 
                      minLength="4" 
                      autoComplete="Login"
                      onChange={handleInputChange} 
                      invalid={invalid===1}
                      required/>
                      <CFormFeedback invalid>{message}</CFormFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
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
                      invalid={invalid===2}
                      required
                    />
                    <CFormFeedback invalid>{message}</CFormFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-5 has-validation">
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormControl
                      type="password"
                      name="re_password"
                      minLength="4"
                      placeholder="Rétaper mot de passe"
                      autoComplete="password"
                      onChange={handleInputChange}
                      required
                      invalid={invalid===2}
                    />
                    <CFormFeedback invalid>{message}</CFormFeedback>
                  </CInputGroup>
                  <CButton type="submit" color="success" block>
                    Créer mon compte
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol> :
          <CCol md="9" lg="7" xl="6">
            <CAlert color="secondary">
                <CAlertHeading className="text-center text-success" tag="h4">Votre compte a été créé avec succès</CAlertHeading>
                <p> Veuillez connecter à votre compte et remplir tous les formulaires pour valider votre inscription </p>
                <hr />
                <p className="m-4 text-end">
                  <CButton component={Link} to="/login" color="dark"> Se connecter à mon compte </CButton>
                </p>
            </CAlert>
          </CCol>
          }
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
