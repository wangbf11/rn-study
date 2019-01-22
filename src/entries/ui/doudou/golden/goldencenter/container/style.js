import { StyleSheet } from "react-native";
export default StyleSheet.create({

    shadowView: {
        borderRadius: 8,
        shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 2,
        backgroundColor: '#fff',
        marginTop: 8,
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 8,
    },

    viewWithLine: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 95,
        borderColor: "#ccc",
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: "row"
    },
    colLineView: {
        width: 1,
        backgroundColor: "#ccc",
        transform: [{ scaleY: 0.8 }]
    },
    titleStyle: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 12,
        color: '#ccc',
    },
    goldenPoints: {
        marginTop: 10,
        marginLeft: 20,
        fontSize: 30,
        fontWeight: 'bold',
    },
    detailsStyle: {
        marginLeft: 37,
        marginTop: 10,
        fontSize: 16,
        color: "#505050"
    },
    button: {
        marginLeft: 17,
        marginRight: 17,
        height: 45,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    }
});
