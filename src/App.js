import "./App.css";
import { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Configurator from "./components/Configurator/Configurator";
import Fab from "@material-ui/core/Fab";
import CodeIcon from "@material-ui/icons/Code";
import StyleIcon from "@material-ui/icons/Style";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import UserSearch from './components/UserSearch/UserSearch';

function App() {
  
    const [userId, setUserId] = useState("5120049");
    const [config, setConfig] = useState({
        size: "large",
        gradient: ["#20bf55", "#01baef"],
        textColor: "#FFFFFF",
    });
    const [settingsToggle, setSettingsToggle] = useState(false);
    const [openCodeDialog, setOpenCodeDialog] = useState(false);
    const [embedCode, setEmbedCode] = useState("");

    useEffect(() => {
        setEmbedCode(
            `<iframe src="${window.location}user/${userId}" width="100%" height="100%" seamless frameborder="0" scrolling="no"></iframe>`
        );
    }, [userId]);

    const userChangedHandler = (userId) => {
        setEmbedCode(
            `<iframe src="${window.location}user/${userId}" width="100%" height="100%" seamless frameborder="0" scrolling="no"></iframe>`
        );
        setUserId(userId);
    };

    const closeDialog = () => {
        setOpenCodeDialog(false);
    };
  
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link
                href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
                rel="stylesheet"
            ></link>
            <link
                href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@200;400;600&display=swap"
                rel="stylesheet"
            ></link>
            <link
                href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@800&display=swap"
                rel="stylesheet"
            ></link>
            <Switch>
                <Route path="/user/:userQueryId" component={() => (<ProfileCard config={config}></ProfileCard>)}>
                </Route>
                <Route path="/">
                    <div className="Main">
                        <div
                            className="LeftMain"
                            style={{
                                backgroundImage: "url(/lightbg.png)",
                                color: "#000",
                            }}
                        >
                            <div className="Logo">
                                <img
                                    src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png"
                                    height="40"
                                    alt="StackOverflow Logo"
                                ></img>
                            </div>
                            <p className="Title">Profile Card</p>
                            <UserSearch onUserChange={userChangedHandler}></UserSearch>
                            <ProfileCard userId={userId} config={config}></ProfileCard>
                            <div className="Action">
                                <Fab
                                    variant="extended"
                                    color="primary"
                                    style={{ marginRight: 20 + "px" }}
                                    onClick={() => setOpenCodeDialog(!openCodeDialog)}
                                >
                                    <CodeIcon
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
                                        <CloseIcon />
                                    ) : (
                                        <StyleIcon
                                            style={{ marginRight: 10 + "px" }}
                                        />
                                    )}
                                    {settingsToggle ? "" : "Customize"}
                                </Fab>
                            </div>
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
                                display: settingsToggle ? "block" : "none",
                            }}
                        >
                            <Configurator onChange={setConfig}></Configurator>
                        </div>
                    </div>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
