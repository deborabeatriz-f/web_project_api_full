import { Link } from "react-router-dom";
import { useState } from "react";
import "../../blocks/sign.css";

const Register = ({ handleRegistration }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegistration(data);
  };

  return (
    <div className="sign">
      <p className="sign__welcome">Inscrever-se</p>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          className="sign__email"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="E-mail"
        />
        <input
          className="sign__password"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Senha"
        />
        <div className="sign__button-container">
          <button type="submit" className="sign__link">
            Inscreva-se aqui
          </button>
        </div>
      </form>
      <div className="sign__signin">
        <span>
          Já é um membro?{" "}
          <Link to="/login" className="sign__login-link">
            Faça o login aqui!
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
