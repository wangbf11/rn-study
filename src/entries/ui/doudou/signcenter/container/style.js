import { StyleSheet } from "react-native";
import { width } from '../../../../../util/AdapterUtil'

export default StyleSheet.create({
    imageBackView: {
        height: 150,
        alignContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    dayBackView: {
        marginLeft: 30,
        marginRight: 30,
        height: (width - 60) / 5 * 2,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    borderBackImage: {
        width: 65,
        height: 76,
        alignItems: "center",
        justifyContent: "center"
    },
    dayStyle: {
        fontSize: 33,
        fontWeight: "bold",
        color: "#F76432",
        fontFamily: "Helvetica"
    },
    shadowView: {
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        color: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10
    },
    button: {
        marginTop: 29,
        marginLeft: 44,
        marginRight: 44,
        marginBottom: 26,
        height: 40,
        alignItems: 'center',
        justifyContent: "center",
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    titleStyle: {
        marginTop: 22,
        fontSize: 16,
        color: '#202020',
        fontWeight: "bold",
        textAlign: "center",
    },
    imageStyle: {
        marginTop: 15,
        width: 17,
        height: 17,
    },
    numStlye: {
        marginTop: 15,
        fontSize: 12,
        color: "#F98141",
    },
    detailsStyle: {
        marginTop: 15,
        fontSize: 16,
        color: "#505050",
        fontFamily: "Helvetica"
    },
});