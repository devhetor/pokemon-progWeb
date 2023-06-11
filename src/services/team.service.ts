import teamSchema from '../schemas/team.schema'
import {writeFile, readFile} from 'fs/promises'

class TeamService {
    
    async saveTeam(json) {
        const dados = await this.readFile('pokemons.json')
        const trainerName = json.trainer_name
        const pokemons:any = []

        json.pokemons.forEach(item => {
            const pokemon = dados.find(a => a.name == item)
            if (pokemon)
                pokemons.push(pokemon)
        })

        const obj = {
            trainer_name: trainerName,
            pokemons: pokemons
        }

        await this.writeFile([obj])

        return obj
    }

    async queryAllTimes() {
        const dados = await this.readFile('team.json')

        return dados
    }

    async queryTimeByTrainerName(nome_treinador) {
        let dados = await this.readFile('team.json')
        dados = dados.filter(a => a.nome_treinador == nome_treinador)
    
        return dados
    }

    async readFile(path_arquivo) {
        const content = await readFile(path_arquivo)
        return JSON.parse(content.toString())
    }

    async writeFile(dados) {
        await writeFile('team.json', JSON.stringify(dados, null, 2))
    }
}

export default new TeamService()