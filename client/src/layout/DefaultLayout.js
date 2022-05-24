import React  from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Redirect } from 'react-router-dom'

const DefaultLayout = () => {

  return (
    localStorage.getItem("user") ? (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>) : (<Redirect to="/login" />)
  )
}

export default DefaultLayout
