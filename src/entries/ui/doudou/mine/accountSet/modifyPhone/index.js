import { connect } from "react-redux";
import phone from "./container/index";
import actions from "../../../../../../models/actions";

export default connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(phone);