const grid = require('gridfs-stream');
const mongoose = require('mongoose');

const url = 'http://localhost:3000' ;

let gfs,gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () =>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName : 'fs'
    });
    gfs= grid(conn.db , mongoose.mongo);
    gfs.collection('fs');
}); 

exports.uploadImage = (req,res) =>{
    if(!req.file) {
        return res.status(404).json({msg: "file not found"});
    }

    const imageUrl =`${url}/file/${req.file.filename}`;
    return res.status(200).json(imageUrl);
}

exports.getImage = async(req,res) =>{
    try{
        const file =await gfs.files.findOne({filename: req.params.filename});
        const readstream = gridfsBucket.openDownloadStream(file._id);
        readstream.pipe(res);
    } catch(error){
        return res.status(500).json({msg:error.message});
    }
}

