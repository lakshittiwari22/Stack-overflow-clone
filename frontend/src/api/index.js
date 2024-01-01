// || "https://stack-overflow-clone-server-ebfz.onrender.com"

// "http://localhost:5000"

import axios from "axios";

const API = axios.create({
  baseURL:"http://localhost:5000",
});

// sending users token  for each and every request to the database(backend)
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);

export const signUp = (authData) => API.post("/user/signup", authData);
export const signUpGoogle = (accessToken) =>
  API.post("/user/signupgoogle", { googleAccessToken: accessToken });

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId,userQuestioned, userQuestionedId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
    userQuestioned,
    userQuestionedId
  });

export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const createPost = (postData) => API.post("/social/Create", postData);

export const getAllPosts = () => API.get("/social/getAllposts");

export const deletePost = (id) => API.delete(`/social/delete/${id}`);

export const likePost = (id, userId) =>
  API.patch("/social/like", { id, userId });

export const postComment = (
  id,
  commentBody,
  noOfComments,
  userCommented,
  userId
) =>
  API.patch("/comment/post", {
    id,
    commentBody,
    noOfComments,
    userCommented,
    userId,
  });

  export const deleteComment = (id, commentId, noOfComments) =>
  API.patch(`/comment/delete/${id}`, { commentId, noOfComments });
