import { StyleSheet } from "react-native"

export default StyleSheet.create({
    titleStyle: {
        marginTop: 23,
        marginLeft: 16,
        fontSize: 20,
        fontWeight: "bold"
    },
    shadowStyle: {
        backgroundColor: "#fff",
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        color: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        flexDirection: "row",
        marginTop: 7,
        marginBottom: 7,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20

    },
    scrollViewStyle: {
        paddingTop: 10,
        paddingBottom: 10
    },
    headImageStyle: {
        marginLeft: 13,
        width: 40,
        height: 40,
    },
    nameStyle: {
        marginLeft: 14,
        fontSize: 16,
    },
    timeStyle: {
        marginLeft: 14,
        marginTop: 11,
        color: "#808080",
        fontSize: 12,
        fontFamily: "Helvetica"
    },
    idStyle: {
        color: "#202020",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Helvetica"
    },
    centerStyle: {
        justifyContent: "center",
        alignItems: "flex-end"
    }
})
