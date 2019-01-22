import { connect } from "react-redux";
import account from "./container/index";
import actions from "../../../../../models/actions";

export default connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(account);