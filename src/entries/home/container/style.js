import { StyleSheet } from "react-native";
import {
    width
} from '../../../util/AdapterUtil'
export default StyleSheet.create({
    header: {
        backgroundColor: "#0398ff",
        height: 120,
        paddingHorizontal: 16
    },
    typesView: {
        paddingBottom: 10,
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    typesItem: {
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    lbsWeather: {
        height: 38,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    placeholder: {
        height: 28,
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        borderRadius: 14,
        backgroundColor: "#fff",
        alignItems: "center"
    },
    lbs: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    weather: {
        flexDirection: "row",
        alignItems: "center"
    },
    textInput:{
        flex: 1,
        fontSize: 13,
        paddingLeft: 10,
        paddingRight: 10,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#fff"
    },
    searchHeadBox: {
        height: 28,
        flexDirection: "row",
        alignItems: "center"
    },
    keywords: {
        marginTop: 15,
        flexDirection: "row"
    },
    scrollView: {
        marginBottom: 46
    },
    recom: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 10,
        flexWrap: "wrap"
    },
    card: {
        backgroundColor: "#fff",
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    business: {
        backgroundColor: "#fff",
        marginTop: 10,
        paddingVertical: 16
    },
    time: {
        paddingHorizontal: 3,
        backgroundColor: "#333",
        fontSize: 11,
        color: "#fff",
        marginHorizontal: 3
    },
    recomItem: {
        width: width/2,
        height: 70,
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row"
    },
    recomWrap: {
        flex: 1,
        height: 70,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    lTimeScrollView: {
    },
    lTimeList: {
        backgroundColor:"#fff",
        alignItems: "center"
    },
    searchBtn: {
        borderRadius: 14,
        height: 28,
        width:"100%",
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    qtag: {
        fontSize: 12,
        borderWidth: 1,
        color: "#00abff",
        borderColor: "#00abff",
        paddingHorizontal: 4,
        paddingVertical: 3,
        borderRadius: 5
    },
    gift: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fff"
    },
    fixSearch: {
        backgroundColor: "#0398ff",
        height: 42,
        paddingTop: 0,
        paddingHorizontal: 16,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0
    }
});
