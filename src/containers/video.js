import React from 'react'
import { withRouteData } from 'react-static'
//
import Wrapper from './partials/wrapper';
import CONST from '../constants';
import CustomVideo from './partials/custom_video';


class Video extends React.Component {
  render() {
    const { data } = this.props;

    const fullPath = window.location.href
    const iHash = fullPath.lastIndexOf("#")
    const iEnd = fullPath.length
    const option = fullPath.substring(iHash+1)

    {/*console.log(option)*/}

    var myVideo = CONST.tutorialVideos.java
    var title = "Title"
    var summary = "Summary"
    var intro = "Intro"
    var detail = "Detail"

    switch(option) {
    case "android":
      title = data.video.android.title
      summary = data.video.android.summary
      intro = data.video.android.caption.intro
      detail = data.video.android.caption.detail
      myVideo = CONST.tutorialVideos.java
      break;
    case "dotnet":
      title = data.video.dotnet.title
      summary = data.video.dotnet.summary
      intro = data.video.dotnet.caption.intro
      detail = data.video.dotnet.caption.detail
      myVideo = CONST.tutorialVideos.dotnet
      break;
    case "xamarin":
      title = data.video.xamarin.title
      summary = data.video.xamarin.summary
      intro = data.video.xamarin.caption.intro
      detail = data.video.xamarin.caption.detail
      myVideo = CONST.tutorialVideos.xamarin
      break;
    case "nodejs":
      title = data.video.nodejs.title
      summary = data.video.nodejs.summary
      intro = data.video.nodejs.caption.intro
      detail = data.video.nodejs.caption.detail
      myVideo = CONST.tutorialVideos.nodejs
      break;
    case "web":
      title = data.video.web.title
      summary = data.video.web.summary
      intro = data.video.web.caption.intro
      detail = data.video.web.caption.detail
      myVideo = CONST.tutorialVideos.web
      break;
    default:
      // code block
    }

    return (

    <section className="page">
      {/*
      <div className="header">
        <h1>{title}</h1>
        <p>{summary}</p>
      </div>
      */}
      <div className="content">
        <div className="vid-container">
          <div className="custom-video">
            <CustomVideo links={myVideo}/>
          </div>
        </div>
      </div>
    </section>
    )
  }
}

export default withRouteData(({ data }) => (
  Wrapper(Video,  data)
))
