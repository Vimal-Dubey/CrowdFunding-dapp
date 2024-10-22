import { Outlet, Link } from "react-router-dom";
import '../App.css';
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li className="listi">
            <Link className="i" to="/">Home</Link>
          </li>
          <li className="listi">
            <Link className="i" to="/create-campaign">Create Campaign</Link>
          </li>
          <li className="listi">
            <Link className="i" to="/My-Profile">My Campaigns</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;