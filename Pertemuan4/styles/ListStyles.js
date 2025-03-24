import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    userList: {
        width: '100%',
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    listItem: {
        fontSize: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#212529',
    },
    // Add color variants for list items
    listItemColor1: {
        color: '#e63946', // red
    },
    listItemColor2: {
        color: '#2a9d8f', // teal
    },
    listItemColor3: {
        color: '#6a994e', // green
    },
    listItemColor4: {
        color: '#8338ec', // purple
    }
});