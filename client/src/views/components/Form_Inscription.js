import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormControl,
    CFormFeedback,
    CInputGroup,
    CInputGroupText,
    CRow,
    CFormSelect,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'

const Form_Inscription = () => {
    return (
        <>
          <CRow>
              <h1 style= {{textAlign: "center", fontFamily: "Algerian"}}>FICHE D INSCRIPTION</h1>
            <CCol className= "justify-content-center">
                <CCard>
                <CCardHeader color="dark">
                    <strong></strong> <small></small>
                </CCardHeader>
                <CForm
                    className="row g-3 needs-validation"
                    >
                <CCardBody>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <CIcon name="cil-user" color="dark"/>
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                id="num_inscription"
                                name="num_inscription"
                                placeholder="N° D'INSCRIPTION AU CONCOURS"
                                min="1"
                                required
                                />
                            <CFormFeedback invalid></CFormFeedback>
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                id="carte_etudiant"
                                name="carte_etudiant"
                                placeholder="N° CARTE D'ETUDIANT"
                                min="1"
                                required
                                />
                                <CFormFeedback invalid></CFormFeedback>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                        <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl 
                        type="text"
                        id="nom_et"
                        name="nom_et"
                        placeholder="NOM"
                        required
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-3 has-validation">
                        <CInputGroupText >
                        <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl 
                        type="text"
                        id="prenom_et"
                        name="prenom_et"
                        placeholder="PRENOM"
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-3 has-validation">
                        <CInputGroupText >
                        <CIcon name="cil-mail" />
                        </CInputGroupText>
                        <CFormControl 
                        type="email"
                        id="email_et"
                        name="email_et"
                        placeholder="EMAIL"
                        />
                    </CInputGroup>
                    <CRow>
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                <span>Né(e) le </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="date"
                                id="date_naissance"
                                name="date_naissance"
                                placeholder="Entrer l'email du candidat"
                                className=""
                                required
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                <span> à </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="lieu_naissance"
                                name="lieu_naissance"
                                placeholder="LIEU DE NAISSANCE"
                                className=""
                                required
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow> <br/>

                    <CInputGroup className="mb-3 has-validation">
                        <CInputGroupText >
                            <CIcon name="cil-phone" />
                        </CInputGroupText>
                        <CFormControl 
                        type="text"
                        id="telephone_candidat"
                        name="telephone_candidat"
                        placeholder="N° TELEPHONE"
                        required
                        />
                    </CInputGroup>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect aria-label="Default select example">
                                    <option>SITUATION MATRIMONIALE</option>
                                    <option value="celibataire">Celibataire</option>
                                    <option value="mariee">Marié(e)</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>
                        <CCol>
                        <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect aria-label="Default select example">
                                    <option>SEXE</option>
                                    <option value="celibataire">Masculin</option>
                                    <option value="mariee">Feminin</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>    
                    </CRow>
                    </CCardBody>
                    <CRow >
                    <br/>
                    <h4 style={{color:"darkgray", fontFamily:"Algerian", textAlign:"center"}}>Immatriculation Provisoire</h4>
                    <p style={{textAlign:"center"}}>**********</p> <br/>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-calendar" />
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                id="annee_bacc"
                                name="annee_bacc"
                                placeholder="ANNEE DU BACC"
                                required
                                />
                            </CInputGroup> 
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="numero_bacc"
                                name="numero_bacc"
                                placeholder="N° DU BACC"
                                required
                                />
                            </CInputGroup> 
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect aria-label="Default select example">
                                    <option>SERIE</option>
                                    <option value="scientifique"> Scientifique</option>
                                    <option value="ose">Ose</option>
                                    <option value="litteraire">Litteraire</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                   <CRow>
                       <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect aria-label="Default select example">
                                    <option>NATURE</option>
                                    <option value="general">Général</option>
                                    <option value="technique">Technique</option>
                                </CFormSelect>
                            </CInputGroup>
                       </CCol>
                       <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="centre_bacc"
                                name="centre_bacc"
                                placeholder="CENTRE DU BACC"
                                required
                                />
                            </CInputGroup>
                       </CCol>
                       <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect aria-label="Default select example">
                                    <option>MENTION</option>
                                    <option value="tres_bien">Tres Bien</option>
                                    <option value="bien">Bien</option>
                                    <option value="assez_bien">Assez Bien</option>
                                    <option value="passable">Passable</option>
                                </CFormSelect>
                            </CInputGroup>
                       </CCol>
                   </CRow>
                   <br/>
                    <h4 style={{color:"darkgray", fontFamily:"Algerian", textAlign:"center"}}>Démande d inscription</h4>
                    <p style={{textAlign:"center"}}>**********</p>

                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect aria-label="Default select example">
                                    <option>ANNEE D ETUDE</option>
                                    <option value="L1">L1</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-people" />
                                </CInputGroupText>
                                <CFormSelect aria-label="Default select example">
                                    <option>PARCOURS</option>
                                    <option value="GB">Génie Logiciel et Base de Donnée</option>
                                    <option value="SR">Administration Système et Reseau</option>
                                    <option value="GENERALISTE">Généraliste</option>
                                </CFormSelect>
                            </CInputGroup>
                        </CCol>
                    </CRow>

                    <h4 style={{color:"darkgray", fontFamily:"Algerian", textAlign:"center"}}>Etat civil</h4>
                    <p style={{textAlign:"center"}}>**********</p>

                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="nationalite"
                                name="nationalite"
                                placeholder="NATIONALITE"
                                required
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="cin_passeport"
                                name="cin_passeport"
                                placeholder="N° CIN OU PASSEPORT"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                <span>Duplicata du </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="date"
                                id="duplicata_cin"
                                name="duplicata_cin"
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                <span> à </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="lieu_duplicata_cin"
                                name="lieu_duplicata_cin"
                                placeholder="LIEU"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                        <p></p>
                    <CRow >
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                <span>Délivré du </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="date"
                                id="date_delivrance"
                                name="date_delivrance"
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup>
                                <CInputGroupText>
                                    <span> à </span>
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="lieu_delivrance"
                                name="lieu_delivrance"
                                placeholder="LIEU"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <br/>
                    <h4 style={{color:"darkgray", fontFamily:"Algerian", textAlign:"center"}}>FAMILLE (SI MARIEE)</h4>
                    <p style={{textAlign:"center"}}>**********</p>

                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="nom_conjointe"
                                name="nom_conjointe"
                                placeholder="NOM DU (DE LA) CONJOINT(E)"
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="profession_conjointe"
                                name="profession_conjointe"
                                placeholder="PROFESSION CONJOINT(E)"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                id="nb_enfant"
                                name="nb_enfant"
                                placeholder="NOMBRE D'ENFANT A CHARGE"
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="profession_etudiant"
                                name="profession_etudiant"
                                placeholder="PROFESSION DE L ETUDIANT(E)"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>

                    <h4 style={{color:"darkgray", fontFamily:"Algerian", textAlign:"center"}}>PARENTS</h4>
                    <p style={{textAlign:"center"}}>**********</p>

                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="nom_pere"
                                name="nom_pere"
                                placeholder="NOM DU PERE"
                                />
                            </CInputGroup>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="nom_mere"
                                name="nom_mere"
                                placeholder="NOM DE LA MERE"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3">
                                <CInputGroupText>
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="nom_titeur_1"
                                name="nom_titeur_1"
                                placeholder="NOM DU TUTEUR"
                                />
                            </CInputGroup>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="nom_titeur_1"
                                name="nom_titeur_1"
                                placeholder="NOM DU TUTEUR"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                id="nb_enfant_parent"
                                name="nb_enfant_parent"
                                placeholder="NOMBRE D'ENFANT A CHARGE"
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="number"
                                id="nb_enfant_boursier"
                                name="nb_enfant_boursier"
                                placeholder="BOURSIERS"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-user" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="adresse_parent"
                                name="adresse_parent"
                                placeholder="ADRESSE DES PARENTS OU TUTEURS"
                                />
                            </CInputGroup>
                        </CCol>
                        <CCol>
                            <CInputGroup className="mb-3 has-validation">
                                <CInputGroupText >
                                    <CIcon name="cil-pencil" />
                                </CInputGroupText>
                                <CFormControl 
                                type="text"
                                id="telephone"
                                name="telephone"
                                placeholder="N° TELEPHONE"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                        <br/>
                        <p></p>
                    <CRow>
                        <CCol></CCol>
                        <CCol></CCol>
                        <CCol></CCol>
                        <CCol>
                            <CButton color="success" type="submit">
                                Enregistrer
                            </CButton>
                        </CCol>
                    </CRow>
                </CForm>
                </CCard>
            </CCol>
            </CRow>  
        </>
    )
}

export default Form_Inscription
