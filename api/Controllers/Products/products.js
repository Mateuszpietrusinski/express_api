//Rest Methods
const getAllREST = require('./REST/get_all');
const getSingleREST = require('./REST/get_single');
const postREST = require('./REST/post');
const patchREST = require('./REST/patch');
const deleteREST = require('./REST/delete');


exports.getAll = getAllREST.getAll;
exports.getSingle = getSingleREST.getSingle;
exports.post = postREST.post;
exports.patch = patchREST.patch;
exports.delete = deleteREST.delete;