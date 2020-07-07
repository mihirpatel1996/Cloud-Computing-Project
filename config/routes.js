module.exports.routes = {
  '/': { view: 'pages/homepage' },
  'GET /view_parts' : 'PartsController.getParts',
  'GET /add_part' : {view: 'pages/addPart'},
  'POST /add_part' : 'PartsController.addPart',
};
