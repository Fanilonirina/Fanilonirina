import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CCreateNavItem,
} from '@coreui/react'
import { NavLink } from 'react-router-dom'
import CIcon from '@coreui/icons-react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
//import navigation from '../_nav'
import { freeSet } from '@coreui/icons'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  

  React.useEffect(()=>{
    var navigation=[]
    const identifier = parseInt(localStorage.getItem("identifier"))
    switch (identifier) {
      case 0:
        navigation = [
          {
            _component: 'CNavItem',
            as: NavLink,
            anchor: 'Mon profile',
            to: '/etudiants/profile',
            icon: <CIcon name="cil-user" customClassName="nav-icon" />,
          },
          {
            _component: 'CNavItem',
            as: NavLink,
            anchor: 'Inscription',
            to: '/etudiants/inscription',
            icon: <CIcon name="cil-puzzle" customClassName="nav-icon" />,
          },
          {
            _component: 'CNavItem',
            as: NavLink,
            anchor: 'Réinscription',
            to: '/etudiants/reinscription',
            icon: <CIcon name="cil-notes" customClassName="nav-icon" />,
          }

        ]
        break;
      
      case 1:
        navigation = [
        {
          _component: 'CNavItem',
          as: NavLink,
          anchor: 'Mon profile',
          to: '/personnels/profile',
          icon: <CIcon name="cil-user" customClassName="nav-icon" />,
        },
        {
          _component: 'CNavItem',
          as: NavLink,
          anchor: 'Candidats',
          to: '/personnels/candidats',
          icon: <CIcon name="cil-people" customClassName="nav-icon" />,
        },
        {
          _component: 'CNavGroup',
          as: NavLink,
          anchor: 'Etudiants',
          to: '/to',
          icon: <CIcon content={freeSet.cilSchool} customClassName="nav-icon" />,
          items: [
            {
              _component: 'CNavItem',
              as: NavLink,
              anchor: 'Inscription',
              to: '/personnels/inscription',
            },
            {
              _component: 'CNavItem',
              as: NavLink,
              anchor: 'Réinscription',
              to: '/personnels/reinscription',
            }
          ]
        }
       ]
        break;
      
      case 2:
        navigation = [
        {
          _component: 'CNavItem',
          as: NavLink,
          anchor: 'Administrateurs',
          to: '/admin/dashboard',
          icon: <CIcon name="cil-lock-locked" customClassName="nav-icon" />,
        },
        {
          _component: 'CNavItem',
          as: NavLink,
          anchor: 'Personnels',
          to: '/admin/personnels',
          icon: <CIcon name="cil-people" customClassName="nav-icon" />,
        }
       ]
        break;
    
      default:
        
        break;
    }
    setNav(navigation)
  },[])

  const [nav, setNav] = React.useState([])

  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      show={sidebarShow}
      onShow={() => console.log('show')}
      onHide={() => {
        dispatch({ type: 'set', sidebarShow: false })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex pt-3" to="/">
        <h6> <img src="/eni-logo.png" alt="" width="50" height="50" /> ENI APPLICATION </h6>
      </CSidebarBrand>
      <CSidebarNav className="pt-2">
        <SimpleBar>
          <CCreateNavItem items={nav} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
