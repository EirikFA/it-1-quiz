import logo from "@assets/image/logo.png";
import { FunctionComponent, useState } from "react";
import { Navbar } from "react-bulma-components";

import NavLink from "./NavLink";

export interface NavProps {
  onLogout: () => void;
}

const Nav: FunctionComponent<NavProps> = ({ onLogout }) => {
  const [active, setActive] = useState(false);

  return (
    <Navbar color="dark" active={active}>
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#">
          <img src={logo} alt="ArWeb logo" width="82" height="28" />
        </Navbar.Item>

        <Navbar.Burger onClick={() => setActive(!active)} />
      </Navbar.Brand>

      <Navbar.Menu>
        <Navbar.Container>
          <NavLink href="/">Browse quizzes</NavLink>
          <NavLink href="/me">My quizzes</NavLink>
        </Navbar.Container>

        <Navbar.Container position="end">
          <Navbar.Item onClick={onLogout}>
            Log out
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Nav;
