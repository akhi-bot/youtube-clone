import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getVideosBySearch } from "../redux/actions/videos.action";
import VideoHorizontal from "../components/videoHorizontal/VideoHorizontal";
import Skeleton,{ SkeletonTheme} from "react-loading-skeleton";

const SearchScreen = () => {
  const { query } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  const { videos, loading } = useSelector((state) => state.searchVideos);
  return (
    <Container>
      {!loading ? (
        videos.map((video) => (
          <VideoHorizontal key={video.id.videoId} video={video} searchScreen />
        ))
      ) : (
        <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height={160} count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;
