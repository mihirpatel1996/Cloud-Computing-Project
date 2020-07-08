/**
 * PartsExternalController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getParts: function(req, res){
        const part = {}
        if (!!req.param('partId')) {
            part.id = req.param('partId')
        }
        sails.models.parts.find(part).exec((err,parts) => {
        if(err){
            res.send({ success: false, isError:true, message: 'Error in fetching response', error: err })
        }
        parts.length===0
        ?
            res.send({ success: false, isError:false, message: 'There are no parts available', parts: [] })
        :
            res.send({ success: true, isError:false, message: 'Successfully fetched parts', parts })
        });
    },
    addPart: function(req, res) {
        sails.models.parts.find({
            id: req.body.partId
        }).exec((err, part) => {
            if (err) {
                res.send({ success: false, isError:true, message: 'Error in finding part with given Id', error: err })
            }
            if (part.length !== 0) {
                res.send({ success: false, isError:false, message: 'Part with given part Id already exist' })
            } else {
                const part = {
                    id: req.body.partId,
                    partName: req.body.partName,
                    qoh: req.body.qoh
                };
                sails.models.parts.create(part).exec(err => {
                    if (err) {
                        res.send({ success: false, isError:true, message: 'Error in adding part with.', error: err })
                    }
                    else {
                        res.send({ success: true, isError:false, message: 'Successfully added part to the system.' })
                    }
                });
            }

        });
    },
    updatePart: function(req, res) {
        const part = {
            partName: req.body.partName,
            qoh: req.body.qoh
        };
        sails.models.parts.update({id: req.param('partId')}, part).exec(err => {
            if (err) {
                res.send({ success: false, isError:true, message: 'Error in updating part details.', error: err })
            } else {
                res.send({ success: true, isError:false, message: 'Successfully updated part details.' })
            }
        });
    },
    deletePart: function(req, res) {
        const part = {
            id: req.param('partId')
        };
        sails.models.parts.destroy(part).exec(err => {
            if (err) {
                res.send({ success: false, isError:true, message: 'Error in deleting part.', error: err })
            } else {
                res.send({ success: true, isError:false, message: 'Successfully deleted part from system.' })
            }
        });
    }
};

