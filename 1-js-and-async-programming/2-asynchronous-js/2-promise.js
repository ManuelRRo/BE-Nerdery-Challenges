/*
  Challenge 2: Users Who Dislike More Movies Than They Like

  Get a list of users who have rated more movies negatively than positively.

  Use the methods in utils/mocked-api to retrieve user and rating data.
  Check how many movies each user liked and disliked, then return only those with more dislikes.

  Requirements:
  - Use only Promise static methods (e.g., Promise.all, Promise.then, etc.) to handle the results
  - Only print the user information in the output—no extra text or formatting

 */

/**
 * @typedef {Object} User
 * @property {number} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {number} age - The age of the user.
 */

/**
 * Logs and returns the users who dislike more movies than they like.
 *
 * @returns {Promise<User[]>} A promise that resolves to an array of users who dislike more movies than they like.
 */
const mocked_api = require("./utils/mocked-api");

const getUsersWithMoreDislikedMoviesThanLikedMovies = () => {
  // Add your code here
  const likedMovies = mocked_api.getLikedMovies().
    then((likeMovies) => {
      const likes = new Map(
        likeMovies.map(likes => {
          return [likes.userId, likes.movies.length];
        })
      );
      return likes;
    });

  const dislikeMovies = mocked_api.getDislikedMovies().
    then((dislikeMovies) => {
      const dislikes = new Map(
        dislikeMovies.map(dislike => {
          return [dislike.userId, dislike.movies.length]
        })
      );
      return dislikes;
    });

  return Promise.all([likedMovies, dislikeMovies, mocked_api.getUsers()]).then(
    function ([likes, dislikes, users]) {

      const userInfo = users.filter(user => dislikes.get(user.id) > likes.get(user.id));

      return userInfo;
    });

};

getUsersWithMoreDislikedMoviesThanLikedMovies().then((users) => {
  console.log("Users with more disliked movies than liked movies:");

  users.forEach((user) => {
    console.log(user);
  });
});

