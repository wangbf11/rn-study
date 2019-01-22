import { connect } from "react-redux";
import helps from "./container/index";
import actions from "../../../../../models/actions";

export default connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(helps);