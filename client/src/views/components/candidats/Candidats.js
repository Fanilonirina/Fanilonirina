import React, { useState, useRef, useEffect } from 'react'
import CandidatService from "../../../services/CandidatService";
import { useLocation, useHistory } from "react-router-dom";

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CBadge,
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
  CFormSelect,
  CTooltip,
  CLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { flagSet, freeSet } from '@coreui/icons'
import { Link } from 'react-router-dom'

const Candidats = () => {

  const toaster = useRef()
  const location = useLocation()
  const history = useHistory()

  const [candidats, setCandidats] = useState([])
  const [selectedId, setSelectedId] = useState(0)
  const [toast, addToast] = useState(0)
  const [visible, setVisible] = useState(false)
  const [rowInserted, setRowInserted] = useState(() => {
    return !(location.state == null)
  })
  

  //Afficher un erreur si le serveur est éteint
  const Toast = (color, message) => {
    addToast(
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
  }, []);

  const refreshList = () => {
    getCandidats()

    if (rowInserted) {
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
      .catch(e => {
        Toast('danger', 'ERR: Veuillez allumez votre serveur!');
      });
  };

  const onSearchCandidat = e => {
    if (e.key === 'Enter') {
      const search = e.target.value;
      findCandidats(search);
    }
  };

  const onCheckEmptySearch = e => {
    if (e.target.value === '') {
      refreshList()
    }
  }

  const onChangeColorInsertedRow = id => {
    const insertedRow = location.state ? location.state.new_candidat_id : ''
    // eslint-disable-next-line
    if (insertedRow == id) {
      // eslint-disable-next-line
      return (location.state.action == "add" ? "success" : "warning");
    }
  }

  const onEditCandidat = id => {
    history.push({
      pathname: '/candidats/edit',
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

  const findCandidats = (searchCandidat) => {
    CandidatService.find(searchCandidat)
      .then(response => {
        setCandidats(response.data);
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
                  <CFormControl type="text" id="search" placeholder="Rechercher" onChange={onCheckEmptySearch} onKeyDown={onSearchCandidat} />
                </CCol>
                <CCol xs="3">
                  <CFormSelect>
                    <option>Tous</option>
                    <option value="1">Admis</option>
                    <option value="2">Réfusé</option>
                  </CFormSelect>
                </CCol>
                <CCol xs="2">
                  <CFormSelect>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                  </CFormSelect>
                </CCol>
                <CCol xs="2">
                  <CButton color="dark" variant="outline" onClick={() => window.location.reload()}>
                    <CIcon content={freeSet.cilRecycle} size="sm" /> Actualiser
                  </CButton>

                </CCol>
                <CCol>
                  <CButton
                    component={Link} to="/candidats/new"
                    shape="rounded-pill"
                    variant="outline"
                    className="float-end"
                  >
                    <CIcon content={freeSet.cilUserPlus} />
                    Nouveau Candidat
                  </CButton>
                </CCol>

              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive align="middle" className="mb-0">
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      <CIcon name="cil-people" />
                    </CTableHeaderCell>
                    <CTableHeaderCell> Candidats </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Nationalité</CTableHeaderCell>
                    <CTableHeaderCell>Téléphone</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell colSpan="2" className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {candidats.length > 0 ? candidats.map((candidat, index) => (
                    <CTableRow
                      key={index}
                      color={rowInserted ? onChangeColorInsertedRow(candidat.num_inscription_candidat) : ""}
                    >
                      <CTableDataCell className="text-center">
                        <strong>{candidat.num_inscription_candidat}</strong>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CLink href={'http://localhost:8000/' + candidat.upload_profile_candidat}>
                          <CAvatar size="md" src={'http://localhost:8000/' + candidat.upload_profile_candidat} status="success" />
                        </CLink>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{candidat.nom_candidat} {candidat.prenom_candidat} </div>
                        <div className="small text-medium-emphasis">
                          <span>{candidat.email_candidat}</span>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon content={flagSet.cifMg} size="xl" />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color="dark">{candidat.telephone_candidat}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={candidat.status_candidat ? "success" : "danger"}>{candidat.status_candidat ? 'Admis' : 'Réfusé'}</CBadge>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton color="dark" variant="outline" shape="rounded-pill" size="sm">
                          <CIcon name="cil-bell" className="me-2" />
                          Envoyer un mail
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
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
          Vous voulez vraiment supprimer le candidat N°{selectedId}?
        </CModalBody>
        <CModalFooter>
          <CButton color="default" onClick={() => { setVisible(false); setSelectedId(0); }}>
            Annuler
          </CButton>
          <CButton color="dark" onClick={removeCandidat} >Confimer</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Candidats
