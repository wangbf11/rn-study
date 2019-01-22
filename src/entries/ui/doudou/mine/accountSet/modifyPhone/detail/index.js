import { connect } from "react-redux";
import phoneDetail from "./container/index";
import actions from "../../../../../../../models/actions";

export default connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(phoneDetail);