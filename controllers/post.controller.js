const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const createPost = async(req, res) => {
    const user = req.user;
    const body = req.body;
    try {
        // create a post
        const newPost = new postModel({ ...body, creator: user });
        const savedPost = await newPost.save();
        // modify the user's account
        const getUser = await userModel.findById(user)
        const allPostIds = getUser.posts;
        allPostIds.push(savedPost.id);
        await userModel.findByIdAndUpdate(user, {posts: allPostIds}, {new: true});
        res.status(200).json({message: "post created successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
};


const getAllPosts = async(req, res) => {
    try {
        const allPosts = await postModel
        .find()
        .select("projectTitle desc projectPreview -_id")
        .populate({path: "creator", select: "name email -_id"});
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).send("something went wrong");
    }
};

const getOnePost = async(req, res) => {
    const {id} = req.params;
    try {
        const onePost = await postModel.findById(id).populate("creator");
        res.status(200).json(onePost);
    } catch (error) {
        res.status(500).send("something went wrong");
    }
};

const deletePost = async(req, res) => {
    const user = req.user;
    const { id } = req.params;
    try {
        // get the post
        const post = await postModel.findById(id);
        // check if post exists, if not send error to user
        if (!post) {
            return res.status(404).send("Post not found");
        }
        // check if the creatorId of the post matches the creatorId passed in the body
        if (post.creator.toString() !== user) {
            return res.status(403).send("Unauthorized to delete this post");
        }

        // update the userModel posts array
        const userDoc = await userModel.findById(user);

        if (!userDoc || !userDoc.posts) {
            return res.status(404).json({ message: "User not found or posts array missing" });
        }

        userDoc.posts = userDoc.posts.filter(postId => postId.toString() !== id);
        await userDoc.save();
        

        await postModel.findByIdAndDelete(id);
        return res.status(200).send("Post deleted successfully");
    } catch (error) {
        return res.status(500).send("something went wrong");
    }
};

const updatePost = async(req, res) => {
    const user = req.user;
    const {id} = req.params;
    const { id: postId, ...others} = req.body;
    try {
        // check if the post exists
        const post = await postModel.findById(id);
        if (!post) {
            return res.send("This post does not exist");
        }
        // check if user is the owner of the post, if not send an error
        if (post.creator.toString() !==  user) {
            return res.status(403).send("Unauthorized to update this post");
        }
        await postModel.findByIdAndUpdate(id, {...others}, {new: true});
        res.status(200).send("Post updated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
};

module.exports = { createPost, getAllPosts, getOnePost, deletePost, updatePost};