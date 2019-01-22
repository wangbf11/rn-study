import { connect } from "react-redux";
import actions from "../../../../models/actions";
import NewbieTaskScreen from "./container/index";

export default connect(
    ({ userInfo }) => ({
        userInfo
    }),
    {
        userLogin: actions.userLogin
    }
)(NewbieTaskScreen);
