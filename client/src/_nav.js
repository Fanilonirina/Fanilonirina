import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

/*const identifier = parseInt(localStorage.getItem("identifier"))
var _nav = []

switch (identifier) {
  case 0:
    _nav = [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Tableau de bord',
        to: '/etudiants/dashboard',
        icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Mon profile',
        to: '/etudiants/profile',
        icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Inscription',
        to: '/etudiants/inscription',
        icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
      }
    ]
    break;
  
  case 1:
   _nav = [
    {
      _component: 'CNavItem',
      as: NavLink,
      anchor: 'Tableau de bord',
      to: '/personnels/dashboard',
      icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
    },
    {
      _component: 'CNavItem',
      as: NavLink,
      anchor: 'Mon profile',
      to: '/personnels/profile',
      icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
    },
    {
      _component: 'CNavItem',
      as: NavLink,
      anchor: 'Candidats',
      to: '/personnels/candidats',
      icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
    },
    {
      _component: 'CNavItem',
      as: NavLink,
      anchor: 'Etudiants',
      to: '/personnels/etudiants',
      icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
    }
   ]
    break;
  
  case 2:
   _nav = [
    {
      _component: 'CNavItem',
      as: NavLink,
      anchor: 'Tableau de bord',
      to: '/admin/dashboard',
      icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
    },
    {
      _component: 'CNavItem',
      as: NavLink,
      anchor: 'Personnels',
      to: '/admin/personnels',
      icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
    },
    {
      _component: 'CNavItem',
      as: NavLink,
      anchor: 'Quitus',
      to: '/admin/quitus',
      icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
    }
   ]
    break;

  default:
    break;
}*/

const _nav = [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Tableau de bord',
    to: '/etudiants/dashboard',
    icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Mon profile',
    to: '/etudiants/profile',
    icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Inscription',
    to: '/etudiants/inscription',
    icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Tableau de bord',
    to: '/personnels/dashboard',
    icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Mon profile',
    to: '/personnels/profile',
    icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Candidats',
    to: '/personnels/candidats',
    icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Etudiants',
    to: '/personnels/etudiants',
    icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Tableau de bord',
    to: '/admin/dashboard',
    icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Personnels',
    to: '/admin/personnels',
    icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Quitus',
    to: '/admin/quitus',
    icon: <CIcon name="cil-drop" customClassName="nav-icon" />,
  }

]

export default _nav
