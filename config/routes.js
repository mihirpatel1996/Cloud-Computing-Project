module.exports.routes = {

  // These APIs are made for internal use of company Y
  '/': { view: 'pages/homepage' },
  'GET /getParts' : 'PartsController.getParts',
  'GET /addPart' : {view: 'pages/addPart'},
  'POST /addPart' : 'PartsController.addPart',
  'POST /editPartDetail' : 'PartsController.editPartDetail',
  'POST /editPart/:partId' : 'PartsController.editPart',
  'POST /deletePart/:partId' : 'PartsController.deletePart',

  // These are the APIs are made when to be called externally by others. (eg. Company Z)
  'GET /getParts' : 'PartsExternalController.getParts',
  'GET /getParts/:partId' : 'PartsExternalController.getParts',
  'POST /addPart' : 'PartsExternalController.addPart',
  'PUT /updatePart/:partId' : 'PartsExternalController.updatePart',
  'DELETE /deletePart/:partId' : 'PartsExternalController.deletePart',
};
