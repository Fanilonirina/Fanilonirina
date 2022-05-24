import React, { useState , useRef, useEffect } from 'react'
import CandidatService from "../../../services/CandidatService"
import UserService from "../../../services/UserService"
import { useLocation, useHistory } from "react-router-dom";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CBadge,
  CButton,
  CForm,
  CRow,
  CFormControl,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTooltip,
  CSpinner,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { Link } from 'react-router-dom'

// import AppTableHeader from '../../../components/AppTableHeader'

const Candidats = () => {

  const toaster = useRef()
  const location = useLocation()
  const history = useHistory()

  const [candidats, setCandidats] = useState([])
  const [selectedId, setSelectedId] = useState(0)
  const [toast, addToast] = useState(0)
  const [loading, setLoading] = useState(-1)
  const [visible, setVisible] = useState(false)
  const [rowInserted, setRowInserted] = useState(() => {
      return !(location.state == null)
  })

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
    checkAuthenticated()
  },[]);

  const checkAuthenticated = () => {
    UserService.isUserAuth().then(response=>{
      if(!response.data.auth){
        history.push({pathname: '/login'});
      } else {
        refreshList()
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

  const refreshList = () => {
    getCandidats()

    if(rowInserted){
        showNotificationRowInserted()
    }
  };

  const showNotificationRowInserted = () => {
    var result = location.state;
    switch (result.action) {
      case "add":
        Toast('success', result.message)
        break;
      case "update":
        Toast('warning', result.message)
        break;
      default:
        break;
    }

    setTimeout(() => {
        setRowInserted(false)
        history.replace()
    }, 3000);
    
  }

  const getCandidats = () => {
    CandidatService.getAll()
      .then(response => {
        setCandidats(response.data);
      })
  };

  const onSendEmailCandidat = id => {
    setLoading(id)
    CandidatService.send_mail(id)
      .then((response) => {
        Toast('info', response.data.result)
        setLoading(-1)
        refreshList()
        
      })
      .catch(error => {
        if(error.response){
          const data = error.response.data
          Toast('danger', data.result)
          setLoading(-1)
          console.log(data)
        } else {
          alert('Erreur survenue dans le serveur!')
        }
      });
  }

  const onChangeColorInsertedRow = id => {
    const insertedRow = location.state ? location.state.new_candidat_id : ''
    // eslint-disable-next-line
    if(insertedRow == id) {
      // eslint-disable-next-line
      return (location.state.action=="add" ? "success" : "warning");
    }
  }

  const onEditCandidat = id => {
    history.push({
      pathname: '/personnels/candidats/edit',
      state: { selectedItemId: id }
    });
  }

  const confirmModal = id => {
    setSelectedId(id)
    setVisible(!visible)
  }

  const removeCandidat = () => {
    setVisible(false)
    CandidatService.remove(selectedId)
      .then((response) => {
        Toast('danger', response.data.result)
        refreshList()
      })
      .catch(error => {
        if(error.response){
          const data = error.response.data
          Toast('danger', data.result)
          console.log(data)
        } else {
          alert('Erreur survenue dans le serveur!')
        }
      });
  };

  
  const onCheckEmptySearch = e => {
      if(e.target.value === '') {
          refreshList()
      }
  }
  const onSearchCandidat = e => {
      if (e.key === 'Enter') {
          const search = e.target.value;
          findCandidats(search);
      }
  };

  const findCandidats = (searchCandidat) => {
    CandidatService.find(searchCandidat)
      .then(response => {
        setCandidats(response.data);
      })
      .catch(error => {
        if(error.response){
          const data = error.response.data
          Toast('danger', data.result)
          console.log(data)
        } else {
          alert('Erreur survenue dans le serveur!')
        }
      });
  };

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="pt-4 pb-4">
            <CForm className="row g-3">
              <CCol md="3">
                <CFormControl type="text" id="search" placeholder="Rechercher" onChange={onCheckEmptySearch} onKeyDown={onSearchCandidat} />
              </CCol>
              <CCol>
                <CButton color="dark" variant="outline" onClick={() => window.location.reload() }>
                  <CIcon content={freeSet.cilRecycle} size="sm"/> Actualiser
                </CButton>
              </CCol>
              <CCol>
                <CButton
                  component={Link} to="/personnels/candidats/new"
                  shape="rounded-pill"
                  variant="outline"
                  className="float-end"
                >
                  <CIcon content={freeSet.cilUserPlus} />
                  Nouveau Candidat
                </CButton>
              </CCol>
            </CForm>
            </CCardHeader>
            <CCardBody className="c-table-wrap">
              <CTable hover responsive align="middle" className="mb-0">
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">N° d&apos;inscription</CTableHeaderCell>
                    <CTableHeaderCell> Candidats </CTableHeaderCell>
                    {/* <CTableHeaderCell className="text-center">Nationalité</CTableHeaderCell> */}
                    <CTableHeaderCell className="text-center">Téléphone</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell className="col col-3 text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className="">
                  {candidats.length>0 ? candidats.map((candidat,index) => (
                    <CTableRow 
                      key={index} 
                      color={rowInserted? onChangeColorInsertedRow(candidat.num_inscription_candidat) : ""}
                    >
                      <CTableDataCell className="text-center">
                        <strong>{ candidat.num_inscription_candidat }</strong>
                      </CTableDataCell>
                      {/* <CLink href={'http://localhost:8000/' + candidat.upload_profile_candidat}>
                        <CAvatar size="md" src={'http://localhost:8000/' + candidat.upload_profile_candidat} status="success" />
                      </CLink> */}
                      <CTableDataCell>
                        <div>{ candidat.nom_candidat } { candidat.prenom_candidat } </div>
                        <div className="small text-medium-emphasis">
                          <span>{ candidat.email_candidat }</span>
                        </div>
                      </CTableDataCell>
                      {/* <CTableDataCell className="text-center">
                        <CIcon content={flagSet.cifMg} size="xl" />
                      </CTableDataCell> */}
                      <CTableDataCell className="text-center">
                        { candidat.telephone_candidat }
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CBadge color={candidat.status_candidat ? "success" : "danger"}>{candidat.status_candidat ? 'e-mail envoyée' : 'Non traitée'}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell className="col col-3 text-end">
                        <CButton
                          onClick={() => onSendEmailCandidat(candidat.num_inscription_candidat)}
                          color="dark" 
                          variant="outline" 
                          shape="rounded-pill" 
                          size="sm"
                          className="mr-2"
                          disabled={loading===candidat.num_inscription_candidat}
                        >
                          {loading!==candidat.num_inscription_candidat ? <CIcon name="cil-bell" className="me-2" /> : <CSpinner component="span" size="sm" aria-hidden="true" />}
                          {!candidat.status_candidat ? 'Envoyer un mail' : 'Réenvoyer un mail' }
                        </CButton> &nbsp; &nbsp;
                        <CTooltip 
                          content="Modifier"
                          placement="end"
                        >
                          <CButton
                            onClick={() => onEditCandidat(candidat.num_inscription_candidat)}
                            color="primary"
                            variant="outline"
                            className="m-1"
                            shape="rounded-pill"
                            size="sm"
                            > <CIcon content={freeSet.cilPen} size="sm" />
                          </CButton>
                        </CTooltip>
                        <CTooltip 
                          content="Supprimer"
                          placement="end"
                        >
                          <CButton
                            item={candidat.num_inscription_candidat}
                            onClick={() => confirmModal(candidat.num_inscription_candidat)}
                            color="danger"
                            className="m-1"
                            variant="outline"
                            shape="rounded-pill"
                            size="sm"
                            > <CIcon content={freeSet.cilTrash} size="sm" />
                          </CButton>
                        </CTooltip>
                      </CTableDataCell>
                    </CTableRow>
                  )) : (
                    <CTableRow color="light">
                      <CTableDataCell colSpan="6" className="text-center"> Liste vide! </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Composant non visible */}
      <CToaster ref={toaster} push={toast} placement="top-center" />
      <CModal alignment="center" visible={visible}>
          <CModalHeader onDismiss={() => setVisible(false)}>
            <CModalTitle> Confirmation </CModalTitle>
          </CModalHeader>
          <CModalBody>
            Vous voulez vraiment supprimer le candidat N°{selectedId}?
          </CModalBody>
          <CModalFooter>
            <CButton color="default" onClick={() => {setVisible(false); setSelectedId(0);}}>
              Annuler
            </CButton>
            <CButton color="dark" onClick={removeCandidat} >Confimer</CButton>
          </CModalFooter>
        </CModal>
    </>
  )
}

export default Candidats
