const  Comment = require('../model/comment.js');


exports.newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


exports.getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        console.log(error);
        response.status(500).json(error)
    }
}

exports.deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findByIdAndDelete(request.params.id);
        if (!comment) {
            return response.status(404).json({ msg: "Post not found" });
        }
        response.status(200).json('comment deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}