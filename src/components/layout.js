import React from "react"
import { Container, Flex, Navbar, NavbarContainer, NavbarSticky, NavItem } from "uikit-react"
import { faChevronLeft, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "@reach/router"
import { DataContext } from "../context/DataContext"

export const Layout = props => {
  const context = React.useContext(DataContext)

  return (
    <div>
      <NavbarSticky>
        <NavbarContainer>
          <Container>
            <Navbar>
              <NavItem>
                {
                  window.location.pathname === "/" ?
                    <Link to='/' className="primary">
                      {props.title}
                    </Link>
                    :
                    <Link to='/'>
                      <FontAwesomeIcon icon={faChevronLeft} className='icon' transform='shrink-2 down-0.65'/>
                      Dashboard
                    </Link>
                }
              </NavItem>
              <NavItem className='uk-width-expand'/>
              <NavItem>
                <Link to='/login'>
                  <FontAwesomeIcon icon={context.authorized ? faSignOutAlt : faSignInAlt} className='icon'
                                   transform='down-0.65'/>
                  {context.authorized ? "Log Out" : "Log In"}
                </Link>
              </NavItem>
            </Navbar>
          </Container>
        </NavbarContainer>
      </NavbarSticky>
      <Container id='layout' style={{ paddingBottom: "2em" }}>
        <Flex className='uk-flex-middle' style={{ height: "6em", marginTop: "2.5em" }}>
          <p id='title' className='uk-align-center'>
            {props.title}
          </p>
        </Flex>
        {props.children}
      </Container>
    </div>
  )
}
