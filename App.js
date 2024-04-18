import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState } from 'react';
import useAPIresponse from './CustomHooks/useAPIrespone';
import Lookup from './Components/Lookup';
import Result from './Components/Result';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function HomeScreen(){
  const { searchAPI, searchResult, errMessage } = useAPIresponse();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View style={styles.container}>
      <Lookup
        style={styles.lookupContainer}
        userInput={searchTerm}
        onInputChange={(updatedValue) => setSearchTerm(updatedValue)}
        onSubmit={() => searchAPI(searchTerm)}
      />
      {errMessage !== '' ? <Text>{errMessage}</Text> : <Result resultArray={searchResult} />}
    </View>
  )
}

function BusinessDetailsScreen({route}) {
  const businessId = route.params;
  const { businessDetails, fetchBusinessDetails, errMessage } = useAPIresponse();
  React.useEffect(() => {
    fetchBusinessDetails(businessId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.detailsContainer}>Business Details:</Text>
      {errMessage !== '' ? <Text style={styles.businessContainer}>{errMessage}</Text> : <Text style={styles.businessContainer}>{JSON.stringify(businessDetails.name)}
      {'\n'}{JSON.stringify(businessDetails.location.address1)}{'\n'}{JSON.stringify(businessDetails.location.city)}, {JSON.stringify(businessDetails.location.state)}{'\n'}{JSON.stringify(businessDetails.location.zip_code)}
      {'\n'}{JSON.stringify(businessDetails.display_phone)}{'\n'}{JSON.stringify(businessDetails.rating)}{'\n'}{JSON.stringify(businessDetails.review_count)}{'\n'}{JSON.stringify(businessDetails.price)}</Text>}
    </View>
  );
}


function ReviewsScreen({route}) {
  const { reviews, fetchBusinessReviews, errMessage } = useAPIresponse();
  const businessId = route.params;

  useEffect(() => {
    fetchBusinessReviews(businessId);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Business Reviews:</Text>
      {errMessage !== '' ? <Text>{errMessage}</Text> : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text>{item.text}</Text>
          )}
        />
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="Business Details" component={BusinessDetailsScreen} 
          options={{
            tabBarLabel: 'Business Details',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-details" color={color} size={size} />
            ),          }}
        />
        <Tab.Screen name="Reviews" component={ReviewsScreen} 
          options={{
            tabBarLabel: 'Reviews',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="comment" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  detailsContainer: {
    justifyContent: 'center',
    font: 20,
    color: 'red',
    padding: 10,
    fontWeight: 'bold',
  },

  businessContainer: {
    justifyContent: 'center',
    font: 20,
    color: 'blue',
    padding: 5,
    fontWeight: 'bold',
    alignItems: 'center',
  },

  lookupContainer: {
    
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
});
