import React from "react"
import { Container, Flex, Navbar, NavbarContainer, NavbarSticky, NavItem } from "uikit-react"
import { faChevronLeft, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "@reach/router"
import { DataContext } from "../context/DataContext"
import { graphql, useStaticQuery } from "gatsby"

export const Layout = ({ title, children }) => {
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
    <div>
      <NavbarSticky>
        <NavbarContainer>
          <Container>
            <Navbar>
              <NavItem>
                {window.location.pathname === "/"
                  ?
                  <Link to='/' className="primary">
                    {title}
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
                {context.authorized !== undefined &&
                <Link to='/login'>
                  <FontAwesomeIcon icon={context.authorized ? faSignOutAlt : faSignInAlt} className='icon'
                                   transform='down-0.65'/>
                  {context.authorized ? data.logout : data.login}
                </Link>
                }
              </NavItem>
            </Navbar>
          </Container>
        </NavbarContainer>
      </NavbarSticky>
      <Container id='layout' style={{ paddingBottom: "2em" }}>
        <Flex className='uk-flex-middle' style={{ height: "6em", marginTop: "2.5em" }}>
          <p id='title' className='uk-align-center'>
            {title}
          </p>
        </Flex>
        {children}
      </Container>
    </div>
  )
}
