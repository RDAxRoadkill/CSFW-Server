const Clients = require('../models/Clients');
const Subscriptions = require('../models/Subscriptions');

module.exports = {
    Index(req, res, next) {
        Clients.find((error, data) => {
            if (error) {
              return next(error)
            } else {
              res.json(data)
            }
        })
    },
    Create(req, res, next) {
        const clientProps = {
            Name: req.body.Name,
            Firstname: req.body.Firstname,
            Lastname: req.body.Lastname,
            Subscriptions: ['']
        }
        Clients.create(clientProps, (err, data) => {
            if(err) {
                return next(err)
            } else {
                res.json(data)
            }
        });
    },
    Read(req, res, next) {
        const clientID = req.params.id;
        Clients.findById(clientID)
            .orFail(() => Error('Client not found'))
            .then(client => res.send(client))
            .catch(next);
    },
    Edit: ({ body: { Name, Firstname, Lastname, Subs}, params: { id } }, res, next) => {
        Subscriptions.find({
            '_id': { $in: Subs}
        }, function(err, data) {
            const Subscriptions = data;
            Clients.findByIdAndUpdate(id, {Name, Firstname, Lastname, Subscriptions})
                .orFail(() => Error('Client or subscription not found'))
                .then(client => res.status(200).json(client))
                .catch(next);
        })
    },
    Delete(req, res, next) {
        const clientID = req.params.id;

        Clients.findByIdAndDelete(clientID)
            .orFail(() => Error('Client not found'))
            .then(client => client.remove())
            .then(() => res.status(204).send({}))
            .catch(next);
    },
    //AddNewSubscription

    //AddExistingSubscription

}