import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

function Lookup(props) {
    return (
        <View style={styles.container}>
            <TextInput style = {styles.InputStyle}
            placeholder='Search'
            value = {props.userInput}
            onChangeText = {(updateInput) => props.onInputChange(updateInput)}
            onEndEditing={() => props.onSubmit() }
            />
            <View style={{marginLeft: 'auto'}}>
                <TouchableOpacity onPress={() => props.onSubmit()}>
                    <FontAwesome5 name='search' size={24} color='black' />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Lookup;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderColor: 'grey',
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
    },

    InputStyle: {
        width: 200,
    },
});