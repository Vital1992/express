const express = require('express')
const app = express()

// app.use(express.static('public')) // To display static html from public/index.html
// /test/tt.html will print tt.html

app.use(express.urlencoded({ extrended: true} )) // To acceess info coming from forms
app.use(express.json()) // To parse JSON from the body

app.set('view engine', 'ejs')
// app.use(logger) // To be run all the time

app.get('/', logger, (req, res) => { // logger printed only in get
    console.log('Here')
    // res.status(500).json({message: 'Error'})
    // By default status is 200
    // res.download('server.js') //Will download when open page

    res.render('index', {text: 'World'}) // To display dynamic html
})

const userRouter = require('./routes/users')

app.use('/users', userRouter)

function logger(req, res, next) { // Middleware
    console.log(req.originalUrl) // Prints /users/1
    next()
}

app.listen(3000)
