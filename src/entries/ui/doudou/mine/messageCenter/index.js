import { connect } from "react-redux";
import message from "./container/index";
import actions from "../../../../../models/actions";

export default connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(message);