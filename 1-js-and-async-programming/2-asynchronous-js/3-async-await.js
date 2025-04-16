/*

  Challenge 3: Most Common Subscription for Harsh Reviewers

  Find the most common subscription among users who dislike more movies than they like.
  Use the methods in utils/mocked-api to get user and rating data.
  Check each user's likes vs. dislikes, filter those with more dislikes, and return the most frequent subscription.

  Requesites:
    - Use await with the methods from utils/mocked-api to get the data
    - Make sure to return a string containing the name of the most common subscription
*/

/**
 * Logs the most common subscription among users
 * who disliked more movies than they liked.
 *
 * @returns {Promise<string>} Logs the subscription name as a string.
 */
const mocked_api = require("./utils/mocked-api");
const getCommonDislikedSubscription = async () => {
  // Add your code here
  const userPromise = mocked_api.getUsers();
  const likeMoviesPromise = mocked_api.getLikedMovies();
  const dislikeMoviesPromise = mocked_api.getDislikedMovies();

  // async function subscriptionByUser(id_user) {

  //   let user_promise = await mocked_api.getUserSubscriptionByUserId(id_user);

  //   console.log("funcion"+typeof(user_promise));

  //   return user_promise.subscription;
  // }

  const [users,likes,dislikes] = await Promise.all([
    userPromise,
    likeMoviesPromise,
    dislikeMoviesPromise
  ]);
  //console.log(users,likes,dislikes,subscriptionByUser);

  dislikesMap = new Map();
  dislikes.forEach((element) => {
    dislikesMap.set(element.userId, element.movies.length);
  });

  const likesMap = new Map();
  likes.forEach(element => {
    likesMap.set(element.userId, element.movies.length);
  });

  let basicCount=0,premiumCount=0;
  for (const user of users) {
    if (dislikesMap.get(user.id) > likesMap.get(user.id)) {
      const value = await mocked_api.getUserSubscriptionByUserId(user.id);
      if(value.subscription === "Basic"){
        basicCount++;
      }else{
        premiumCount++;
      }
    }
  }
  
  if(basicCount > premiumCount){
    return "Basic"
  }else{
    return "Premium"
  }


};

getCommonDislikedSubscription().then((subscription) => {
  console.log("Common more dislike subscription is:", subscription);
});
