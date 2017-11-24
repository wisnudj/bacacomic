const ObjectId = require('mongodb').ObjectId;
const Comic = require('../models/comic')


function create(req,res) {
	console.log(req.files);	
	let comic = new Comic({
		author : req.body.author,
		title: req.body.title,
		chapter : req.body.chapter,
		images : req.filesUrls
	});

	comic.save((err, newComic) => {
		if(err){
			res.status(500).send(err)
		}else{
			req.filesUrls=[];
			res.send(newComic);
		}
	})
}

function findAll(req,res) {
	Comic.find((err, allComic) => {
		if(err){
			res.status(500).send(err)
		}else{
			res.send(allComic)
		}
	})
}

function findOneComic(req,res) {
	Comic.findOne({
		_id : ObjectId(req.params.comicId)
	})
	.then(comic => {
		res.send(comic);
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function destroy(req,res) {
	Comic.remove({_id : ObjectId(req.params.comicId)}, (err,rmvComic) => {
		if(err){
			res.status(500).send(err)
		}else{
			res.send(rmvComic)
		}
	})
}

function update(req,res) {
	Comic.findOneAndUpdate(
		{_id : ObjectId(req.params.comicId)},
		req.body,
		function (err,updatedComic){
			if(err){
				res.status(500).send(err)
			}else{
				res.send(updatedComic);
			}
		})
}

module.exports = {
	create,
	findAll,
	destroy,
	update,
	findOneComic
}


