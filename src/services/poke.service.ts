import { writeFile, readFile } from "fs/promises";
import PokemonSchema from "../schemas/poke.schema";

class PokemonService {
    async getData() {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        return response;
    }

    async organizeData() {
        const response = await this.getData();
        const data = await response.json();

        const organizedData = Object.keys(data).map((key) => {
            const item = data[key];

            const pokemonData = {
                name: item.forms[0].name,
                type: item.types.map((type) => type.type.name),
                dex: item.game_indices[9].game_index,
                height: item.height,
                weight: item.weight
            };

            return pokemonData;
        });

        return organizedData;
    }


    async writeFile(data, arquivo) {
        await writeFile(arquivo, JSON.stringify(data, null, 2));
    }

    async readFile() {
        const content = await readFile("pokemons.json");
        return JSON.parse(content.toString());
    }

    async saveData(data) {
        const result = await PokemonSchema.insertMany(data);
        return result;
    }

    async organizeByType() {
        const data: any = await this.readFile();

        let types = data.map((item) => item.type[0]);
        types = types.filter((value, index) => types.indexOf(value) === index);

        const list = types.map((item) => {
            return {
                type: item,
                pokemons: data
                    .filter((a) => a.type.includes(item))
                    .sort((a, b) => a - b),
            };
        });

        await this.writeFile(list, "pokemonsByType.json");
    }

    async filterPokemonsByType(type) {
        const data: any = await this.readFile();

        return data.filter((pokemon) => pokemon.type.includes(type));
    }

    async searchPokemonByDexId(dex) {
        const data: any = await this.readFile();

        return data.filter((pokemon) => pokemon.dex == dex);
    }

    async searchPokemonByName(name) {
        const data: any = await this.readFile();

        return data.filter((pokemon) => pokemon.name == name);
    }
}

export default new PokemonService();
