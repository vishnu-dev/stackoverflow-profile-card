import "./App.css";
import { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Configurator from "./components/Configurator/Configurator";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import UserSearch from "./components/UserSearch/UserSearch";
import StackOverflowLogo from "./images/logo-stackoverflow.png";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Fab } from "@mui/material";
import { Close, Code, Style } from "@mui/icons-material";

function App() {

    const [userId, setUserId] = useState("5120049");
    const [config, setConfig] = useState({
        size: "large",
        gradient: ["#20bf55", "#01baef"],
        textColor: "#FFFFFF"
    });
    const [settingsToggle, setSettingsToggle] = useState(false);
    const [openCodeDialog, setOpenCodeDialog] = useState(false);
    const [embedCode, setEmbedCode] = useState("");

    const updateEmbedCode = () => {
        const link = `${window.location}user/${userId}?size=${config.size}&gradient=${encodeURIComponent(config.gradient)}`;
        setEmbedCode(
            `<iframe src="${link}" width="100%" height="100%" seamless frameborder="0" scrolling="no"></iframe>`
        );
    };

    useEffect(() => {
        updateEmbedCode();
    }, [userId, config]);

    const userChangedHandler = (userId) => {
        updateEmbedCode();
        setUserId(userId);
    };

    const closeDialog = () => {
        setOpenCodeDialog(false);
    };

    return (
        <Router basename="/">
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@200;400;600&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@800&display=swap"
                rel="stylesheet"
            />
            <Switch>
                <Route path="/user/:userQueryId" component={() => (<ProfileCard config={config}/>)}>
                </Route>
                <Route path="/">
                    <div className="Main">
                        <div
                            className="LeftMain"
                        >
                            <Container maxWidth="sm">
                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                    <div className="Logo">
                                        <img
                                            src={StackOverflowLogo}
                                            height="40"
                                            alt="StackOverflow Logo"
                                        />
                                    </div>
                                    <p className="Title">Profile Card</p>
                                    <UserSearch onUserChange={userChangedHandler}/>
                                    <ProfileCard userId={userId} config={config}/>
                                    <div className="Action">
                                        <Fab
                                            variant="extended"
                                            color="primary"
                                            style={{ marginRight: 20 + "px" }}
                                            onClick={() => setOpenCodeDialog(!openCodeDialog)}
                                        >
                                            <Code
                                                style={{ marginRight: 10 + "px" }}
                                            />
                                            Embed
                                        </Fab>
                                        <Fab
                                            variant={
                                                settingsToggle ? "round" : "extended"
                                            }
                                            color="secondary"
                                            onClick={() =>
                                                setSettingsToggle(!settingsToggle)
                                            }
                                        >
                                            {settingsToggle ? (
                                                <Close />
                                            ) : (
                                                <Style
                                                    style={{ marginRight: 10 + "px" }}
                                                />
                                            )}
                                            {settingsToggle ? "" : "Customize"}
                                        </Fab>
                                    </div>
                                </Box>
                            </Container>
                            <Dialog
                                open={openCodeDialog}
                                onClose={closeDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Embed code
                                </DialogTitle>
                                <DialogContent>
                                    <pre>{embedCode}</pre>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeDialog} color="primary" autoFocus>
                                        Done
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div
                            className="RightMain"
                            style={{
                                display: settingsToggle ? "block" : "none"
                            }}
                        >
                            <Configurator onChange={setConfig}/>
                        </div>
                    </div>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
