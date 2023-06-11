import {Request, Response} from 'express'
import TeamService from '../services/team.service'

class TeamController {

    async salvar_time(req: Request, res: Response) {
        const resultado = await TeamService.saveTeam(req.body)

        res.status(200).json(resultado)
    }

    async queryAllTimes(req: Request, res: Response) {
        const resultado = await TeamService.queryAllTimes()
    
        res.status(200).json(resultado)
    }

    async queryTimeByTrainerName(req: Request, res: Response) {
        const resultado = await TeamService.queryTimeByTrainerName(req.params.nome)
        
        res.status(200).json(resultado)
    }
    
}

export default new TeamController()