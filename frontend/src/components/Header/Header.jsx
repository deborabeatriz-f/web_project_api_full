import logo from "../../images/logo_around.png";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Header({ text }) {
  const { currentUser, isLoggedIn, setIsLoggedIn } =
    useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeToken();
    navigate("/login");
    setIsLoggedIn(false);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = () => {
    setIsMenuOpen((preview) => !preview);
  };

  return (
    <>
      {isMenuOpen && (
        <div className="header__mobile-logout">
          <p className="header__email">{currentUser.email}</p>
          <button className="header__button-logout" onClick={handleLogOut}>
            Sair
          </button>
        </div>
      )}
      <header className="header page__container">
        <img src={logo} alt="Logo Around The U.S." className="header__image" />
        {isLoggedIn ? (
          <>
            <button
              className={
                isMenuOpen ? "header__close-menu" : "header__open-menu"
              }
              onClick={() => handleToggleMenu()}
            ></button>
            <div className="header__logout">
              <p className="header__email">{currentUser.email}</p>
              <button className="header__button-logout" onClick={handleLogOut}>
                Sair
              </button>{" "}
            </div>
          </>
        ) : (
          <a
            className="header__link"
            href={text === "Entrar" ? "/login" : "/register"}
          >
            {text}
          </a>
        )}
      </header>
    </>
  );
}
