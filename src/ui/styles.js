import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    textMain: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30, 
    },
    textSecondary: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24, 
    },
    textInput: {
        color: 'green',
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    column: {
        borderWidth:  1,
        flex:  1
    },
    buttonView: {
        margin: 2,
        padding: 10,
        width: 50
    }
});