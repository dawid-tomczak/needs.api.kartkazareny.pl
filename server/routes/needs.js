import express from 'express'
import { appendRow } from '../helpers/googleSheetsApi'
import { body, validationResult } from 'express-validator'

let router = express.Router()

const validators = [
    body().isArray(),
    body('*.volunteer').exists(),
    body('*.category').exists(),
    body('*.product').exists(),
    body('*.unit').exists().isLength({ max: 10 }),
    body('*.amount').isNumeric(),
]

router.post('/', ...validators, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() })
        return
    }

    const dataToAdd = req.body
    dataToAdd.forEach((row) => (row.inputDate = new Date()))

    try {
        await appendRow(req.body)
    } catch (err) {
        res.status(500).send({ message: 'failed to append rows' })
        return
    }

    res.status(201).send('added rows')
})

export default router
