const router = require('express').Router()

const { Note } = require('../models')
const { User } = require('../models')

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  if (!req.note) {
    return res.status(404).end()
  }
  next()
}


router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Note
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne()
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
  res.status(req.note)
  }
)

module.exports = router