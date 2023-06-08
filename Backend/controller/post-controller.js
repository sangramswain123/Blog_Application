const Post = require("../model/post.js");


exports.createPost = async(req,res) =>{
    try{
        const post = await new Post(req.body);
        post.save();

        return res.status(200).json('post saved sucessfuly');
    } catch (error){
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

exports.deletePost = async (request, response) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(request.params.id);
        
        if (!deletedPost) {
            return response.status(404).json({ msg: "Post not found" });
        }

        response.status(200).json('post deleted successfully');
    } catch (error) {
        console.log(error);
        response.status(500).json('something error occur')
    }
}

exports.getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

exports.getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    console.log("inside post");
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}
