import { connect } from "react-redux";
import actions from "../../../../../models/actions";
import DoingShareScreen from "./container/index";

export default connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(DoingShareScreen);
