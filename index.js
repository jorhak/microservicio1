import app from './app.js'

import {connectToDB} from './utils/mongoose.js'

import {PORT} from './config.js'


async function main(){
    await connectToDB()
    app.listen(PORT)
    console.log('Server in running on port', PORT)
}

main()
