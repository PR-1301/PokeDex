import { useEffect, useState } from "react";

const PokeDex = () => {
  const [input, setinput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setSearchTerm(input);
  };

 useEffect(() => {
  if (!searchTerm) return;

  const fetchPoke = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );

      const data = await res.json();
      setPokemon(data);

    } catch (err) {
      console.error("Error fetching Pokemon");
      setPokemon(null);
    }

    setLoading(false);
  };

  fetchPoke();
}, [searchTerm]);
  return (
    <>
      {pokemon && (
        <>
          <img
            src={pokemon.sprites.front_default}
            width={200}
            height={"auto"}
          />
        </>
      )}
      <input
        type="text"
        value={input}
        placeholder="Search for pokemon"
        onChange={(e) => setinput(e.target.value)}
      />
      <br></br>
      <button onClick={handleSearch}>Search</button>
    </>
  );
};

export default PokeDex;
