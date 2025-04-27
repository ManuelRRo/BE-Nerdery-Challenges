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
  const users = await mocked_api.getUsers();
  const likeMovies = await mocked_api.getLikedMovies();
  const dislikeMovies = await mocked_api.getDislikedMovies();

  const dislikesMap = new Map(
    dislikeMovies.map(element => [element.userId, element.movies.length])
  );

  const likesMap = new Map(
    likeMovies.map(element => [element.userId, element.movies.length])
  );

  const subscriptionPromises = [];

  for (const user of users) {
    if (dislikesMap.get(user.id) > likesMap.get(user.id)) {
      subscriptionPromises.push(mocked_api.getUserSubscriptionByUserId(user.id));
    }
  }

  const subscriptionResults = await Promise.all(subscriptionPromises);

  const subscriptionCounts = subscriptionResults.reduce((acc, { subscription }) => {
    acc[subscription] = (acc[subscription] || 0) + 1;
    return acc;
  }, {});
  
  let maxSubscription = null;
  let maxCount = -1;
  
  for (const [subscriptionType, count] of Object.entries(subscriptionCounts)) {
    if (count > maxCount) {
      maxCount = count;
      maxSubscription = subscriptionType;
    }
  }
  
  return maxSubscription;

};

getCommonDislikedSubscription().then((subscription) => {
  console.log("Common more dislike subscription is:", subscription);
});
