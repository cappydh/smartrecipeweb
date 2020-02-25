import _ from "lodash";
import recipes from "../../apis/recipes";
import {
  FOLLOW_USER,
  FETCH_FOLLOWS,
  UNFOLLOW_USER,
  IS_FOLLOWING,
  FOLLOW_NUMBERS,
  FETCH_FOLLOWERS,
  FETCH_FOLLOWINGS
} from "./types/followTypes";
import { FETCH_USER } from "./types/userTypes";

export const followUser = (followerId, followedId) => async dispatch => {
  const response = await recipes.post("/follows", {
    followerId,
    followedId: parseInt(followedId)
  });

  dispatch({ type: FOLLOW_USER, payload: response.data });
};

export const unfollowUser = (followerId, followedId) => async dispatch => {
  const followResponse = await recipes.get(
    `/follows?followerId=${followerId}&followedId=${parseInt(followedId)}`
  );

  const response = await recipes.delete(
    `/follows/${followResponse.data[0].id}`
  );

  dispatch({ type: UNFOLLOW_USER, payload: response.data });
};

export const fetchFollows = id => async dispatch => {
  const response = await recipes.get(`/follows?followerId=${id}`);

  dispatch({ type: FETCH_FOLLOWS, payload: response.data });
};

export const isFollowing = (followerId, followedId) => async dispatch => {
  const response = await recipes.get(
    `/follows?followerId=${followerId}&followedId=${parseInt(followedId)}`
  );

  dispatch({ type: IS_FOLLOWING, payload: response.data });
};

export const followNumbers = id => async dispatch => {
  const followerNumber = await recipes.get(`/follows?followedId=${id}`);
  const followingNumber = await recipes.get(`/follows?followerId=${id}`);

  dispatch({
    type: FOLLOW_NUMBERS,
    payload: followerNumber.data.length,
    payload2: followingNumber.data.length
  });
};

export const fetchUser = id => async dispatch => {
  const response = await recipes.get(`/users?id=${id}`);

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchFollowers = id => async dispatch => {
  const response = await recipes.get(`/follows?followedId=${id}`);
  response.data.map(data => dispatch(fetchUser(data.followerId)));

  dispatch({ type: FETCH_FOLLOWERS, payload: response.data });
};

export const fetchFollowings = id => async dispatch => {
  const response = await recipes.get(`/follows?followerId=${id}`);
  response.data.map(data => dispatch(fetchUser(data.followedId)));

  dispatch({ type: FETCH_FOLLOWINGS, payload: response.data });
};
