import avatar from "../../images/jacques_cousteau.png";
import { useContext } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Main(props) {
  const {
    handleOpenPopup,
    handleClosePopup,
    popup,
    handleCardLike,
    handleCardDelete,
    cards,
  } = props;

  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = { title: "New card", children: <NewCard /> };
  const editProfilePopup = { title: "Edit Profile", children: <EditProfile /> };
  const editAvatarPopup = { title: "Edit Avatar", children: <EditAvatar /> };

  return (
    <main className="page__container">
      <section className="profile">
        <div className="profile__card-image">
          <img
            src={currentUser.avatar || avatar}
            alt={currentUser.name || "Jacques Cousteau"}
            className="profile__image"
          />
          <button
            className="profile__btn-avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
        </div>
        <div className="profile__card">
          <h2 className="profile__title">
            {currentUser.name || "Jacques Cousteau"}
          </h2>
          <button
            className="profile__button-edit"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__subtitle">
            {currentUser.about || "Explorador"}
          </p>
        </div>

        <button
          className="profile__button-add"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="grid">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            handleOpenPopup={handleOpenPopup}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
          />
        ))}
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
