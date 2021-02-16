import { useState, useEffect, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import "./ProfileCard.css";
import { useParams } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const ProfileCardMax = ({ userData, config, gradient }) => (
    <a href={userData.link} className="CardLink" target="blank">
        <div className="ProfileCardLarge">
            <div className="CardTop" style={{ background: gradient }}>
                <div
                    className="DisplayPicture"
                    style={{
                        backgroundImage: `url(${userData.profile_image})`,
                    }}
                ></div>

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
                        ></path>
                    </defs>
                    <g className="parallax">
                        <use
                            x="48"
                            fill="rgba(255,255,255,0.6)"
                            xlinkHref="#gentle-wave"
                        ></use>
                        <use
                            x="48"
                            y="2"
                            fill="rgba(255,255,255,0.4)"
                            xlinkHref="#gentle-wave"
                        ></use>
                        <use
                            x="48"
                            y="4"
                            fill="rgba(255,255,255,0.2)"
                            xlinkHref="#gentle-wave"
                        ></use>
                        <use
                            x="48"
                            y="6"
                            fill="#fff"
                            xlinkHref="#gentle-wave"
                        ></use>
                    </g>
                </svg>
            </div>
            <div className="CardBottom">
                <p className="Reputation">
                    <img
                        src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png"
                        width="130"
                        alt="StackOverflow Logo"
                    ></img>
                    <span
                        className="ReputationContent"
                        style={{
                            backgroundImage: gradient,
                            filter:
                                config.textColor === "#000000"
                                    ? "drop-shadow(1px 1px 1px #333)"
                                    : "none",
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
                        <div className="MedalRibbon MedalRibbonLeft"></div>
                        <div className="MedalRibbon MedalRibbonRight"></div>
                    </div>
                    <div className="Medal">
                        <div className="MedalCircle MedalCircleSilver">
                            <span>{userData.badge_counts.silver}</span>
                        </div>
                        <div className="MedalRibbon MedalRibbonLeft"></div>
                        <div className="MedalRibbon MedalRibbonRight"></div>
                    </div>
                    <div className="Medal">
                        <div className="MedalCircle MedalCircleBronze">
                            <span>{userData.badge_counts.bronze}</span>
                        </div>
                        <div className="MedalRibbon MedalRibbonLeft"></div>
                        <div className="MedalRibbon MedalRibbonRight"></div>
                    </div>
                </div>
            </div>
        </div>
    </a>
);

const ProfileCardMini = ({ userData, config, gradient }) => (
    <a href={userData.link} className="CardLink" target="blank">
        <div className="ProfileCardMini">
            <div className="CardLeft" style={{ background: gradient }}>
                <div
                    className="DisplayPicture"
                    style={{
                        backgroundImage: `url(${userData.profile_image})`,
                    }}
                ></div>
                <p className="ProfileName" style={{ color: config.textColor }}>
                    {userData?.display_name.toUpperCase()}
                </p>
            </div>
            <div className="CardRight">
                <p className="Reputation">
                    <img
                        src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png"
                        width="130"
                        alt="StackOverflow Logo"
                    ></img>
                    <span
                        className="ReputationContent"
                        style={{
                            backgroundImage: gradient,
                            filter:
                                config.textColor === "#000000"
                                    ? "drop-shadow(1px 1px 1px #333)"
                                    : "none",
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
                        <div className="MedalRibbon MedalRibbonLeft"></div>
                        <div className="MedalRibbon MedalRibbonRight"></div>
                    </div>
                    <div className="Medal">
                        <div className="MedalCircle MedalCircleSilver">
                            <span>{userData.badge_counts.silver}</span>
                        </div>
                        <div className="MedalRibbon MedalRibbonLeft"></div>
                        <div className="MedalRibbon MedalRibbonRight"></div>
                    </div>
                    <div className="Medal">
                        <div className="MedalCircle MedalCircleBronze">
                            <span>{userData.badge_counts.bronze}</span>
                        </div>
                        <div className="MedalRibbon MedalRibbonLeft"></div>
                        <div className="MedalRibbon MedalRibbonRight"></div>
                    </div>
                </div>
            </div>
        </div>
    </a>
);

const ProfileCard = ({ userId, config }) => {
    const [userData, setUserData] = useState(null);
    const { userQueryId } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const gradient = `linear-gradient(45deg, ${config.gradient.join(", ")})`;

    const getUserData = (userId) => {
        const apiEndpoint = `https://api.stackexchange.com/2.2/users/${userId}?order=desc&sort=reputation&site=stackoverflow`;
        fetch(apiEndpoint)
            .then((res) => res.json())
            .then((result) => {
                if (result.hasOwnProperty('items')) {
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
                ></ProfileCardMax>
            ) : (
                <ProfileCardMini
                    userData={userData}
                    config={config}
                    gradient={gradient}
                ></ProfileCardMini>
            )}
        </div>
    ) : (
        <Fragment>
            <Snackbar
                open={openModal}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="error">Too many requests at the moment</Alert>
            </Snackbar>
            <div className="Loading">Loading</div>
        </Fragment>
    );
};

ProfileCard.propTypes = {
    name: PropTypes.string,
};

ProfileCard.defaultProps = {};

export default ProfileCard;
