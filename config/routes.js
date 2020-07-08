module.exports.routes = {
  '/': { view: 'pages/homepage' },
  'GET /getParts' : 'PartsController.getParts',
  'GET /addPart' : {view: 'pages/addPart'},
  'POST /addPart' : 'PartsController.addPart',
  'POST /editPartDetail' : 'PartsController.editPartDetail',
  'POST /editPart/:partId' : 'PartsController.editPart',
  'POST /deletePart/:partId' : 'PartsController.deletePart'
};
