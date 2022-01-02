import request from "../../api ";
import {
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  SELECTED_VIDEOS_REQUEST,
  SELECTED_VIDEOS_FAIL,
  SELECTED_VIDEOS_SUCCESS,
  RELATED_VIDEOS_REQUEST,
  RELATED_VIDEOS_SUCCESS,
  RELATED_VIDEOS_FAIL,
  SEARCHED_VIDEOS_REQUEST,
  SEARCHED_VIDEOS_SUCCESS,
  SEARCHED_VIDEOS_FAIL,
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
  SUBSCRIPTIONS_CHANNEL_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
  CHANNEL_VIDEOS_FAIL,
} from "../actionsTypes";

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        reginCode: "US",
        maxResults: "20",
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: HOME_VIDEOS_FAIL, payload: error.message });
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: "20",
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: "video",
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    dispatch({ type: HOME_VIDEOS_FAIL, payload: error.message });
  }
};

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({ type: SELECTED_VIDEOS_REQUEST });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics ",
        id: id,
      },
    });

    dispatch({
      type: SELECTED_VIDEOS_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    dispatch({
      type: SELECTED_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({ type: RELATED_VIDEOS_REQUEST });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });

    dispatch({
      type: RELATED_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: RELATED_VIDEOS_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const getVideosBySearch = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCHED_VIDEOS_REQUEST,
    });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: "20",
        q: keyword,
        type: "video channel",
      },
    });

    dispatch({
      type: SEARCHED_VIDEOS_SUCCESS,
      payload: data.items
    });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: SEARCHED_VIDEOS_FAIL, payload: error.message });
  }
};


export const getSubscribedChannels =  () => async (dispatch, getState) => {
  try {
    dispatch({type: SUBSCRIPTIONS_CHANNEL_REQUEST})
    const {data} = await request("/subscriptions", {
      params: {
        part: "snippet, contentDetails",
        maxResults: 15,
        mine: true
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      }
    });
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
      payload: data.items
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_FAIL,
      payload: error.message
    });
  }
};



export const getVideosByChannel =  (id) => async (dispatch) => {
  try {

    dispatch({type: CHANNEL_VIDEOS_REQUEST})

    //1. get upload playlist id
    const {data: {items}} = await request("/channels", {
      params: {
        part: "contentDetails",
        id: id    
      },
    });

    const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads

    //2. get the videos using the id
    const {data} = await request("/playlistItems", {
      params: {
        part: "contentDetails, snippet",
        playlistId: uploadPlaylistId,
        maxResults: 20
      },
     
    });


    dispatch({
      type: CHANNEL_VIDEOS_SUCCESS,
      payload: data.items
    });
  } catch (error) {
    console.log(error.message)
    dispatch({
      type: CHANNEL_VIDEOS_FAIL,
      payload: error.message
    });
  }
};
