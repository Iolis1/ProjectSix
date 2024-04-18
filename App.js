import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import useAPIresponse from './CustomHooks/useAPIrespone';
import Lookup from './Components/Lookup';
import Result from './Components/Result';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

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
  const businessId = route.params.businessId;
  const { businessDetails, fetchBusinessDetails, errMessage } = useAPIresponse();
  React.useEffect(() => {
    fetchBusinessDetails(businessId);
  }, [businessId]);

  return (
    <View style={styles.container}>
      <Text style={styles.detailsContainer}>Business Details:</Text>
      {errMessage !== '' ? <Text style={styles.businessContainer}>{errMessage}</Text> : <Text style={styles.businessContainer}>{(businessDetails.name)}
      {'\n'}{(businessDetails.location.address1)}{'\n'}{(businessDetails.location.city)}, {(businessDetails.location.state)}{'\n'}{(businessDetails.location.zip_code)}
      {'\n'}{(businessDetails.display_phone)}{'\n'}{(businessDetails.rating)}{'\n'}{(businessDetails.review_count)}{'\n'}{(businessDetails.price)}</Text>}
    </View>
  );
}


function PhoneSearchScreen(props) {
  const { searchPhoneAPI, phoneSearchResult, errMessage } = useAPIresponse();
  const [ phoneSearchTerm, setPhoneSearchTerm] = useState('');
  return (
      <View style={styles.container}>
        <Lookup
          style={styles.lookupContainer}
          userInput={phoneSearchTerm}
          onInputChange={(updatedValue) => setPhoneSearchTerm(updatedValue)}
          onSubmit={() => searchAPI(phoneSearchTerm)}
        />
        {errMessage !== '' ? <Text>{errMessage}</Text> : <Result resultArray={phoneSearchResult} />}
          <TextInput style = {styles.InputStyle}
          placeholder='Phone Number'
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
            ),
          }}
        />
        <Tab.Screen name="Phone Search" component={PhoneSearchScreen} 
          options={{
            tabBarLabel: 'Phone Search',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="search" color={color} size={size} />
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
