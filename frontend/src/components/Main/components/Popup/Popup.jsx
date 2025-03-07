export default function Popup(props) {
  const { title, children, onClose } = props;

  return (
    <div className="popup__container">
      <div className={`popup__card ${!title ? "popup__bigImage-card" : ""}`}>
        {title && <h3 className="popup__title">{title}</h3>}

        {children}
        <button
          className={`popup__button-close ${
            !title ? "popup__buttonClose-bigImage" : ""
          }`}
          draggable="true"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
