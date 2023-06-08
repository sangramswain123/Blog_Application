const express = require('express');
const router = express.Router();

const upload = require('../utils/upload.js');

const user = require('../controller/user-controller.js');
const admin = require('../controller/admin-controller.js');
const image = require('../controller/image-controller.js');
const post = require('../controller/post-controller.js');
const authenticate = require('../controller/jwt-controller.js');
const comment = require('../controller/comment-controller.js');

router.post('/signup',user.signupUser );
router.post('/login',user.loginUser );
router.post('/adminsignup',admin.signupAdmin );
router.post('/adminlogin',admin.loginAdmin );

router.post('/file/upload',upload.single('file'), image.uploadImage);
router.get('/file/:filename',image.getImage);

router.post('/create', authenticate.authenticateToken ,post.createPost); 
router.put('/update/:id', authenticate.authenticateToken, post.updatePost);
router.delete('/delete/:id', authenticate.authenticateToken, post.deletePost);
router.get('/post/:id', authenticate.authenticateToken, post.getPost);
router.get('/posts', authenticate.authenticateToken, post.getAllPosts);
router.get('/postsAll', post.getAllPosts);
router.get('/viewpost/:id', post.getPost);


router.post('/comment/new', authenticate.authenticateToken, comment.newComment);
router.get('/comments/:id', authenticate.authenticateToken, comment.getComments);
router.delete('/comment/delete/:id', authenticate.authenticateToken, comment.deleteComment);


module.exports = router;