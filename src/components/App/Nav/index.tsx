import logo from "@assets/image/logo.png";
import { FunctionComponent, useState } from "react";
import { Navbar } from "react-bulma-components";
import { Link } from "wouter";

import NavLink from "./NavLink";

export interface NavProps {
  onLogout: () => void;
}

const Nav: FunctionComponent<NavProps> = ({ onLogout }) => {
  const [active, setActive] = useState(false);

  const disable = () => setActive(false);

  return (
    <Navbar color="dark" active={active}>
      <Navbar.Brand>
        <Navbar.Item>
          <Link href="/">
            <img src={logo} alt="ArWeb logo" width="82" height="28" />
          </Link>
        </Navbar.Item>

        <Navbar.Burger onClick={() => setActive(!active)} />
      </Navbar.Brand>

      <Navbar.Menu>
        <Navbar.Container>
          <NavLink href="/" onClick={disable}>Browse quizzes</NavLink>
          <NavLink href="/me" onClick={disable}>My quizzes</NavLink>
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
