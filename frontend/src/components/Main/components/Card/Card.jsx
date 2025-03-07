import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";


export default function Card(props) {
  const { name, link, isLiked = false } = props.card;
  const { handleOpenPopup, handleCardLike, handleCardDelete } = props;

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
