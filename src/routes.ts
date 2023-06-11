import { Router } from 'express'
import pokeController from './controllers/poke.controller'
import teamController from './controllers/team.controller'

const router = Router()

router.get('/start-pokemons', pokeController.getData) 
router.post('/time', teamController.salvar_time)
router.get('/times', teamController.queryAllTimes)
router.get('/time/treinador-nome/:nome', teamController.queryTimeByTrainerName)
router.get('/pokemon/tipo/:tipo', pokeController.filterPokeByType)
router.get('/pokemon/dex/:dex', pokeController.searchByDexId)
router.get('/pokemon/nome/:nome', pokeController.searchByPokeName)

export default router