import { connect } from "react-redux";
import actions from "../../../../../models/actions";
import GoldenCenterScreen from "./container/index";

export default connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(GoldenCenterScreen);
