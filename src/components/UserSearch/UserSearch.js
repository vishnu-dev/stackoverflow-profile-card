import React from "react";
import "./UserSearch.css";
import { debounce } from "lodash";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState, useCallback, Fragment } from "react";

const UserSearch = ({onUserChange}) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    let loading = open && options.length === 0;

    useEffect(() => getUsers(""), []);

    const searchInputRenderer = (params) => (
        <TextField
            {...params}
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
    );

    const searchOptionRenderer = (option, { selected }) => (
        <Fragment>
            <div className="UserListItem">
                <span>{option.display_name}</span>
                <Typography variant="caption" display="block" gutterBottom>
                    ID: {option.user_id}
                </Typography>
            </div>
        </Fragment>
    );

    const getUsers = (searchValue) => {
        const apiEndpoint = `https://api.stackexchange.com/2.2/users?order=desc&sort=reputation&site=stackoverflow&inname=${searchValue}`;
        console.log(apiEndpoint);
        fetch(apiEndpoint)
            .then((res) => res.json())
            .then((result) => {
              if (result.hasOwnProperty('items')) {
                setOptions(result.items.length > 0 ? result.items : []);
              } else {
                console.log(result);
              }
            })
            .finally(() => {
                loading = false;
            });
    };
    const debouncedGetUsers = useCallback(debounce(getUsers, 1000), []);

    return (
        <div className="UserSearch">
            <Autocomplete
                id="user-search"
                open={open}
                style={{ width: 75 + "%", margin: "0 auto" }}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                getOptionSelected={(option, value) =>
                    JSON.stringify(option) === JSON.stringify(value)
                }
                onChange={(e, v) => {
                  if (v) {
                    onUserChange(v.user_id);
                  } else {
                    onUserChange("5120049");
                  }
                }}
                getOptionLabel={(option) => (option ? option.display_name : "")}
                options={options}
                loading={loading}
                renderInput={searchInputRenderer}
                renderOption={searchOptionRenderer}
            ></Autocomplete>
        </div>
    );
};

UserSearch.propTypes = {};

UserSearch.defaultProps = {};

export default UserSearch;
