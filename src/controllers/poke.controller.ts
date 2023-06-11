import {Request, Response} from 'express'
import pokeService from '../services/poke.service'

class PokemonController {

    async getData(req: Request, res: Response) {
        const dados = await pokeService.organizeData()
        
        await pokeService.writeFile(dados, 'pokemons.json')
        const result = await pokeService.saveData(dados)

        res.status(200).json(result)
    }

    async filterPokeByType(req: Request, res: Response) {
        const data = await pokeService.filterPokemonsByType(req.params.tipo)
        res.status(200).json(data)
    }

    async searchByDexId(req: Request, res: Response) {
        const data = await pokeService.searchPokemonByDexId(req.params.dex)
        res.status(200).json(data)
    }

    async searchByPokeName(req: Request, res: Response) {
        const data = await pokeService.searchPokemonByName(req.params.nome)
        res.status(200).json(data)
    }

}

export default new PokemonController()