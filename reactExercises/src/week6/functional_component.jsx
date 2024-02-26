// eslint-disable-next-line no-unused-vars
import React from "react";
import '../App.css';
// An example of a React Functional Component using JSX syntax
// eslint-disable-next-line react/prop-types
const FunctionalJSX = ({ somedata }) => {
// es6 way of doing props.somedata
if (!somedata) {
return <div />;
}
return <div className="bigred">{somedata}</div>;
};
export default FunctionalJSX;