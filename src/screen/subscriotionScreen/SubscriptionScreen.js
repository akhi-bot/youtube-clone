import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import { getSubscribedChannels } from "../../redux/actions/videos.action";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

const SubscriptionScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscribedChannels());

  }, [dispatch]);

  const { videos, loading } = useSelector((state) => state.subscriptionChannel);

  return (
    <Container fluid>
      {!loading ? (
        videos?.map((video) => <VideoHorizontal video={video} key={video.id} subScreen/>)
      ) : (
        <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height={160} count={20} />
        </SkeletonTheme>
      )}
    </Container>
  )
};

export default SubscriptionScreen;
