import React from "react"
import { DataContext } from "../../../services/contexts/DataContext"
import { graphql, useStaticQuery } from "gatsby"
import { Container, Navbar, NavbarContainer, NavbarSticky, NavItem } from "uikit-react"
import { Link } from "@reach/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

export const NavigationBar = () => {
  const context = React.useContext(DataContext)
  const data = useStaticQuery(graphql`{
    site {
      siteMetadata {
        title
        dashboard
        login
        logout
      }
    }
  }`).site.siteMetadata

  return (
    <NavbarSticky>
      <NavbarContainer>
        <Container>
          <Navbar>
            <NavItem>
              {window.location.pathname === "/"
                ?
                <Link to='/' className="primary">
                  {data.title}
                </Link>
                :
                <Link to='/'>
                  <FontAwesomeIcon icon={faChevronLeft} className='icon' transform='shrink-2 down-0.65'/>
                  {data.dashboard}
                </Link>
              }
            </NavItem>

            <NavItem className='uk-width-expand'/>

            <NavItem>
              {context.isAuthorized !== undefined &&
              <Link to='/login'>
                <FontAwesomeIcon
                  icon={context.isAuthorized ? faSignOutAlt : faSignInAlt}
                  className='icon' transform='down-0.65'
                />
                {context.isAuthorized ? data.logout : data.login}
              </Link>
              }
            </NavItem>
          </Navbar>
        </Container>
      </NavbarContainer>
    </NavbarSticky>
  )
}