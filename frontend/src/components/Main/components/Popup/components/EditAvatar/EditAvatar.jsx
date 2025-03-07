import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateAvatar({ avatar });
  };

  return (
    <form
      className="popup__input input-avatar"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="input__wrap">
        <input
          className="input__text input__text-avatar"
          id="url"
          name="avatar"
          type="url"
          placeholder="Link de imagem"
          required
          value={avatar}
          onChange={handleAvatarChange}
        />
        <p className="input__errorMessage"></p>
      </div>
      <button type="submit" className="input__submit input__submit-avatar">
        Salvar
      </button>
    </form>
  );
}
