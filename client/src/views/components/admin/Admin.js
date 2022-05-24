import React, { useState , useRef, useEffect } from 'react'
import AdministrateurService from "../../../services/AdministrateurService";
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
const Admin = () => {
	
    const toaster = useRef()
  const location = useLocation()
  const history = useHistory()

  const [admins, setAdmins] = useState([])
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
    getAdmins()

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

  const getAdmins = () => {
    AdministrateurService.getAll()
      .then(response => {
        setAdmins(response.data);
      })
      .catch(e => {
        Toast('danger','ERR: Veuillez allumez votre serveur!');
      });
  };

   const onSearchAdmin = e => {
    if (e.key === 'Enter') {
      const search = e.target.value;
      findAdmins(search);
    }
  };

  const onCheckEmptySearch = e => {
    if(e.target.value === '') {
      refreshList()
    }
  }

  const onChangeColorInsertedRow = id => {
    const insertedRow = location.state ? location.state.new_admin_id : ''
    // eslint-disable-next-line
    if(insertedRow == id) {
      // eslint-disable-next-line
      return (location.state.action=="add" ? "success" : "warning");
    }
  }

  const onEditAdmin = id => {
    history.push({
      pathname: '/admin/edit',
      state: { selectedItemId: id }
    });
  }

  const confirmModal = id => {
    setSelectedId(id)
    setVisible(!visible)
  }

  const removeAdmin = () => {
    setVisible(false)
    
    AdministrateurService.remove(selectedId)
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

  const findAdmins = (searchAdmin) => {
    AdministrateurService.find(searchAdmin)
      .then(response => {
        setAdmins(response.data);
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
                  <CFormControl type="text" id="search" placeholder="Rechercher" onChange={onCheckEmptySearch} onKeyDown={onSearchAdmin} />
                </CCol>
                <CCol xs="2">
                  <CButton color="dark" variant="outline" onClick={() => window.location.reload() }>
                    <CIcon content={freeSet.cilRecycle} size="sm"/> Actualiser
                  </CButton>
                  
                </CCol>
                <CCol>
                  <CButton
                    component={Link} to="/admin/new"
                    shape="rounded-pill"
                    variant="outline"
                    className="float-end"
                  >
                    <CIcon content={freeSet.cilUserPlus} />
                    Nouveau Admin
                  </CButton>
                </CCol>

              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive align="middle" className="mb-0">
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">ID</CTableHeaderCell>
                    <CTableHeaderCell> login </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Mot de passe </CTableHeaderCell>
                    <CTableHeaderCell colSpan="1" className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {admins.length>0 ? admins.map((admin,index) => (
                    <CTableRow 
                      key={index} 
                      color={rowInserted? onChangeColorInsertedRow(admin.id_admin) : ""}
                    >
                      <CTableDataCell className="text-center">
                        <strong>{ admin.id_admin }</strong>
                      </CTableDataCell>
                      
                      <CTableDataCell>
                        <div>{ admin.login } </div>
                        
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{ admin.mot_de_passe } </div>
                      </CTableDataCell>
          
                      <CTableDataCell className="text-center">
                        <CTooltip 
                          content="Modifier"
                          placement="end"
                        >
                          <CButton
                            onClick={() => onEditAdmin(admin.id_admin)}
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
                            item={admin.id_admin}
                            onClick={() => confirmModal(admin.id_admin)}
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
            Vous voulez vraiment supprimer le admin N°{selectedId}?
          </CModalBody>
          <CModalFooter>
            <CButton color="default" onClick={() => {setVisible(false); setSelectedId(0);}}>
              Annuler
            </CButton>
            <CButton color="dark" onClick={removeAdmin} >Confimer</CButton>
          </CModalFooter>
        </CModal>
    </>
  )
}

export default Admin