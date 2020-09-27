import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'sign up', href: '/auth/signup' },
    !currentUser && { label: 'sign in', href: '/auth/signin' },
    currentUser && { label: 'sell tickets', href: '/tickets/new' },
    currentUser && { label: 'orders', href: '/orders' },
    currentUser && { label: 'sign out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => (
      <li className="nav-item" key={href}>
        <Link href={href}>
          <a className="nav-link">{label}</a>
        </Link>
      </li>
    ));

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">Ticketing</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
