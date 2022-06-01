const { check, validationResult } = require("express-validator")

const validatorCreateUser = [
    check("name")
    .trim()
    .isAlpha('es-ES', { ignore: ' ' }).withMessage("Only letters")
    .notEmpty().withMessage("Name must not be empty")
    .isLength({ min: 2, max: 90 }).withMessage("Character count: min 2; max 90"),

    check("email")
    .isEmail().withMessage("Must be a valid email address")
    .normalizeEmail(),

    check("password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .trim(),

    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() })
        } else {
            next()
        }
    }
]

module.exports = { validatorCreateUser }