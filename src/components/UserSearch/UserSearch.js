import React from "react";
import "./UserSearch.css";
import { debounce } from "lodash";
import { useEffect, useState, useCallback, Fragment } from "react";
import { Autocomplete, CircularProgress, TextField, Typography } from "@mui/material";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const UserSearch = ({ onUserChange }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    let loading = open && options.length === 0;

    const getUsers = (searchValue, results) => {
        const apiEndpoint = `https://api.stackexchange.com/2.2/users?order=desc&sort=reputation&site=stackoverflow&inname=${searchValue}`;
        console.log(apiEndpoint);
        fetch(apiEndpoint)
            .then((res) => res.json())
            .then((result) => {
                if (result.hasOwnProperty("items")) {
                    setOptions(result.items.length > 0 ? result.items : []);
                } else {
                    console.log(result);
                }
            })
            .finally(() => {
                loading = false;
            });
    };

    return (
        <div className="UserSearch">
            <ReactSearchAutocomplete
                items={options}
                onSearch={getUsers}/>
        </div>
    );
};

UserSearch.propTypes = {};

UserSearch.defaultProps = {};

export default UserSearch;
