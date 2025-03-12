function PopupConfirmation() {
  return (
    <div className="popup__container popup__container-deleteCard">
      <div className="popup__card">
        <h3 className="popup__title">Tem certeza?</h3>
        <form className="popup__input input-deleteCard" novalidate>
          <button type="submit" className="input__submit input__submit-delete">
            Sim
          </button>
        </form>
        <button
          className="popup__button-close button-closeDelete"
          draggable="true"
        ></button>
      </div>
    </div>
  );
}
