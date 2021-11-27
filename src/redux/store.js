import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import {
  homeVideoReducer,
  relatedVideosReducer,
  selectedVideoReducer,
  searchVideosReducer,
  subscriptionChannelReducer,
  channelVideosReducer
} from "./reducers/video.reducer";
import { channelVideoReducer } from "./reducers/channel.reducer";
import { commentListReducer } from "./reducers/comments.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideoReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelVideoReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideosReducer,
  searchVideos: searchVideosReducer,
  subscriptionChannel: subscriptionChannelReducer,
  channelVideos: channelVideosReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
