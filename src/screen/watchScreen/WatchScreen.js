import React, { useEffect } from "react";
import "./_watchScreen.scss";
import { Row, Col } from "react-bootstrap";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import Comments from "../../components/comments/Comments";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/videos.action";
import Skeleton,{ SkeletonTheme} from "react-loading-skeleton";


const WatchScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { videos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );
  const { video, loading } = useSelector((state) => state.selectedVideo);

  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h6>Loading...</h6>
        )}
        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>

      <Col lg={4}>
        {!relatedVideosLoading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal key={video.id.videoId} video={video} />
            ))
        ) : (
          <SkeletonTheme  baseColor="#343a40" highlightColor="#3c4147">
            <Skeleton width='100%' height={130} count={15}/>
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
