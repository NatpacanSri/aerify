import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TouchableOpacity, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Provider as PaperProvider, Card, List, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import PhoneScreen from './Phone';


export default function LoginScreen(){



    return(
        <View style={styles.container}>
            <View style={{flex:1}} ></View>
            <View style={{marginTop:40,flex:1}}>
                <Image
                source={require('./assets/cloud2.png')}
                style={{  width: 130,
                    resizeMode: "contain",
                    alignSelf: "center", }}
            />
            <Image
                source={require('./assets/aerio.png')}
                style={{  width: 150,
                height: 50,
                resizeMode: "contain",
                alignSelf: "center",  
                }}
            />
            </View>
            
            <View style={{flex:1}}></View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 60}}>
            <TouchableOpacity style={{backgroundColor:"#02466E",padding:15,borderRadius:40}} 
                onPress={() => navigation.navigate('Phone') }>
                <Icon name="phone" size={30} color="#ffff" />
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:"#02466E",padding:15,borderRadius:40,marginStart:30}} 
                onPress={() => console.log("Phone button pressed!")}>
                <Icon name="google" size={30} color="#ffff" />
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#023F62',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });