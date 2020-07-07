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
            res.send({ error: 'Parts table does not have any records'})
        :
            res.view('pages/viewParts', {parts: parts});
        });
    },
    addPart: function(req, res) {
        console.log('1', req.body);
        sails.models.parts.find({
            partId: req.body.partId
        }).exec((err, part) => {
            if (err) {
                console.log('Error in fetching part inside addPart', err);
                res.send({ error: true, message: 'Error in fetching the product item.' })
                throw err;
            }
            if (part.length !== 0) {
                console.log('2');

                res.send({ error:false, message: 'Part id your are looking for already exists, it should be unique, go back and enter unique partId'});
            } else {
                console.log('3');

                const part = {
                    id: req.body.partId,
                    partName: req.body.partName,
                    qoh: req.body.qoh
                };
                console.log('__part', part);
                sails.models.parts.create(part).exec(err => {
                    if (err) {
                        res.json({error: true, message: err});
                    }
                    else {
                        console.log('___GET PARTS CALLED');
                        this.getParts(req, res);
                    }
                });
            }

        });
    },
    // getPartsById: function(req,res){
    //     sails.models.parts.find({
    //     id: req.param('partId')}).exec((err,part) => {
    //     if(err){
    //         console.log(err);
    //         throw err;
    //     }
    //     part.length === 0
    //     ?
    //         res.send({error: 'parts table does not have any records with provided partId'})
    //     :
    //         res.view('pages/editData', {part:part[0]});
    // });
    // },
    // postParts: function(req, res) {
    //   var insertData = {id:req.body.partId, partId:req.body.partId, qty:req.body.qty};
    //   sails.models.parts.create(insertData).exec((err) => {
    //     if(err){
    //       res.status(404).send('parts table with partId ' +insertData.id +'and partId ' +insertData.partId +' already exists');
    //     }
    //     else{
    //       res.redirect('/viewData');
    //     }
    //   });
    // },
    // updatePart: function(req,res){
    //   var partId = req.body.partId;
    //   var qty = req.body.qty;
    //   sails.models.parts.update({id:partId, partId:partId}, {qty:qty}).exec((err) => {
    //     if(err){
    //       res.send('partId '+partId+' does not exist');
    //     }
    //     else{
    //       res.redirect('/viewData');
    //     }
    //   });
    // },
    // deletePart: function(req,res){
    //   sails.models.parts.destroy({id: req.param('partId')}).exec((err)=>{
    //     if(err){
    //       throw err;
    //     }
    //     else{
    //       res.redirect('/viewData');
    //     }
    //   });
    //   return false;
    // }
  };

