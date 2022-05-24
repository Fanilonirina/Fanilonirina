import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import QuitusService from "../../../services/QuitusService"

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
  CFormLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const New_Quitus = () => {

  const history = useHistory()
  
  const initialQuitusState = {
    id_quitus: 0,
    info_quitus: "",
    upload_quitus : ""
  };

  const [quitus, setQuitus] = useState(initialQuitusState);
  const [invalid, setInvalid] = useState(0);
  const [uploadMessage, setUploadMessage] = useState({ color : "medium-emphasis", message : "Aucune image" });
  const [message, setMessage] = useState('');


  useEffect(() => {
    getLastId()
  }, []);

  const getLastId = () => {
    QuitusService.last()
      .then(response => {
        if(response.data !== null)
          setQuitus({ ...quitus, id_quitus: response.data.id_quitus + 1});
        else
          setQuitus({ ...quitus, id_quitus: 1 });
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
    setQuitus({ ...quitus, [name]: value });
  };

  const handleInputFileChange = event => {
    const image = event.target.files[0]
    var ext = ["jpg","jpeg","png","gif"]
    if(image){
      var fileExtension = image.name.split('.').pop().toLowerCase()
      if(ext.indexOf(fileExtension)>-1){
        setQuitus({ ...quitus, upload_quitus: image })
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
      formData.append('id_quitus',quitus.id_quitus)
      formData.append('info_quitus',quitus.info_quitus)
      formData.append('upload_quitus',quitus.upload_quitus)

      QuitusService.create(formData)
        .then(response => {
          setInvalid(0)
          history.push({
            pathname: '/admin/quitus',
            state: { 
              action : 'add',
              message : response.data.result,
              new_quitus_id: quitus.id_quitus
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
            <strong>Nouveau Quitus</strong> <small></small>
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
                  id="id_quitus"
                  name="id_quitus"
                  placeholder="Entrer id de quitus"
                  value={quitus.id_quitus}
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
                  id="info_quitus"
                  name="info_quitus"
                  placeholder="Entrer la nature de quitus"
                  value={quitus.info_quitus}
                  onChange={handleInputChange}
                  required
                />
              </CInputGroup>
                <CRow className="mt-2 mb-2">
                  <CCol md="9">
                    <CFormLabel
                      className="btn btn-dark float-end"
                    >
                      <CFormControl
                        type="file"
                        id="upload_quitus"
                        name="upload_quitus"
                        accept="image/*"
                        multiple={false}
                        onChange={handleInputFileChange}
                        hidden
                      />
                      Importer un scan image
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

export default New_Quitus
