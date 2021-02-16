import React from "react";
import "./Configurator.css";
import Paper from "@material-ui/core/Paper";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { AutoSizer, ColumnSizer, Grid as VirtualGrid } from "react-virtualized";
import "react-virtualized/styles.css";
import gradientsJSON from "../../data/gradients.json";

const useStyles = makeStyles((theme) => ({
    grid: {
        margin: theme.spacing(0),
        flexGrow: 0,
        maxWidth: `100%`,
        flexBasis: `100%`,
    },
}));

const hexToR = (h) => parseInt(cutHex(h).substring(0, 2), 16);
const hexToG = (h) => parseInt(cutHex(h).substring(2, 4), 16);
const hexToB = (h) => parseInt(cutHex(h).substring(4, 6), 16);
const cutHex = (h) => (h.charAt(0) === "#" ? h.substring(1, 7) : h);

const getBorW = (hex) => {
    const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

    const hRed = hexToR(hex);
    const hGreen = hexToG(hex);
    const hBlue = hexToB(hex);

    const cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
    if (cBrightness > threshold) {
        return "#000000";
    } else {
        return "#ffffff";
    }
};

const Configurator = ({onChange}) => {
    const classes = useStyles();
    const [gradients, setGradients] = React.useState([]);
    const [config, setConfig] = React.useState({
        size: 'large',
        gradient: ['#20bf55', '#01baef'],
        textColor: '#FFFFFF'
    });

    const columnCount = 3;

    React.useEffect(() => {
        setGradients(gradientsJSON);
    }, []);

    const renderCell = ({ columnIndex, key, rowIndex, style }) => {
        const index = rowIndex * columnCount + columnIndex;
        const datum = gradients[index];
        const cellStyle = {
            backgroundImage: `linear-gradient(45deg, ${datum.colors.join(
                ", "
            )})`,
            color: getBorW(datum.colors[0]),
        };
        return (
            <div
                style={{ ...cellStyle, ...style }}
                key={key}
                className="Gradient"
                onClick={() => updateConfig({gradient: datum.colors, textColor: cellStyle.color})}
            >
                {gradients[index].name.toUpperCase()}
            </div>
        );
    };

    const updateConfig = (newConfig) => {
        setConfig({...config, ...newConfig});
        onChange({...config, ...newConfig});
    };

    return (
        <React.Fragment>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={12}>
                    <Paper className="Section">
                        <p className="Header">Card Size</p>
                        <Button
                            className="ButtonGradient"
                            variant={
                                config.size === "large" ? "contained" : "outlined"
                            }
                            value="large"
                            color="primary"
                            onClick={() => updateConfig({size: "large"})}
                        >
                            <FullscreenIcon /> Max
                        </Button>
                        <Button
                            className="ButtonGradient"
                            variant={
                                config.size === "small" ? "contained" : "outlined"
                            }
                            value="small"
                            color="primary"
                            onClick={() => updateConfig({size: "small"})}
                        >
                            <FullscreenExitIcon /> Mini
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className="Section">
                        <p className="Header">Background Gradient</p>
                        <AutoSizer disableHeight>
                            {({ width }) => (
                                <ColumnSizer
                                    columnMinWidth={50}
                                    columnCount={columnCount}
                                    width={width}
                                >
                                    {({
                                        adjustedWidth,
                                        getColumnWidth,
                                        registerChild,
                                    }) => (
                                        <VirtualGrid
                                            ref={registerChild}
                                            cellRenderer={renderCell}
                                            columnCount={columnCount}
                                            columnWidth={getColumnWidth}
                                            height={300}
                                            rowCount={Math.floor(
                                                gradients.length / columnCount
                                            )}
                                            rowHeight={50}
                                            width={adjustedWidth}
                                            style={{outline: 'none'}}
                                        />
                                    )}
                                </ColumnSizer>
                            )}
                        </AutoSizer>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

Configurator.propTypes = {};

Configurator.defaultProps = {};

export default Configurator;
