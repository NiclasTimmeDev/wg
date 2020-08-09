import React from "react";
import { connect } from "react-redux";

const TodoList = (props) => {
  if (props.user) {
    return <div>{props.user}</div>;
  } else {
    return <div>Access denied!</div>;
  }
};

const mapStateToProps = (state) => ({
  user: state.auth.user.email,
});

export default connect(mapStateToProps)(TodoList);
