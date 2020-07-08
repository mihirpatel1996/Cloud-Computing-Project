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
  'GET /parts' : 'PartsExternalController.getParts',
  'GET /parts/:partId' : 'PartsExternalController.getParts',
  'POST /add_part' : 'PartsExternalController.addPart',
  'PUT /update_part/:partId' : 'PartsExternalController.updatePart',
  'DELETE /delete_part/:partId' : 'PartsExternalController.deletePart',
};
