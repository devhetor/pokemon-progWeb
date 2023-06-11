import app from './app'

function main() {
    try {
        app.listen(3001, 'localhost', () => {
            console.log('Iniciado na porta 3001')
        })
    } catch (err) {
        console.error('Erro ao iniciar servidor', err)
    }
}

main()

