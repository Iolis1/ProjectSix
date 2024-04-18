import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

function Result({ resultArray }) {
    const navigation = useNavigation();
    const handlePress = (businessId) => {
        navigation.navigate('Business Details',  businessId );
    };
    
    const handlePressReviews = (businessId) => {
        navigation.navigate('Reviews', businessId);
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {handlePress(item.id)
        handlePressReviews(item.id) 
        }}>
            
            <View style={styles.businessContainer}>
                <Text style={styles.businessText}>
                    {item.name} {'\n'}Rating: {item.rating}
                    <AntDesign name="star" size={14} color="black" /> | Review Count: {item.review_count}
                </Text>
                <Image style={styles.imgStyle} source={{ uri: item.image_url }} />
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={resultArray}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.container}
        />
    );
}

export default Result;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    businessContainer: {
        padding: 10,
        alignItems: 'center',
    },
    businessText: {
        marginBottom: 5,
    },
    imgStyle: {
        width: 250,
        height: 150,
        borderRadius: 10,
    },
});
