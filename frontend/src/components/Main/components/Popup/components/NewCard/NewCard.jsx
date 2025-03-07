import { useState, useContext } from "react";
import { CardsContext } from "../../../../../../contexts/CardsContext";

export default function NewCard() {
  const handleAddPlaceSubmit = useContext(CardsContext);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleLink = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleAddPlaceSubmit({ name, link });
  };

  return (
    <form
      className="popup__input input-image"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="input__wrap">
        <input
          className="input__text input__text-title"
          id="title"
          name="name"
          type="text"
          placeholder="Título"
          minLength="2"
          maxLength=" 30"
          required
          value={name}
          onChange={handleName}
        />
        <p className="input__errorMessage"></p>
      </div>
      <div className="input__wrap">
        <input
          className="input__text input__text-image"
          id="url"
          name="link"
          type="url"
          placeholder="Link de imagem"
          required
          value={link}
          onChange={handleLink}
        />
        <p className="input__errorMessage"></p>
      </div>
      <button type="submit" className="input__submit input__submit-add">
        Criar
      </button>
    </form>
  );
}
