import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const { name, link, likes } = props.card;
  const { handleOpenPopup, handleCardLike, handleCardDelete } = props;
  const isLiked = likes.some((like) => like === currentUser._id);

  console.log(isLiked);
  const cardLikeButtonClassName = `grid__button-heart ${
    isLiked ? "grid__button-heart-active" : ""
  }`;

  const imagePopup = { children: <ImagePopup card={props.card} /> };

  return (
    <div className="grid__card">
      <button
        className="grid__card-delete"
        onClick={() => handleCardDelete(props.card)}
      ></button>
      <img
        src={link}
        alt=""
        className="grid__card-image"
        onClick={() => handleOpenPopup(imagePopup)}
      />
      <div className="grid__card-text">
        <h3 className="grid__card-title">{name}</h3>
        <button
          className={cardLikeButtonClassName}
          onClick={() => handleCardLike(props.card)}
        ></button>
      </div>
    </div>
  );
}
