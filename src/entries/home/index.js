import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../models/actions";

export default connect(
    ({ userInfo ,listData}) => ({
        userInfo,
        listData
    }),
    {
        userLogin: actions.userLogin,
        getListData:actions.getListData
    }
)(Root);
