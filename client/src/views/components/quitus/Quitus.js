import React, { useState , useRef, useEffect } from 'react'
import QuitusService from "../../../services/QuitusService"
import { useLocation, useHistory } from "react-router-dom";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
  CLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { Link } from 'react-router-dom'

// import AppTableHeader from '../../../components/AppTableHeader'

const Quitus = () => {

  const toaster = useRef()
  const location = useLocation()
  const history = useHistory()

  const [quituss, setQuituss] = useState([])
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
    getQuituss()

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

  const getQuituss = () => {
    QuitusService.getAll()
      .then(response => {
        setQuituss(response.data);
      })
  };

  const onChangeColorInsertedRow = id => {
    const insertedRow = location.state ? location.state.new_quitus_id : ''
    // eslint-disable-next-line
    if(insertedRow == id) {
      // eslint-disable-next-line
      return (location.state.action=="add" ? "success" : "warning");
    }
  }

  const onEditQuitus = id => {
    history.push({
      pathname: '/admin/quitus/edit',
      state: { selectedItemId: id }
    });
  }

  const confirmModal = id => {
    setSelectedId(id)
    setVisible(!visible)
  }

  const removeQuitus = () => {
    setVisible(false)
    console.log(selectedId)
    QuitusService.remove(selectedId)
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
  const onSearchQuitus = e => {
      if (e.key === 'Enter') {
          const search = e.target.value;
          findQuituss(search);
      }
  };

  const findQuituss = (searchQuitus) => {
    QuitusService.find(searchQuitus)
      .then(response => {
        setQuituss(response.data);
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
                <CFormControl type="text" id="search" placeholder="Rechercher" onChange={onCheckEmptySearch} onKeyDown={onSearchQuitus} />
              </CCol>
              <CCol>
                <CButton color="dark" variant="outline" onClick={() => window.location.reload() }>
                  <CIcon content={freeSet.cilRecycle} size="sm"/> Actualiser
                </CButton>
              </CCol>
              <CCol>
                <CButton
                  component={Link} to="/admin/quitus/new"
                  shape="rounded-pill"
                  variant="outline"
                  className="float-end"
                >
                  <CIcon content={freeSet.cilUserPlus} />
                  Nouveau Quitus
                </CButton>
              </CCol>
            </CForm>
            </CCardHeader>
            <CCardBody className="c-table-wrap">
              <CTable hover responsive align="middle" className="mb-0">
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">ID QUITUS</CTableHeaderCell>
                    <CTableHeaderCell>  INFO </CTableHeaderCell>
                    {/* <CTableHeaderCell className="text-center">Nationalité</CTableHeaderCell> */}
                    <CTableHeaderCell className="text-center"> FICHIER </CTableHeaderCell>
                    <CTableHeaderCell className="col col-3 text-center">ACTION</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className="">
                  {quituss.length>0 ? quituss.map((quitus,index) => (
                    <CTableRow 
                      key={index} 
                      color={rowInserted? onChangeColorInsertedRow(quitus.id_quitus) : ""}
                    >
                      <CTableDataCell className="text-center">
                        <strong>{ quitus.id_quitus }</strong>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <span>{ quitus.info_quitus }</span>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <CLink href={'http://localhost:8000/quitus/' + quitus.upload_quitus}>
                        Fichier
                      </CLink>
                      </CTableDataCell>
                      <CTableDataCell className="col col-3 text-center">
                        <CTooltip 
                          content="Modifier"
                          placement="end"
                        >
                          <CButton
                            onClick={() => onEditQuitus(quitus.id_quitus)}
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
                            item={quitus.id_quitus}
                            onClick={() => confirmModal(quitus.id_quitus)}
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
                      <CTableDataCell colSpan="4" className="text-center"> Liste vide! </CTableDataCell>
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
            Vous voulez vraiment supprimer le quitus N°{selectedId}?
          </CModalBody>
          <CModalFooter>
            <CButton color="default" onClick={() => {setVisible(false); setSelectedId(0);}}>
              Annuler
            </CButton>
            <CButton color="dark" onClick={removeQuitus} >Confimer</CButton>
          </CModalFooter>
        </CModal>
    </>
  )
}

export default Quitus
