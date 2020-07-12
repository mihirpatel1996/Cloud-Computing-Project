/**
 * PartOrdersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addOrder: function (req, res) {
    const order = {
      id: req.body.partId,
      jobName: req.body.jobName,
      userId: req.body.userId,
      qnt: req.body.qnt,
    };
    sails.models.partorders.create(order).exec((err) => {
      if (err) {
        res.send({
          success: false,
          isError: true,
          message: "error in adding order",
          reeor: err,
        });
      } else {
        /*res.send({
          success: true,
          isError: false,
          message: "Order Successfully added in Company -Y",
        });*/

        //find qnt
        var qnt = 0;

        sails.models.parts
          .findOne({
            id: req.body.partId,
          })
          .exec((err, part) => {
            if (err) {
              res.send({
                success: false,
                isError: true,
                message: "Error in finding part with given Id",
                error: err,
              });
            }
            if (part.length == 0) {
              res.send({
                success: false,
                isError: false,
                message: "Part with given part Id does not exist",
              });
            } else {
              //res.send({ part });
              qnt = part.qoh;
              console.log("Found part and qnt is " + qnt);
              console.log("found qnt:" + qnt);
              console.log("order qnt:" + order.qnt);
              var updatedqnt = qnt - order.qnt;
              console.log("updated qnt:" + updatedqnt);

              //updation part

              const updatepart = {
                //partName: req.body.partName,
                qoh: updatedqnt,
              };
              sails.models.parts
                .update({ id: req.body.partId }, updatepart)
                .exec((err) => {
                  if (err) {
                    res.send({
                      success: false,
                      isError: true,
                      message: "Error in updating part details.",
                      error: err,
                    });
                  } else {
                    res.send({
                      success: true,
                      isError: false,
                      message: "Successfully updated part details.",
                    });
                  }
                });
            }
          });
      }
    });
  },
};
//update part api
/*editPart: function(req, res) {
    sails.models.parts
      .update({ id: req.param("partId"), partName: req.body.partName }, part)
      .exec((err) => {
        if (err) {
          res.send({
            success: false,
            isError: true,
            message: "Error in updating part details.",
            error: err,
          });
        } else {
          res.send({
            success: true,
            isError: false,
            message: "Successfully updated part details.",
          });
        }
      });
}*/

/* updatePartQnt: function (req, res) {

    const order = {
      id: req.body.partId,
      jobName: req.body.jobName,
      userId: req.body.userId,
      qnt: req.body.qnt,
    };
    var updatedqnt = 10;
    const part = {
      //partName: req.body.partName,
      qoh: updatedqnt,
    };
    sails.models.parts.update({ id: req.body.partId }, part).exec((err) => {
      if (err) {
        res.send({
          success: false,
          isError: true,
          message: "Error in updating part details.",
          error: err,
        });
      } else {
        res.send({
          success: true,
          isError: false,
          message: "Successfully updated part details.",
        });
      }
    });
  },*/

/*
  updatePartQnt: function (req, res) {
    const order = {
      id: req.body.partId,
      jobName: req.body.jobName,
      userId: req.body.userId,
      qnt: req.body.qnt,
    };
    //find qnt
    var qnt = 0;

    sails.models.parts
      .findOne({
        id: order.id,
      })
      .exec((err, part) => {
        if (err) {
          res.send({
            success: false,
            isError: true,
            message: "Error in finding part with given Id",
            error: err,
          });
        }
        if (part.length == 0) {
          res.send({
            success: false,
            isError: false,
            message: "Part with given part Id does not exist",
          });
        } else {
          //res.send({ part });
          qnt = part.qoh;
          console.log("Found part and qnt is " + qnt);
          console.log("found qnt:" + qnt);
          console.log("order qnt:" + order.qnt);
          var updatedqnt = qnt - order.qnt;
          console.log("updated qnt:" + updatedqnt);

          //updation part

          const updatepart = {
            //partName: req.body.partName,
            qoh: updatedqnt,
          };
          sails.models.parts
            .update({ id: req.body.partId }, updatepart)
            .exec((err) => {
              if (err) {
                res.send({
                  success: false,
                  isError: true,
                  message: "Error in updating part details.",
                  error: err,
                });
              } else {
                res.send({
                  success: true,
                  isError: false,
                  message: "Successfully updated part details.",
                });
              }
            });
        }
      });
  },*/
