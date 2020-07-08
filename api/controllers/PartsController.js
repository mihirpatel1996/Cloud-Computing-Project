/* eslint-disable indent */
/**
 * PartsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    getParts: function(req, res){
        sails.models.parts.find({}).exec((err,parts) => {
        if(err){
            throw err;
        }
        parts.length===0
        ?
            res.view('pages/viewParts', { message: 'Parts table does not have any records. Please click "Add Part", to add new part.'})
        :
            res.view('pages/viewParts', {parts: parts});
        });
    },
    addPart: function(req, res) {
        sails.models.parts.find({
            id: req.body.partId
        }).exec((err, part) => {
            if (err) {
                res.view('pages/addPart', { message: 'Some error occurred in fetching part with given Id' });
                throw err;
            }
            if (part.length !== 0) {
                res.view('pages/addPart', { message: 'Part id your are trying to add already exists. Please add unique partId'});
            } else {
                const part = {
                    id: req.body.partId,
                    partName: req.body.partName,
                    qoh: req.body.qoh
                };
                sails.models.parts.create(part).exec(err => {
                    if (err) {
                        res.json({error: true, message: err});
                    }
                    else {
                        res.redirect('/getParts');
                    }
                });
            }

        });
    },
    editPartDetail: function(req, res) {
        res.view('pages/editPart', {part: req.body });
    },
    editPart: function(req, res) {
        const part = {
            partName: req.body.partName,
            qoh: req.body.qoh
        };
        sails.models.parts.update({id: req.param('partId')}, part).exec(err => {
            if (err) {
                res.send({ error: true, message: 'Part that your are trying to edit does not exist' });
            } else {
                res.redirect('/getParts');
            }
        });
    },
    deletePart: function(req, res) {
        const part = {
            id: req.param('partId')
        };
        sails.models.parts.destroy(part).exec(err => {
            if (err) {
                res.send({ err: true, message: 'Some error occurred in deleting part' });
            } else {
                res.redirect('/getParts');
            }
        });
    }
};

