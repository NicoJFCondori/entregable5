import { useRef } from "react";
import { setTrainerNameGlobal } from "../store/slices/trainerName.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Home = () => {
  const trainerNameRef = useRef();

  const navigate = useNavigate();

  const { trainerName } = useSelector((states) => states);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerNameGlobal(trainerNameRef.current.value.trim()));
    navigate("/pokedex");
  };

  return (
    <article className="home">
      <header className="header_home">
        <img className="img_logo" src={logo} alt="logo" />
        <h2 className="home_title">Hi👋 Trainer!</h2>
        <p className="home_info">To start, please give me your trainer name😉</p>
        <form className="form_home" onSubmit={handleSubmit}>
          <input className="input_home" ref={trainerNameRef} type="text" />
          <button className="btn_home">Let Start</button>
        </form>
      </header>
      <footer className="footer">
      <section class="personal_information">
            <h6 class="dates">Nicolás José Fernando Condorí,{' '}
      <a href="https://github.com/NicoJFCondori/entregable5.git" target="_blank" rel="noopener noreferrer">
      https://github.com/NicoJFCondori/entregable5.git
      </a></h6>
            </section>
      </footer>
    </article>
  );
};

export default Home;
