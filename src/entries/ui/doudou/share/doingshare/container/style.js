import { StyleSheet } from "react-native"

export default StyleSheet.create({

    shadowView: {
        backgroundColor: "#fff",
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        color: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10
    },
    title: {
        color: "#1C1C1C",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold"
    },
    showMoney: {
        color: "#1C1C1C",
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 28,
        fontFamily: "Helvetica"
    },
    titleShowMoney: {
        color: "#1C1C1C",
        fontSize: 12,
        marginTop: 24,
        marginBottom: 52
    },
    cellStyle: {
        paddingTop: 16,
        paddingBottom: 11,
        alignItems: "center",
    },
    cellTitle: {
        color: "#202020",
        marginTop: 14,
        fontSize: 14,
    },
    details: {
        marginTop: 6,
        fontSize: 12,
        color: "#808080",
    }
}) 