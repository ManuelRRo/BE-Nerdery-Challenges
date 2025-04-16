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
  //return [];
  const likedMovies = mocked_api.getLikedMovies().
    then((likeMovies) => {
      const likes = new Map();
      likeMovies.forEach(element => {
        likes.set(element.userId, element.movies.length);
      });

      return likes;
    });

  const dislikeMovies = mocked_api.getDislikedMovies().
    then((dislike) => {
      dislikes = new Map();
      dislike.forEach((element) => {
        dislikes.set(element.userId, element.movies.length);
      });

      return dislikes;
    });

  return new Promise(function (resolve) {
    //getting values
    //userList is an array of objects
    const userInformation = new Map();
    // const userList = mocked_api.getUsers().
    //   then((users) => {
        const allLikesAndDislikes = Promise.all([likedMovies, dislikeMovies, mocked_api.getUsers()]);
        
        allLikesAndDislikes.then(function ([likes, dislikes, users]) {

          users.forEach(user => {
            //console.log(dislikes.get(user.id) > likes.get(user.id));
            if (dislikes.get(user.id) > likes.get(user.id)){
              // console.log("------------------------------------------");
              // console.log(dislikes.get(user.id) > likes.get(user.id));
              userInformation.set(user.userId,user);
              console.log("userINformation",user)
            }
          });
        });
        
      // });

    resolve(userInformation);
  });
};

getUsersWithMoreDislikedMoviesThanLikedMovies().then((users) => {
  console.log("Users with more disliked movies than liked movies:");

  users.forEach((user) => {
    console.log(user);
  });
});
