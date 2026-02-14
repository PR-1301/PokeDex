import { useEffect, useState } from "react";

const PokeDex = () =>{

    const [input ,setinput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [pokemon, setPokemon] = useState(null);

    const handleSearch = ()=>{
        setSearchTerm(input);
    }

    useEffect(()=>{
        if(!searchTerm) return;

        const fetchPoke = async ()=>{
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
            let data = await res.json();
            setPokemon(data);
        };   
        fetchPoke();
    }, [searchTerm])


    return (
        <>
            <input 
            type="text" value={input} placeholder="Search for pokemon" onChange={(e) => setinput(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>

            {pokemon && 
            <>
            <img src={pokemon.sprites.front_default}/>
            </>}
        </>
    )
}

export default PokeDex;