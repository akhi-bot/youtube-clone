import React from "react";
import {Helmet} from 'react-helmet'

const HelmetCustom = ({
  title = "You tube using Youtube",
  description = "A project made with youtube api and react js",
}) => {
  return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property='og:locale' content='en_Us'/>
        <meta property='og:type' content='website'/>
        <meta property='og:title' content={title}/>
        <meta property='og:description' content={description}/>
      </Helmet>
  )
};

export default HelmetCustom;
