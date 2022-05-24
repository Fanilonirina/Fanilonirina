import React , { useState } from 'react'
import { useParams } from "react-router-dom"

import {
    CAlert,
    CAlertHeading,
    CCol,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Success = () => {

    return(
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
                <CCol md="9" lg="7" xl="6">
                    <CAlert color="success">
                        <CAlertHeading tag="h4">Well done!</CAlertHeading>
                        <p>
                        Aww yeah, you successfully read this important alert message. This example text is
                        going to run a bit longer so that you can see how spacing within an alert works
                        with this kind of content.
                        </p>
                        <hr />
                        <p className="mb-0">
                        Whenever you need to, be sure to use margin utilities to keep things nice and
                        tidy.
                        </p>
                    </CAlert>
                </CCol>
            </CRow>
          </CContainer>
        </div>
    )

}

export default Success
