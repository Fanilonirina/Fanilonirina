import React from 'react'

// examples
const Personnels = React.lazy(() => import('./views/components/personnels/Personnels'))
const Profile_Personnel = React.lazy(() => import('./views/components/personnels/Profile_Personnel'))
const Candidats = React.lazy(() => import('./views/components/personnels/Candidats'))
const New_Candidat = React.lazy(() => import('./views/components/personnels/New_Candidat'))
const Edit_Candidat = React.lazy(() => import('./views/components/personnels/Edit_Candidat'))
const Personnels_Etudiants = React.lazy(() => import('./views/components/personnels/Etudiants'))
const Personnels_Profile_Etudiant = React.lazy(() => import('./views/components/personnels/Profile_Etudiant'))
const Personnels_Etudiants_Reinscription = React.lazy(() => import('./views/components/personnels/Etudiants_Reinscription'))
const Personnels_Profile_Etudiant_Reinscription = React.lazy(() => import('./views/components/personnels/Profile_Etudiants_Reinscription'))


const Quitus = React.lazy(() => import('./views/components/quitus/Quitus'))
const New_Quitus= React.lazy(() => import('./views/components/quitus/New_Quitus'))
const Edit_Quitus = React.lazy(() => import('./views/components/quitus/Edit_Quitus'))

// const Form_Inscription = React.lazy(() => import('./views/components/Form_Inscription'))


const Etudiants = React.lazy(() => import('./views/components/etudiants/Etudiants'))
const Profile_Etudiant = React.lazy(() => import('./views/components/etudiants/Profile_Etudiant'))
const Inscription_Etudiant = React.lazy(() => import('./views/components/etudiants/Inscription'))
const Reinscription_Etudiant = React.lazy(() => import('./views/components/etudiants/Reinscription'))

const Admin = React.lazy(() => import('./views/components/admin/Admin'))
const New_Admin = React.lazy(() => import('./views/components/admin/New_Admin'))
const Edit_Admin = React.lazy(() => import('./views/components/admin/Edit_Admin'))
const Personnels_Admin = React.lazy(() => import('./views/components/admin/Personnels'))
const Personnels_New_Admin = React.lazy(() => import('./views/components/admin/New_Personnel'))
const Edit_Personnel = React.lazy(() => import('./views/components/admin/Edit_Personnel'))

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/examples/pages/page500/Page500'))

// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/etudiants', name: 'Etudiants',component: Etudiants , exact: true},
  { path: '/etudiants/dashboard', name: 'Etudiants',component: Etudiants },
  { path: '/etudiants/profile', name: 'Mon profile', component: Profile_Etudiant },
  { path: '/etudiants/inscription', name: 'Inscription', component: Inscription_Etudiant },
  { path: '/etudiants/reinscription', name: 'Réinscription', component: Reinscription_Etudiant },

  { path: '/personnels', name: 'Personnels', component: Personnels, exact: true},
  { path: '/personnels/dashboard', name: 'Personnels', component: Personnels},
  { path: '/personnels/profile', name: 'Mon profile', component: Profile_Personnel},
  { path: '/personnels/candidats', name: 'Candidats', component: Candidats, exact: true},
  { path: '/personnels/candidats/new', name: 'Nouveau', component: New_Candidat},
  { path: '/personnels/candidats/edit', name: 'Modifier', component: Edit_Candidat},

  { path: '/personnels/inscription', name: 'Inscription', component: Personnels_Etudiants, exact: true},
  { path: '/personnels/inscription/profile', name: 'Profile', component: Personnels_Profile_Etudiant},

  { path: '/personnels/reinscription', name: 'Réinscription', component: Personnels_Etudiants_Reinscription, exact: true},
  { path: '/personnels/reinscription/profile', name: 'Profile', component: Personnels_Profile_Etudiant_Reinscription},

  { path: '/admin', name: 'Administrateur', component: Admin, exact: true},
  { path: '/admin/dashboard', name: 'Administrateur', component: Admin},
  { path: '/admin/new', name: 'Nouveau', component: New_Admin},
  { path: '/admin/edit', name: 'Modifier', component: Edit_Admin},
  { path: '/admin/personnels', name: 'Personnels', component: Personnels_Admin, exact: true },
  { path: '/admin/personnels/new', name: 'Nouveau', component: Personnels_New_Admin},
  { path: '/admin/quitus', name: 'Quitus', component: Quitus, exact: true },
  { path: '/admin/quitus/new', name: 'Nouveau', component: New_Quitus},
  { path: '/admin/quitus/edit', name: 'Modifier', component: Edit_Quitus},
  { path: '/admin/personnels/edit', name: 'Modifier', component: Edit_Personnel},
  
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  // { path: '*', exact: true, name: 'Page 404', component: Page404 },
  // { path: '/404', name: '404', component: Page404 },
  // { path: '/500', name: '500', component: Page500 },
]

export default routes
