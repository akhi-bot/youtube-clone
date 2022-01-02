import React , {useState}from "react";
import "./_header.scss";

import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const Header = ({handlerToggleSidebar}) => {
  const [input, setInput] = useState('')
  const history = useHistory()

  const handleSubmit = (e) => {
      e.preventDefault()

      history.push(`/search/${input}`)
  }
  const photoUrl = useSelector(state => state.auth?.user?.photoUrl)
  return (
    <div className="border border-dark header">
      <FaBars className="header__menu" size={26} onClick= {() => (handlerToggleSidebar())} />

      <img
        src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png"
        alt=""
        className="header__logo"
      />

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" value={input} onChange={(e) => setInput(e.target.value)}/>
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src={photoUrl}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Header;
