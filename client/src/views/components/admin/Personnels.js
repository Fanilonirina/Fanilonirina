import React, { useState , useRef, useEffect } from 'react'
import PersonnelService from "../../../services/PersonnelService";
import { useLocation, useHistory } from "react-router-dom";

import {
  
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
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
  CTooltip
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { Link } from 'react-router-dom'

const Personnels  = () => {

  const toaster = useRef()
  const location = useLocation()
  const history = useHistory()

  const [personnels, setPersonnels] = useState([])
  const [selectedId, setSelectedId] = useState(0)
  const [toast, addToast] = useState(0)
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
    getPersonnels()

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

  const getPersonnels = () => {
    PersonnelService.getAll()
      .then(response => {
        setPersonnels(response.data);
      })
      .catch(e => {
        Toast('danger','ERR: Veuillez allumez votre serveur!');
      });
  };

   const onSearchPersonnel = e => {
    if (e.key === 'Enter') {
      const search = e.target.value;
      findPersonnels(search);
    }
  };

  const onCheckEmptySearch = e => {
    if(e.target.value === '') {
      refreshList()
    }
  }

  const onChangeColorInsertedRow = id => {
    const insertedRow = location.state ? location.state.new_personnel_id : ''
    // eslint-disable-next-line
    if(insertedRow == id) {
      // eslint-disable-next-line
      return (location.state.action=="add" ? "success" : "warning");
    }
  }

  const confirmModal = id => {
    setSelectedId(id)
    setVisible(!visible)
  }

  const removePersonnel = () => {
    setVisible(false)
    
    PersonnelService.remove(selectedId)
      .then((response) => {
        Toast('danger', response.data.result)
        setRowInserted(true)
        refreshList()

        setTimeout(() => {
            setRowInserted(false)
        }, 3000);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findPersonnels = (searchPersonnel) => {
    PersonnelService.find(searchPersonnel)
      .then(response => {
        setPersonnels(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="pt-4 pb-4">
              <CRow>
                <CCol className="col-auto">
                  <CFormControl type="text" id="search" placeholder="Rechercher" onChange={onCheckEmptySearch} onKeyDown={onSearchPersonnel} />
                </CCol>
                <CCol xs="2">
                  <CButton color="dark" variant="outline" onClick={() => window.location.reload() }>
                    <CIcon content={freeSet.cilRecycle} size="sm"/> Actualiser
                  </CButton>
                  
                </CCol>
                <CCol>
                  <CButton
                    component={Link} to="/admin/personnels/new"
                    shape="rounded-pill"
                    variant="outline"
                    className="float-end"
                  >
                    <CIcon content={freeSet.cilUserPlus} />
                    Nouveau Personnel
                  </CButton>
                </CCol>

              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive align="middle" className="mb-0">
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center"> idAdmin </CTableHeaderCell>
                    <CTableHeaderCell className="text-center"> Login </CTableHeaderCell>
                    <CTableHeaderCell className="text-center"> Mot de passe </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">nom personnel</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">email personnel</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">departement</CTableHeaderCell>
                    <CTableHeaderCell colSpan="2" className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {personnels.length>0 ? personnels.map((personnel,index) => (
                    <CTableRow 
                      key={index} 
                      color={rowInserted? onChangeColorInsertedRow(personnel.id_personnel) : ""}
                    >
                      <CTableDataCell className="text-center">
                        <strong>{ personnel.id_personnel }</strong>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
    					<div>{ personnel.idAdmin }</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{ personnel.login_personnel }</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{ personnel.mot_de_passe_personnel }</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{ personnel.nom_personnel }</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{ personnel.email_personnel }</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{ personnel.departement }</div>
                      </CTableDataCell>
                      
                      <CTableDataCell className="text-center">
                        <CTooltip 
                          content="Supprimer"
                          placement="end"
                        >
                          <CButton
                            item={personnel.id_personnel}
                            onClick={() => confirmModal(personnel.id_personnel)}
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
                      <CTableDataCell colSpan="7" className="text-center"> Liste vide! </CTableDataCell>
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
            Vous voulez vraiment supprimer le personnel N°{selectedId}?
          </CModalBody>
          <CModalFooter>
            <CButton color="default" onClick={() => {setVisible(false); setSelectedId(0);}}>
              Annuler
            </CButton>
            <CButton color="dark" onClick={removePersonnel} >Confimer</CButton>
          </CModalFooter>
        </CModal>
    </>
  )
}

export default Personnels
