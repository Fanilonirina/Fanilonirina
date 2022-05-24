import React, { Component } from 'react'
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// const PrivateRoute = React.lazy(() => import('./layout/PrivateRoute'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route exact path="/" name="Login Page" render={(props) => <Redirect to="/login" {...props} />} />
            <Route
              exact
              path="/register/:email/:token"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route path="/personnels" name="Personnels" component={DefaultLayout} />
            <Route path="/etudiants" name="Etudiants" component={DefaultLayout} />
            <Route path="/admin" name="Admninistrateur" component={DefaultLayout} />
            {/* <PrivateRoute path="/users" name="Home" /> */}
            <Route path='*' name="Page 404" exact render={(props) => <Page404 {...props} />}/>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App
