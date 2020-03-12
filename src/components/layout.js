import React from "react"
import { Container, Flex, Navbar, NavbarContainer, NavbarSticky, NavItem } from "uikit-react"
import { faChevronLeft, faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "@reach/router"

const Layout = props => (
  <div>
    <NavbarSticky>
      <NavbarContainer>
        <Container>
          <Navbar>
            <NavItem>
              <Link id='nav-title' to='/'>
                {
                  window.location.pathname !== "/" &&
                  <FontAwesomeIcon icon={faChevronLeft} className='icon' transform='shrink-2 down-0.65'/>
                }
                {props.title}
              </Link>
            </NavItem>
            <NavItem className='uk-width-expand'/>
            <NavItem>
              <Link to='/login'>
                <FontAwesomeIcon icon={faSignInAlt} className='icon' transform='down-0.65'/>
                {props.action}
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

export default Layout