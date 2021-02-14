import { useState, useEffect, useCallback, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import NumberFormat from "react-number-format";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import "./ProfileCard.css";

const ProfileCard = ({config}) => {
    // useEffect(() => {
    //     console.log(config);
    // }, [config]);
    const [searchKey, setSearchKey] = useState("");
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState(null);
    let loading = open && options.length === 0;
    const gradient = `linear-gradient(to right, ${config.gradient.join(", ")})`
    useEffect(() => {
        getUsers("");
        getUserData("5120049");
    }, []);
    const getUsers = (searchValue) => {
        const apiEndpoint = `https://api.stackexchange.com/2.2/users?order=desc&sort=reputation&site=stackoverflow&inname=${searchValue}`;
        console.log(apiEndpoint);
        fetch(apiEndpoint)
            .then((res) => res.json())
            .then((result) =>
                setOptions(result.items.length > 0 ? result.items : [])
            )
            .finally(() => {
                loading = false;
            });
    };
    const debouncedGetUsers = useCallback(debounce(getUsers, 1000), []);
    const getUserData = (userId) => {
        const apiEndpoint = `https://api.stackexchange.com/2.2/users/${userId}?order=desc&sort=reputation&site=stackoverflow`;
        fetch(apiEndpoint)
            .then((res) => res.json())
            .then((result) =>
                setUserData(result.items.length > 0 ? result.items[0] : null)
            );
    };
    return userData ? (
        <div className="UserProfile">
            <Autocomplete
                id="user-search"
                open={open}
                style={{ width: 75 + "%", margin: "0 auto" }}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionSelected={(option, value) =>
                    JSON.stringify(option) === JSON.stringify(value)
                }
                onChange={(e, v) => setUserData(v)}
                getOptionLabel={(option) => (option ? option.display_name : "")}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        value={searchKey}
                        onChange={(e) => {
                            loading = true;
                            debouncedGetUsers(e.target.value);
                        }}
                        label="Search users"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        ></CircularProgress>
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </Fragment>
                            ),
                        }}
                    ></TextField>
                )}
                renderOption={(option, { selected }) => (
                    <Fragment>
                        <div className="UserListItem">
                            <span>{option.display_name}</span>
                            <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                            >
                                ID: {option.user_id}
                            </Typography>
                        </div>
                    </Fragment>
                )}
            ></Autocomplete>
            <div className="ProfileCard">
                <div className="CardTop" style={{background: gradient}}>
                    <div
                        className="DisplayPicture"
                        style={{
                            backgroundImage: `url(${userData.profile_image})`,
                        }}
                    ></div>
                    <p className="ProfileName" style={{color: config.textColor}}>
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
                        <img src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png" width="130"></img>
                        <span className="ReputationContent" style={{backgroundImage: gradient}}>
                            <NumberFormat
                                value={userData.reputation}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                        </span>
                        <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                        >
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
        </div>
    ) : (
        <div>Loading</div>
    );
};

ProfileCard.propTypes = {
    name: PropTypes.string,
};

ProfileCard.defaultProps = {};

export default ProfileCard;
