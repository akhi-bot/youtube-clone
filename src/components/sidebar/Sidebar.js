import React from "react";
import "./_sidebar.scss";

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryAdd,
  MdHome,
} from "react-icons/md";
import { logout } from "../../redux/actions/auth.action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = ({ toggleSidebar, handlerToggleSidebar }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav
      className={`sidebar ${toggleSidebar && "open"}`}
      onClick={() => handlerToggleSidebar(false)}
    >
      <Link to='/'>
      <li>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      </Link>

      <Link to='/feed/subscription'>
        <li>
          <MdSubscriptions size={23} />
          <span>Subscription</span>
        </li>
      </Link>

      <li>
        <MdThumbUp size={23} />
        <span>Like Video</span>
      </li>

      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>

      <li>
        <MdLibraryAdd size={23} />
        <span>Library</span>
      </li>

      <hr />
      <li onClick={logoutHandler}>
        <MdExitToApp size={23} />
        <span>Logout</span>
      </li>
      <hr />
    </nav>
  );
};

export default Sidebar;
