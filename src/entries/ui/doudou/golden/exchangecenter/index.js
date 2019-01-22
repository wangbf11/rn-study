import { connect } from "react-redux";
import actions from "../../../../../models/actions";
import ExchangeCenterScreen from "./container";

export default connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(ExchangeCenterScreen);
