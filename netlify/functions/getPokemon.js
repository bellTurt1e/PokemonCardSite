exports.handler = async function (event, context) {
    const apiKey = process.env.POKEMON_KEY; // Read from environment variables
    const pokemonNumber = event.queryStringParameters.number;

    if (!pokemonNumber) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "No Pokémon number provided." }),
        };
    }

    try {
        const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=id:${pokemonNumber}`, {
            headers: { 'X-Api-Key': apiKey }
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data" }),
        };
    }
};
