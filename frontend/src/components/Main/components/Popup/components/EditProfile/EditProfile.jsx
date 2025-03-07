import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className="popup__input input-profile"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="input__wrap">
        <input
          className="input__text input__text-name"
          id="name"
          name="name"
          type="text"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <p className="input__errorMessage"></p>
      </div>

      <div className="input__wrap">
        <input
          className="input__text input__text-job"
          id="job"
          name="about"
          type="text"
          placeholder="Sobre mim"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <p className="input__errorMessage"></p>
      </div>
      <button type="submit" className="input__submit input__submit-save">
        Salvar
      </button>
    </form>
  );
}
