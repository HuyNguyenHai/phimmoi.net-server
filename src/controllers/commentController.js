import {comment} from "../services";

let getMovieComments = async (req, res, next) => {
    let movieId = req.params.movieId;

    try {
        let comments = await comment.getMovieComments(movieId);
        if(!comments) {
            return res.status(500).send("Server Error!!!");
        } else {
            return res.status(200).send(comments);
        }
    } catch (error) {
        console.log(error);
    }
}

let addNewComment = async (req, res, next) => {
    let movieId = req.body.movieId;
    let userId = req.body.userId;
    let commentContent = req.body.commentContent;
    
    let result = await comment.addNewComment(movieId, userId, commentContent);

    if (!result) {
        return res.status(500).send("Server Error!!!");
    } else {
        return res.status(200).send("Succeed!!!");
    }
}

module.exports = {
    getMovieComments: getMovieComments,
    addNewComment: addNewComment
}