import React from "react";
import "./Profile.css";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import DateRangeIcon from "@material-ui/icons/DateRange";
import WcIcon from "@material-ui/icons/Wc";
import PhoneIcon from "@material-ui/icons/Phone";



    const StaticProfile = (props) => {
        const {
          profile: { handle, createdAt, imageUrl, gender, phone, website, location }} = props;
  
    return (        
        <div className="profile-card">
          <div className="image-container">
            <img alt="" src={imageUrl} />

          </div>

          <div className="title">
            <h2 component={Link} to={`/users/${handle}`}>
              @ {handle}
            </h2>
          </div>
          <div className="main-container">
            <div className="profile-wrapper">
              <div className="left">
                {" "}
                <LocationOnIcon className="info" />
              </div>
              <div className="right">{location}</div>
            </div>

            <div className="profile-wrapper">
              <div className="left">
                {" "}
                <LinkIcon className="info" />
              </div>
              <div className="right">
                {" "}
                <a href={website}>
                  {website}{" "}
                </a>
              </div>
            </div>

            <div className="profile-wrapper">
              <div className="left">
                {" "}
                <WcIcon className="info" />
              </div>
              <div className="right"> {gender}</div>
            </div>

            <div className="profile-wrapper">
              <div className="left">
                <PhoneIcon className="info" />
              </div>
              <div className="right">{phone}</div>
            </div>

            <div className="profile-wrapper">
              <div className="left">
                {" "}
                <DateRangeIcon className="info" />
              </div>
              <div className="right">
                {" "}
                Joined {dayjs(createdAt).format("MMM, YYYY")}
              </div>
            </div>
          </div>
        </div>
    
    )
};
StaticProfile.propsTypes = {
  profile: PropTypes.object.isRequired,
};

export default StaticProfile;
