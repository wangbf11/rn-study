import { StyleSheet } from "react-native";
export default StyleSheet.create({
    firstLayout: {
        height: 100,
        flexDirection: "row",
        backgroundColor: "#fff"
    },
    portraitLayout: {
        margin: 10,
        width: 80,
        height: 80,
        borderRadius: 3
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    fontStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 50,
        color: 'black',
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