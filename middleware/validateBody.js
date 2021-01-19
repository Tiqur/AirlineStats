const Joi = require('joi')
    .extend(require('@joi/date'));


const reqSchema = Joi.object().keys({
    from:           Joi.string().required(),
    to:             Joi.string().required(),
    departure_date: Joi.date().format('YYYY-MM-DD').utc(),
    arrival_date:   Joi.date().format('YYYY-MM-DD').utc(),
    round_trip:     Joi.bool().default(false),
    occupants:      Joi.number().integer().min(1).max(999).default(1),
    stops:          Joi.bool().default(true),
    class:          Joi.number().integer().min(1).max(3).default(1),
    sort:           Joi.number().integer().min(1).max(2).default(1)
});

exports.validateBody = (req, res, next) => {
    const headers = req.body;
    const validationError = reqSchema.validate(headers).error;
    if (validationError) {
        res.json(validationError.details[0])
    } else if (Date(headers.departure_date) > Date(headers.arrival_date)) {
        res.json({"err": "Departure date must be before arrival_date"});
    } else if (Date(headers.arrival_date) < Date.now()) {
        res.json({"err": "Arrival date cannot be in the past"});
    } else { 
        next();
    }
}