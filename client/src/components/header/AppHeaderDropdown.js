import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import { Link } from 'react-router-dom'

const AppHeaderDropdown = () => {

  const [login,setLogin] =  React.useState('')
  const [avatar,setAvatar] =  React.useState('http://localhost:8000/user-icon-default.png')

  React.useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    const identifier = parseInt(localStorage.getItem("identifier"))
      switch (identifier) {
        case 0:
          setLogin(user.login_etudiant)
          if(user.photo_etudiant){
            setAvatar('http://localhost:8000/users/'+user.photo_etudiant)
          }
          
          break;
        case 1:
          setLogin(user.login_personnel)
          break;
        case 2:
          setLogin(user.login)
          break;
        default:
          break;
    }
  })

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <b>{login} </b> &nbsp; <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Mon compte</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon name="cil-user" className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon name="cil-settings" className="me-2" />
          Paramètre
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={()=> localStorage.clear() } component={Link} to="/">
          <CIcon content={freeSet.cilPowerStandby} size="sm"/> Deconnexion
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
