import { useEffect, useState } from "react";

const PokeDex = () => {
  const [input, setinput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(input);
  };

 useEffect(() => {
  if (!searchTerm) return;

  const fetchPoke = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );

      const data = await res.json();
      setPokemon(data);

    } catch (err) {
      setError(true)
      setPokemon(null);
    }

    setLoading(false);
  };

  fetchPoke();
}, [searchTerm]);
  return (
    <>
    {loading && <img src="/loading.gif" style={{width: "200px"}}/>}

    {error && !loading && (
        <div>
            <img
            src="/Poke-not.png"
            alt="Pokemon not found"
            style={{ width: "200px" }}
            />
        </div>
    )}

      {pokemon && (
        <>
          <img
            src={pokemon.sprites.front_default}
            width={200}
            height={"auto"}
          />
        </>
      )}
      <form onSubmit={handleSearch}>
      <input
        type="text"
        value={input}
        placeholder="Search for pokemon"
        onChange={(e) => setinput(e.target.value)}
      />
      <br></br>
      <button type="submit">Search</button>
      </form>
    </>
  );
};

export default PokeDex;
