import { useState, useEffect, Fragment } from "react";
import NumberFormat from "react-number-format";
import "./ProfileCard.css";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import StackOverflowLogo from "../../images/logo-stackoverflow.png";
import { Alert, Collapse, Snackbar, Typography } from "@mui/material";

const ProfileCardMax = ({ userData, config, gradient }) => (
    <a href={userData.link} className="CardLink" target="blank">
        <div className="ProfileCardLarge">
            <div className="CardTop" style={{ background: gradient }}>
                <div
                    className="DisplayPicture"
                    style={{
                        backgroundImage: `url(${userData.profile_image})`
                    }}
                />

                <p className="ProfileName" style={{ color: config.textColor }}>
                    {userData?.display_name.toUpperCase()}
                </p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="waves"
                    preserveAspectRatio="xMaxYMin meet"
                    viewBox="0 24 150 28"
                >
                    <defs>
                        <path
                            id="gentle-wave"
                            d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 22 h -352 z"
                        />
                    </defs>
                    <g className="parallax">
                        <use
                            x="48"
                            fill="rgba(255,255,255,0.6)"
                            xlinkHref="#gentle-wave"
                        />
                        <use
                            x="48"
                            y="2"
                            fill="rgba(255,255,255,0.4)"
                            xlinkHref="#gentle-wave"
                        />
                        <use
                            x="48"
                            y="4"
                            fill="rgba(255,255,255,0.2)"
                            xlinkHref="#gentle-wave"
                        />
                        <use
                            x="48"
                            y="6"
                            fill="#fff"
                            xlinkHref="#gentle-wave"
                        />
                    </g>
                </svg>
            </div>
            <div className="CardBottom">
                <p className="Reputation">
                    <img
                        src={StackOverflowLogo}
                        width="130"
                        alt="StackOverflow Logo"
                    />
                    <span
                        className="ReputationContent"
                        style={{
                            backgroundImage: gradient,
                            filter:
                                config.textColor === "#000000"
                                    ? "drop-shadow(1px 1px 1px #333)"
                                    : "none"
                        }}
                    >
                        <NumberFormat
                            value={userData.reputation}
                            displayType={"text"}
                            thousandSeparator={true}
                        />
                    </span>
                    <Typography variant="caption" display="block" gutterBottom>
                        REPUTATION
                    </Typography>
                </p>
                <div className="Medals">
                    <div className="Medal">
                        <div className="MedalCircle MedalCircleGold">
                            <span>{userData.badge_counts.gold}</span>
                        </div>
                        <div className="MedalRibbon MedalRibbonLeft"/>
                        <div className="MedalRibbon MedalRibbonRight"/>
                    </div>
                    <div className="Medal">
                        <div className="MedalCircle MedalCircleSilver">
                            <span>{userData.badge_counts.silver}</span>
                        </div>
                        <div className="MedalRibbon MedalRibbonLeft"/>
                        <div className="MedalRibbon MedalRibbonRight"/>
                    </div>
                    <div className="Medal">
                        <div className="MedalCircle MedalCircleBronze">
                            <span>{userData.badge_counts.bronze}</span>
                        </div>
                        <div className="MedalRibbon MedalRibbonLeft"/>
                        <div className="MedalRibbon MedalRibbonRight"/>
                    </div>
                </div>
            </div>
        </div>
    </a>
);

const ProfileCardMini = ({ userData, config, gradient }) => (
    <a href={userData.link} className="CardLink" target="blank">
        <div className="ProfileCardMini">
            <div className="CardLeftNoInset" style={{ background: gradient }}>
                <div
                    className="DisplayPicture"
                    style={{
                        backgroundImage: `url(${userData.profile_image})`
                    }}
                />
                <p className="ProfileName" style={{ color: config.textColor }}>
                    {userData?.display_name.toUpperCase()}
                </p>
            </div>
            <div className="CardRight">
                <p className="Reputation">
                    <img
                        src={StackOverflowLogo}
                        width="130"
                        alt="StackOverflow Logo"
                    />
                    <span
                        className="ReputationContent"
                        style={{
                            backgroundImage: gradient,
                            filter:
                                config.textColor === "#000000"
                                    ? "drop-shadow(1px 1px 1px #333)"
                                    : "none"
                        }}
                    >
                        <NumberFormat
                            value={userData.reputation}
                            displayType={"text"}
                            thousandSeparator={true}
                        />
                    </span>
                    <Typography variant="caption" display="block" gutterBottom>
                        REPUTATION
                    </Typography>
                </p>
                <div className="Medals">
                    <div className="Medal">
                        <div className="MedalCircle MedalCircleGold">
                            <span>{userData.badge_counts.gold}</span>
                        </div>
                        <div className="MedalRibbon MedalRibbonLeft"/>
                        <div className="MedalRibbon MedalRibbonRight"/>
                    </div>
                    <div className="Medal">
                        <div className="MedalCircle MedalCircleSilver">
                            <span>{userData.badge_counts.silver}</span>
                        </div>
                        <div className="MedalRibbon MedalRibbonLeft"/>
                        <div className="MedalRibbon MedalRibbonRight"/>
                    </div>
                    <div className="Medal">
                        <div className="MedalCircle MedalCircleBronze">
                            <span>{userData.badge_counts.bronze}</span>
                        </div>
                        <div className="MedalRibbon MedalRibbonLeft"/>
                        <div className="MedalRibbon MedalRibbonRight"/>
                    </div>
                </div>
            </div>
        </div>
    </a>
);

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ProfileCard = ({ userId, config }) => {
    const query = useQuery();
    if (query.has("gradient")) {
        config.gradient = query.get("gradient").split(",");
    }
    if (query.has("size")) {
        config.size = query.get("size");
    }
    const [userData, setUserData] = useState(null);
    const { userQueryId } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const gradient = `linear-gradient(45deg, ${config.gradient.join(", ")})`;

    const getUserData = (userId) => {
        const apiEndpoint = `https://api.stackexchange.com/2.2/users/${userId}?order=desc&sort=reputation&site=stackoverflow`;
        console.log(apiEndpoint);
        fetch(apiEndpoint)
            .then((res) => res.json())
            .then((result) => {
                if (result.hasOwnProperty("items")) {
                    setUserData(
                        result.items.length > 0 ? result.items[0] : null
                    );
                } else {
                    setOpenModal(true);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (userQueryId) {
            getUserData(userQueryId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            getUserData(userId);
        }
    }, [userId]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenModal(false);
    };

    return userData ? (
        <div className="UserProfile">
            {config.size === "large" ? (
                <ProfileCardMax
                    userData={userData}
                    config={config}
                    gradient={gradient}
                />
            ) : (
                <ProfileCardMini
                    userData={userData}
                    config={config}
                    gradient={gradient}
                />
            )}
        </div>
    ) : (
        <Fragment>
            <Collapse
                in={openModal}
            >
                <Alert elevation={6} variant="filled" severity={'error'}>Too many requests at the moment</Alert>
            </Collapse>
            <div className="Loading">Loading</div>
        </Fragment>
    );
};

ProfileCard.propTypes = {
    name: PropTypes.string
};

ProfileCard.defaultProps = {};

export default ProfileCard;
