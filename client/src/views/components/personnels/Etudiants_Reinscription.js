import React, { useState , useRef, useEffect } from 'react'
import EtudiantService from "../../../services/EtudiantService"
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
  CSpinner,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { Link } from 'react-router-dom'

// import AppTableHeader from '../../../components/AppTableHeader'
const Etudiants_Reinscription = () => {

    const toaster = useRef()
    const location = useLocation()
    const history = useHistory()
  
    const [etudiants, setEtudiants] = useState([])
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
        refreshList()
    },[]);
  
    const refreshList = () => {
      getEtudiants()
  
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
  
    const getEtudiants = () => {
      EtudiantService.getAllReInsc()
        .then(response => {
          setEtudiants(response.data);
          console.log(response.data)
        })
    };

    const onSendShow = id => {
      setLoading(id)
      history.push({
        pathname: '/personnels/reinscription/profile',
        state: { 
          num_inscription_etudiant : id
        }})
        setLoading(-1)
    }
  
    // const onSendValid = id => {
    //   setLoading(id)
    //   EtudiantService.send_mail(id)
    //     .then((response) => {
    //       Toast('info', response.data.result)
    //       setLoading(-1)
    //       refreshList()
          
    //     })
    //     .catch(error => {
    //       if(error.response){
    //         const data = error.response.data
    //         Toast('danger', data.result)
    //         setLoading(-1)
    //         console.log(data)
    //       } else {
    //         alert('Erreur survenue dans le serveur!')
    //       }
    //     });
    // }
  
    const onChangeColorInsertedRow = id => {
      const insertedRow = location.state ? location.state.new_etudiant_id : ''
      // eslint-disable-next-line
      if(insertedRow == id) {
        // eslint-disable-next-line
        return (location.state.action=="add" ? "success" : "warning");
      }
    }
  
    const removeEtudiant = () => {
      setVisible(false)
      EtudiantService.remove(selectedId)
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
    const onSearchEtudiant = e => {
        if (e.key === 'Enter') {
            const search = e.target.value;
            findEtudiants(search);
        }
    };
  
    const findEtudiants = (searchEtudiant) => {
      EtudiantService.find(searchEtudiant)
        .then(response => {
          setEtudiants(response.data);
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
  
    return(
    <>
        <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="pt-4 pb-4">
            <CForm className="row g-3">
              <CCol md="3">
                <CFormControl type="text" id="search" placeholder="Rechercher" onChange={onCheckEmptySearch} onKeyDown={onSearchEtudiant} />
              </CCol>
              <CCol>
                <CButton color="dark" variant="outline" onClick={() => window.location.reload() }>
                  <CIcon content={freeSet.cilRecycle} size="sm"/> Actualiser
                </CButton>
              </CCol>
              <CCol>
                <CButton
                  component={Link} to="/personnels/etudiants/new"
                  shape="rounded-pill"
                  variant="outline"
                  className="float-end"
                >
                  <CIcon content={freeSet.cilUserPlus} />
                  Nouveau etudiant
                </CButton>
              </CCol>
            </CForm>
            </CCardHeader>
            <CCardBody className="c-table-wrap">
              <CTable hover responsive align="middle" className="mb-0">
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">N° d&apos;inscription</CTableHeaderCell>
                    <CTableHeaderCell> Etudiants </CTableHeaderCell>
                    {/* <CTableHeaderCell className="text-center">Nationalité</CTableHeaderCell> */}
                    <CTableHeaderCell className="text-center">Téléphone</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell className="col col-3 text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className="">
                  {etudiants.length>0 ? etudiants.map((etudiant,index) => (
                    
                    <CTableRow 
                      key={index} 
                      color={rowInserted? onChangeColorInsertedRow(etudiant.etudiant.num_inscription_etudiant) : ""}
                    >
                      <CTableDataCell className="text-center">
                        <strong>{ etudiant.etudiant.num_inscription_etudiant }</strong>
                      </CTableDataCell>
                      {/* <CLink href={'http://localhost:8000/' + etudiant.etudiant.upload_profile_etudiant}>
                        <CAvatar size="md" src={'http://localhost:8000/' + etudiant.etudiant.upload_profile_etudiant} status="success" />
                      </CLink> */}
                      <CTableDataCell>
                        <div>{ etudiant.etudiant.nom_etudiant } { etudiant.etudiant.prenom_etudiant } </div>
                        <div className="small text-medium-emphasis">
                          <span>{ etudiant.etudiant.email_etudiant }</span>
                        </div>
                      </CTableDataCell>
                      {/* <CTableDataCell className="text-center">
                        <CIcon content={flagSet.cifMg} size="xl" />
                      </CTableDataCell> */}
                      <CTableDataCell className="text-center">
                        { etudiant.etudiant.telephone_etudiant }
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CBadge color={etudiant.etudiant.statut_etudiant_re ? "success" : "danger"}>{etudiant.etudiant.statut_etudiant_re ? 'Validé' : 'Non validée'}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell className="col col-3 text-center">
                        <CButton
                          onClick={() => onSendShow(etudiant.etudiant.num_inscription_etudiant)}
                          color="primary" 
                          variant="outline" 
                          shape="rounded-pill" 
                          size="sm"
                          className="mr-2"
                          disabled={loading===etudiant.etudiant.num_inscription_etudiant}
                        >
                          {loading!==etudiant.etudiant.num_inscription_etudiant ? <CIcon content={freeSet.cilZoom} /> : <CSpinner component="span" size="sm" aria-hidden="true" />}
                          &nbsp; Voir etudiant
                        </CButton> &nbsp; &nbsp;
                        
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
            Vous voulez vraiment supprimer le etudiant N°{selectedId}?
          </CModalBody>
          <CModalFooter>
            <CButton color="default" onClick={() => {setVisible(false); setSelectedId(0);}}>
              Annuler
            </CButton>
            <CButton color="dark" onClick={removeEtudiant} >Confimer</CButton>
          </CModalFooter>
        </CModal>
    
    </>
    )
}

export default Etudiants_Reinscription