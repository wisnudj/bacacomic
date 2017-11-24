  'use strict'
  const express = require('express'),
  router = express.Router(),
  images = require('../helpers/images')

  const Controller = require('../controllers/comic')

  /* GET main endpoint. */
  router.get('/', Controller.findAll)

  router.post('/upload',
    images.multer.array('image'), 
    images.sendUploadToGCS, 
    Controller.create)

  router.get('/:comicId', Controller.findOneComic)

  router.delete('/:comicId', Controller.destroy)

  module.exports = router
