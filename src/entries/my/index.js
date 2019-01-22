import { connect } from "react-redux";
import Root from "./container/index";
import actions from "../../models/actions";

export default connect(
    ({ userInfo ,listData}) => {

        let videos = listData?listData[0].data.videos:null;
        return { userInfo,videos}
    },
    {
        userLogin: actions.userLogin,
        getListData:actions.getListData
    }
)(Root);
