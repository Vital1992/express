const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send(users)
})

router.get('/new', (req, res) => {
    console.log(req.query.name) // Will print Kyle if url is users?name=Kyle
    res.render('users/new', { firstName: 'Test' })
})

router.post('/', (req, res) => {
    const isValid = true
    if (isValid) {
        users.push({ firstName: req.body.firstName})
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log('error')
        res.render('/users/new', { firstName: req.body.firstName })
    }
    console.log(req.body.firstName)
})

router
.route('/:id')
.get((req, res) => {
    console.log(req.user) // Will print { name: 'Sally' } from param
    res.send(`Get User with ID ${req.params.id}`)
})
.put((req, res) => {
    res.send(`Update User with ID ${req.params.id}`)
})

.delete((req, res) => {
    res.send(`Delete User with ID ${req.params.id}`)
})

// Above is same as:
// router.get('/:id', (req, res) => {
//     req.params.id
//     res.send(`Get User with ID ${req.params.id}`)
//     // /users/51 will return Get User with ID 51
// })

// router.put('/:id', (req, res) => {
//     req.params.id
//     res.send(`Update User with ID ${req.params.id}`)
// })

// router.delete('/:id', (req, res) => {
//     req.params.id
//     res.send(`Delete User with ID ${req.params.id}`)
// })

// Expresso reads from top to bottom, so if router.get('/new', (req, res) goes ater router.get('/:id', (req, res) we'll get "Get User with ID new"

const users = [{name: 'Kyle'}, {name: 'Sally'}]
// Whenever id param found:
router.param('id', (req, res, next, id) => {
    req.user = users[id]
    next() // To prevent infinite loading
})

module.exports = router