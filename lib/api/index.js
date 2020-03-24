const { Router } = require('express')

const router = Router()

router.route('/').get((req, res, next) => {
  res.status(200).send({
    ok: true
  })
})

module.exports = router
