import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

const PokedexName = () => {
  const { name } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  const [pokemon, getPokemonByName, hasError] = useFetch(url);

  console.log(pokemon);

  useEffect(() => {
    getPokemonByName();
  }, [name]);

  return (
    <article className="card_Info">
      <header className="rectangle_red list">
        <Link className="link_button" to="/pokedex">
        ◀️
        </Link>

        <div className="rectangle_black list"></div>

        <div className="circle list"></div>

        <img className="img_logo_poke" src={logo} alt="logo" />
      </header>

      <div className="body_Info">
        {hasError ? (
          <h1>The pokemon "{name}" doesn't exist </h1>
        ) : (
          <>
            <img
              className="img_cardInfo"
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />

            <section className="info_general">
              <h2 className="name_poke">{pokemon?.name}</h2>

              <ul className="height-weight-container">
                <li className="height-weight">
                  <span className="span-height-weight">Weight</span>
                  {pokemon?.weight}
                </li>
                <li className="height-weight">
                  <span className="span-height-weight">Height</span>
                  {pokemon?.height}
                </li>
              </ul>

              <ul className="type-habilities-container">
                <li className="type-habilities">
                  <span className="span-type-habilities">Type</span>
                  <div className="type-habilities-flex">
                    {pokemon?.types.map((type) => (
                      <div
                        key={type.type.name}
                        className={`type-habilitie type-${type.type.name}`}
                      >
                        {type.type.name}
                      </div>
                    ))}
                  </div>
                </li>
                <li className="type-habilities">
                  <span className="span-type-habilities">Abilities</span>
                  <div className="type-habilities-flex">
                    {pokemon?.abilities.map((ability) => (
                      <div
                        key={ability.ability.name}
                        className="type-habilitie ability-card-info"
                      >
                        {ability.ability.name}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </section>

            <section className="stat_general">
              <h3 className="title_stat">Stats:</h3>
              <ul className="name_stat">
                {pokemon?.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
              <h3 className="title_stat">Movements:</h3>
              <ul className="move_list">
                {pokemon?.moves.map((move) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </article>
  );
};

export default PokedexName;
