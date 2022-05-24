import React from 'react'

import {
    CCard,
    CCardHeader,
    CCol,
    CButton,
    CRow,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormControl,
    CFormSelect,
    CHeaderDivider
  } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { Link } from 'react-router-dom'

const AppTableHeader = () => {

    const onCheckEmptySearch = e => {
        if(e.target.value === '') {
            // refreshList()
        }
    }
    const onSearchCandidat = e => {
        if (e.key === 'Enter') {
            // const search = e.target.value;
            // findCandidats(search);
        }
    };

    return (
        <>
          <CRow>
            <CCol>
              <CCard className="mt-2 mb-2">
                <CCardHeader className="pt-4 pb-4">
                  <CRow>
                    <CCol className="col-auto">
                      <CFormControl type="text" id="search" placeholder="Rechercher"  onChange={onCheckEmptySearch} onKeyDown={onSearchCandidat} />
                    </CCol>
                    <CCol xs="2">
                      <CFormSelect>
                        <option>2021</option>
                        <option>2020</option>
                        <option>2019</option>
                        <option>2018</option>
                      </CFormSelect>
                    </CCol>
                    <CCol>
                      <CButton color="dark" variant="outline" onClick={() => window.location.reload() }>
                        <CIcon content={freeSet.cilRecycle} size="sm"/> Actualiser
                      </CButton>
                    </CCol>
                    <CCol>
                      <CButton color="dark" variant="outline" onClick={() => window.location.reload() }>
                        <CIcon content={freeSet.cilNewspaper} size="sm"/> Traiter tous les e-mails
                      </CButton>
                    </CCol>
                    <CCol>
                      <CButton
                        component={Link} to="/candidats/new"
                        shape="rounded-pill"
                        variant="outline"
                        className="float-end"
                      >
                        <CIcon content={freeSet.cilUserPlus} /> Nouveau Candidat
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>
              </CCard>
            </CCol>
          </CRow>
          <CHeaderDivider />
          <CTable hover responsive align="middle" className="mb-0">
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell className="c-id text-center">N° d&apos;inscription</CTableHeaderCell>
                    <CTableHeaderCell className="c-icon text-center">
                      <CIcon name="cil-people" />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="c-candidat"> &nbsp; Candidats </CTableHeaderCell>
                    {/* <CTableHeaderCell className="text-center">Nationalité</CTableHeaderCell> */}
                    <CTableHeaderCell className="c-phone text-center">Téléphone</CTableHeaderCell>
                    <CTableHeaderCell className="c-stat text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell colSpan="3" className="c-action text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
            </CTable>
        </>
    )
}

export default React.memo(AppTableHeader)