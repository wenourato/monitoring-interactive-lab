const express = require('express')
const path = require('path')

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'd26f7cead5c34eb4b6fffa2ee3fc409c',
  captureUncaught: true,
  captureUnhandledRejections: true,
})


let students = []
const app = express()

app.use(rollbar.errorHandler())


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})
app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('student added successfully', {author: "Wyatt", type: 'manual'})
})
const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to ward ${port}!`))