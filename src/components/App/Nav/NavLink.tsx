import { FunctionComponent, PropsWithChildren } from "react";
import { Link, LinkProps, useRoute } from "wouter";

const NavLink: FunctionComponent<PropsWithChildren<LinkProps> & { href: string }> = props => {
  const { href, children } = props;

  const [match] = useRoute(href);

  return (
    <Link {...props}>
      {
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      }<a className={`navbar-item${match ? " is-active" : ""}`}>{children}</a>
    </Link>
  );
};

export default NavLink;
