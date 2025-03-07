export default function ImagePopup(props) {
  const { card } = props;

  return (
    <div className="popup__bigImage-card">
      <div className="popup__bigImage-cardContainer">
        <img className="popup__open-bigImage" src={card.link} alt={card.name} />
        <p className="popup__subtitle-bigImage">{card.name}</p>
      </div>
    </div>
  );
}
