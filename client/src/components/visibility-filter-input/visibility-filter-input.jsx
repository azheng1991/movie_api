import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";

import { setFilter } from "../../actions/actions";

function VisibilityFilterInput(props) {
  return (
    <div>
      <br />
      <Form.Control
        style={{ textAlign: "Left", width: "40rem", margin: "auto" }}
        onChange={(e) => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Filter"
      />
    </div>
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
