import { LOGIN ,GET_LIST_DATA} from "./types";
import { createAction } from "redux-actions";
import http from "../../util/ajax";

export const userLogin = createAction(LOGIN, params => {
    return http.post({
        url: "",
        params
    });
});
export const getListData=createAction(GET_LIST_DATA,params=>{
    return http.get({
        url:'/videoapi/',
        params:params
    });

    // fetch("http://v.baidu.com/videoapi/?format=json&page_name=coindex&block_sign=index_index_focus_poster_small&_=1542857342892",{
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json"
    //     }})
    //     .then((response) => {   // 数据解析方式
    //         if (response.ok) {
    //             return response.json();
    //         }
    //     })
    //     .then((responseData) => {       // 获取到的数据处理
    //         alert(JSON.stringify(responseData));
    //     })
    //     .catch((error) => { // 错误处理
    //         console.error(error);
    //     })
    //     .done();
})
