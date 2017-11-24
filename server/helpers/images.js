'use strict'
require('dotenv').config()

const Storage = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  // console.log("ini req body", req.body)
  // console.log("ini req file", req.files,req.file)
  if (!req.files) {
    return next()
  }
  // console.log(req.filesUrls);
  if(!req.filesUrls){
    // console.log("masuk")
    req.filesUrls = []
  }
  
  req.files.forEach((newFile, index) => {
    let gcsname = newFile.originalname   
    let file = bucket.file(`/img/${req.body.title}_${req.body.chapter}/${gcsname}`)
    let stream = file.createWriteStream({
      metadata: {
        contentType: req.files.mimetype
      }
    })
    stream.on('error', (err) => {
      console.log('ada error ', err)
      newFile.cloudStorageError = err
      next(err)
    })

    stream.on('finish', () => {
      newFile.cloudStorageObject = gcsname
      file.makePublic().then(() => {
        req.filesUrls.push(getPublicUrl(gcsname))
        if(req.filesUrls.length == req.files.length){
          next()
        }
      })
    })
    stream.end(newFile.buffer)    
  })
}

const Multer = require('multer'),
multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}