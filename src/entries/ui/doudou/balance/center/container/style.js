import { StyleSheet } from "react-native";
export default StyleSheet.create({
    firstLayout: {
        height: 100,
        flexDirection: "row",
        backgroundColor: "#fff"
    },
    line: {
        backgroundColor: "#EEEEEE",
        height: 1,
        transform: [{ scaleY: 0.5 }],
        marginLeft: 17,
        marginRight: 17
    },
    fontStyle: {
        fontSize: 20,
    },
    shadowView: {
        borderRadius: 8,
        shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 2,
        backgroundColor: '#fff',
        borderColor: "#E8E8E8",
        marginTop: 8,
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 8,
    }
});
