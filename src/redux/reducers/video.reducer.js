import {
  CHANNEL_VIDEOS_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  RELATED_VIDEOS_FAIL,
  RELATED_VIDEOS_REQUEST,
  RELATED_VIDEOS_SUCCESS,
  SEARCHED_VIDEOS_FAIL,
  SEARCHED_VIDEOS_REQUEST,
  SEARCHED_VIDEOS_SUCCESS,
  SELECTED_VIDEOS_FAIL,
  SELECTED_VIDEOS_REQUEST,
  SELECTED_VIDEOS_SUCCESS,
  SUBSCRIPTIONS_CHANNEL_FAIL,
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
} from "../actionsTypes";

export const homeVideoReducer = (
  state = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: "All",
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case HOME_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        videos:
          state.activeCategory === payload.category
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        loading: false,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
      };

    case HOME_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const selectedVideoReducer = (
  state = {
    loading: true,
    video: null,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SELECTED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SELECTED_VIDEOS_SUCCESS:
      return {
        ...state,
        video: payload,
        loading: false,
      };
    case SELECTED_VIDEOS_FAIL:
      return {
        ...state,
        video: null,
        loading: false,
        error: payload,
      };

    default:
    return state;
  }
};


export const relatedVideosReducer = (
  state = {
    loading: true,
    videos: null,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case RELATED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case RELATED_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case RELATED_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
    return state;
  }
};


export const searchVideosReducer = (
  state = {
    loading: true,
    videos: null,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCHED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCHED_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case SEARCHED_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
    return state;
  }
};

export const subscriptionChannelReducer = (
  state = {
    loading: true,
    videos: null,
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SUBSCRIPTIONS_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true
      }

      case SUBSCRIPTIONS_CHANNEL_SUCCESS:
        return {
          ...state,
          videos: payload,
          loading: false,
        };
      case SUBSCRIPTIONS_CHANNEL_FAIL:
        return {
          ...state,
          loading: false,
          error: payload,
        };

    default:
    return state;
  }
};


export const channelVideosReducer = (
  state = {
    loading: true,
    videos: [],
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CHANNEL_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true
      }

      case CHANNEL_VIDEOS_SUCCESS:
        return {
          ...state,
          videos: payload,
          loading: false,
        };
      case CHANNEL_VIDEOS_FAIL:
        return {
          ...state,
          loading: false,
          error: payload,
        };

    default:
    return state;
  }
};