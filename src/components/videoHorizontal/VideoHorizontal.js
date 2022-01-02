import React, { useEffect, useState } from "react";
import "./_videoHorizontal.scss";
import { AiFillEye } from "react-icons/ai";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import request from "../../api ";
import { useHistory } from "react-router";

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      publishedAt,
      description,
      title,
      thumbnails: { medium },
      resourceId
    },
  } = video;

  const isVideo = !(id.kind === "youtube#channel"||subScreen );
  const seconds = moment.duration(duration).asSeconds();
  let _duration = moment.utc(seconds * 1000).format("HH:mm: ss");
  if(_duration.slice(0,2) === '00') {
    _duration = _duration.slice(-6)
  }
  const _channelId = resourceId?.channelId|| channelId;

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails, statistics",
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    if (isVideo) {
      get_video_details();
    }
  }, [id, isVideo]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.medium?.url);
    };
    get_channel_icon();
  }, [channelId]);

  const history = useHistory();

  const handleClick = () => {
    isVideo
      ? history.push(`/watch/${id.videoId}`)
      : history.push(`/channel/${_channelId}`);
  };

  const thumbnails = isVideo
    ? "videoHorizontal__thumbnail"
    : "videoHorizontal__thumbnail__channel";

  return (
    <Row
      className="videoHorizontal m-1 py-2 align-items-center"
      onClick={handleClick}
    >
      <Col
        xs={6}
        md={searchScreen || subScreen ? 4 : 6}
        className="videoHorizontal__left p-0"
      >
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={thumbnails}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />

        {isVideo && (
          <span className="videoHorizontal__duration ">{_duration}</span>
        )}
      </Col>

      <Col
        xs={6}
        md={searchScreen || subScreen ? 8 : 6}
        className="videoHorizontal__right ps-2"
      >
        <p className="videoHorizontal__title mb-1">{title}</p>

        {isVideo && (
          <div className="videoHorizontal__details">
            <AiFillEye /> {numeral(views).format("0.a")} views •
            {moment(publishedAt).fromNow()}
          </div>
        )}

        {(searchScreen|| subScreen) && <p className="mt-1 videoHorizontal__desc">{description}</p>}

        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          {isVideo && <LazyLoadImage src={channelIcon} effect="blur" />}
          <p className="mb-0">{channelTitle}</p>
        </div>
        {subScreen &&<p className="mt-2"> {video.contentDetails.totalItemCount} {' '} Videos</p>}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
