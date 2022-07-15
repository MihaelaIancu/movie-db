import React from "react";
import TextField from "@mui/material/TextField";
import "../App.css";

function Search(props) {
  return (
    <div className="search">
      <form action="" onSubmit={props.handleSubmit}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          onChange={props.handleChange}
        />
        {/* <button onClick={this.handleReset}>Reset your search</button> */}
      </form>
    </div>
  );
}

export default Search;
