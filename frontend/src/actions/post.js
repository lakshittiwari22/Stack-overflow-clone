import * as api from "../api";

export const CreatePublicPost = (postData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createPost(postData);
    dispatch({ type: "POST_PUBLIC_POST", payload: data });
    dispatch(FetchAllPosts());
    navigate("/social");
  } catch (error) {
    console.log(error);
  }
};

export const FetchAllPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getAllPosts();

    dispatch({ type: "FETCH_ALL_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(id);
    dispatch(FetchAllPosts());
    navigate("/social");
  } catch (error) {
    console.log(error);
  }
};

export const LikePublicPost =
  (id, userId, userLiked, postProfileId) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id, userId, userLiked, postProfileId);
      dispatch(FetchAllPosts());
    } catch (error) {
      console.log(error);
    }
  };

export const postComment =
  (id, commentBody, noOfComments, userCommented, userId, postProfileId) =>
  async (dispatch) => {
    try {
      const { data } = await api.postComment(
        id,
        commentBody,
        noOfComments,
        userCommented,
        userId,
        postProfileId
      );
      dispatch({ type: "POST_COMMENT", payload: data });
      dispatch(FetchAllPosts());
    } catch (error) {
      console.log(error);
    }
  };

export const deleteComment =
  (id, commentId, noOfComments) => async (dispatch) => {
    try {
      const { data } = await api.deleteComment(id, commentId, noOfComments);
      dispatch(FetchAllPosts());
    } catch (error) {
      console.log(error);
    }
  };
