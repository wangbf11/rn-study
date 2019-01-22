import { StyleSheet } from "react-native";
export default StyleSheet.create({
    firstLayout: {
        flexDirection: "row",
    },
    portraitLayout: {
        marginTop: 20,
        borderRadius: 5,
    },
    fontStyle: {
        fontSize: 27,
        fontWeight: 'bold',
        alignItems: "center",
        justifyContent: "center",
        color: "#202020",
    },
    shadowView: {
        borderRadius: 8,
        shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 2,
        backgroundColor: '#fff',
        marginTop: 8,
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 8,
    }
});
