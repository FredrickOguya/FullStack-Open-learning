const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const { Note, User } = require('../models')
const { Op } = require('sequelize')

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  if (!req.note) {
    return res.status(404).end()
  }
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  console.log('Authorization header:', authorization)

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      return res.status(401).json({ error: 'token invalid'})
    }
  } else {
    return res.status(401).json({ error: 'token missing'})
  }
  next()
}

router.get('/', async (req, res) => {
  const where = {}
  
  if (req.query.important) {
    important = req.query.important=== "true"
  }
  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search
    }
  }


  const notes = await Note.findAll({
    attributes: { 
      exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
      },
      where
  })
  res.json(notes)
})

router.post('/',tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)

    if(!user) {
      return res.status(401).json({ 
        error: "user not found"
      })
    }
    const note = await Note.create({... req.body, date: new Date(), userId: user.id})
    res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', noteFinder, async (req, res) => {
  res.json(req.body)
})

router.delete('/:id', noteFinder, async (req, res) => {
  await req.note.destroy()
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  req.note.important = req.body.important
  await req.note.save()
  res.json(req.note)
  }
)

module.exports = router