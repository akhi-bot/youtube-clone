import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'
import "./_video.scss";
import { AiFillEye } from "react-icons/ai";
import request from "../../api ";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Video = ({ video, channelScreen }) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null)

  const seconds = moment.duration(duration).asSeconds();
  let _duration = moment.utc(seconds * 1000).format("HH:mm: ss");
  if(_duration.slice(0,2) === '00') {
    _duration = _duration.slice(-6)
    
  }
  const {
    id,
    snippet: {
      title,
      channelId,
      channelTitle,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails
  } = video;

  const history = useHistory()

const videoId = id?.videoId||contentDetails?.videoId || id

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails, statistics",
          id: videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount)
    };
    get_video_details();
  }, [videoId]);

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
      setChannelIcon(items[0].snippet.thumbnails.medium?.url)
    };
    get_channel_icon();
  }, [channelId]);

  const handleVideoClick = () => {
      history.push(`/watch/${videoId}`)
  }

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        {/* <img src={medium.url} alt="" /> */}
        <LazyLoadImage src={medium.url} effect='blur'/>
        <span className='video__top__duration'>{_duration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} views •
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      {!channelScreen &&
      <div className="video__channel">
        {/* <img src={channelIcon} alt="" /> */}
        <LazyLoadImage src={channelIcon} effect='blur'/>
        <p>{channelTitle}</p>
      </div>
      }
    </div>
  );
};

export default Video;
