// import * as React from 'react'
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image,TextInput } from 'react-native';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Provider as PaperProvider, Card, List, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import PhoneScreen from './Phone'
import LoginScreen from './Login'
import axios from "axios";
import { useNavigation } from '@react-navigation/native';


const firebaseConfig = {
  apiKey: "AIzaSyBtfk8xwZfjmKkeEcDXEzesNHU3GPWbYbA",
  authDomain: "aerify-134be.firebaseapp.com",
  databaseURL: "https://aerify-134be-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aerify-134be",
  storageBucket: "aerify-134be.appspot.com",
  messagingSenderId: "64310428596",
  appId: "1:64310428596:web:ca23f0dedafbe627e5e8e1",
  measurementId: "G-T071B552J6"
};

LogBox.ignoreAllLogs(true);

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) { }

function dbListener(path, setData) {
  const tb = ref(getDatabase(), path);
  onValue(tb, (snapshot) => {
    setData(snapshot.val());
  })
}

function Detail(props) {

  return <View>
    <Text>{JSON.stringify(props.item)}</Text>
    <Button onPress={() => props.setItem(null)}>
      Back
    </Button>
  </View>
};

function Loading() {
  return <View><Text>Loading</Text></View>
}

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [aqiData, setAqiData] = useState(null);

  const [air, setAir] = React.useState([]);
  const [user, setUser] = React.useState(null);

  const navigation = useNavigation();

  const fetchAqiData = () => {
    const url = "https://api.api-ninjas.com/v1/airquality";
    const apiKey = "p03BxAZvjj/O38c4spnELA==2qfaZjVTI0t1kSqM"; // Replace with your API key
    let params = {};
    if (city) {
      params = { city };
    } else if (lat && lon) {
      params = { lat, lon };
    } else {
      alert("Please enter a city or location coordinates");
      return;
    }
    axios
      .get(url, {
        params,
        headers: {
          "X-Api-Key": apiKey,
        },
      })
      .then((response) => {
        setAqiData(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to fetch air quality data");
      });

  };

  

  React.useEffect(() => {
    var auth = getAuth();
    auth.onAuthStateChanged(function (us) {
      setUser(us);
    });
    dbListener("/air", setAir);
  }, []);

  if (user == null) {
    navigation.navigate('Home')
  }

  return (
  
    <View style={styles.container}>
      <Text style={styles.title}>Air Quality</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        onChangeText={(text) => setCity(text)}
        value={city}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter latitude"
        onChangeText={(text) => setLat(text)}
        value={lat}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter longitude"
        onChangeText={(text) => setLon(text)}
        value={lon}
      />
      <Button title="Search" onPress={fetchAqiData} />
      {aqiData && (
        <View style={styles.aqiData}>
          <Text style={styles.aqiTitle}>
            Air Quality Index:
            {aqiData.overall_aqi}
          </Text>
          <Text style={styles.aqiText}>
            CO: {aqiData.CO.aqi} (concentration:
            {aqiData.CO.concentration})
          </Text>
          <Text style={styles.aqiText}>
            NO2: {aqiData.NO2.aqi} (concentration:
            {aqiData.NO2.concentration})
          </Text>
          <Text style={styles.aqiText}>
            O3: {aqiData.O3.aqi} (concentration:
            {aqiData.O3.concentration})
          </Text>
          <Text style={styles.aqiText}>
            SO2: {aqiData.SO2.aqi} (concentration:
            {aqiData.SO2.concentration})
          </Text>
          <Text style={styles.aqiText}>
            PM2.5: {aqiData["PM2.5"].aqi}
            (concentration: {aqiData["PM2.5"].concentration})
          </Text>
          <Text style={styles.aqiText}>
            PM10: {aqiData.PM10.aqi} (concentration:
            {aqiData.PM10.concentration})
          </Text>
        </View>
        
      )}

<Button icon="logout"
      textColor='#0a86ff'
      style={{marginTop:270}}
      onPress={() => getAuth().signOut()}>
          Sign Out
        </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  aqiContainer: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  aqiTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aqiValue: {
    fontSize: 50,
    fontWeight: "bold",
  },
  aqiDescription: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});
// export default App;

// import * as React from 'react'
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image } from 'react-native';
// import firebase from 'firebase/compat/app';
// import { getDatabase, ref, onValue, set } from 'firebase/database';
// import { getAuth } from 'firebase/auth';
// import { Provider as PaperProvider, Card, List, Button } from 'react-native-paper';
// import Constants from 'expo-constants';
// import PhoneScreen from './Phone'
// import LoginScreen from './Login'

// const firebaseConfig = {
//   apiKey: "AIzaSyBtfk8xwZfjmKkeEcDXEzesNHU3GPWbYbA",
//   authDomain: "aerify-134be.firebaseapp.com",
//   databaseURL: "https://aerify-134be-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "aerify-134be",
//   storageBucket: "aerify-134be.appspot.com",
//   messagingSenderId: "64310428596",
//   appId: "1:64310428596:web:ca23f0dedafbe627e5e8e1",
//   measurementId: "G-T071B552J6"
// };

// LogBox.ignoreAllLogs(true);

// try {
//   firebase.initializeApp(firebaseConfig);
// } catch (err) { }

// function dbListener(path, setData) {
//   const tb = ref(getDatabase(), path);
//   onValue(tb, (snapshot) => {
//     setData(snapshot.val());
//   })
// }

// function Detail(props) {

//   return <View>
//     <Text>{JSON.stringify(props.item)}</Text>
//     <Button onPress={() => props.setItem(null)}>
//       Back
//     </Button>
//   </View>
// };

// function Loading() {
//   return <View><Text>Loading</Text></View>
// }

// export default function App() {
//   const [air, setAir] = React.useState([]);
//   const [user, setUser] = React.useState(null);

//   React.useEffect(() => {
//     var auth = getAuth();
//     auth.onAuthStateChanged(function (us) {
//       setUser(us);
//     });
//     dbListener("/air", setAir);
//   }, []);

//   if (user == null) {
//     return <PhoneScreen />;
//   }

//   return (
//     <View style={styles.container}>
//           <Image style={{ width: 100, height: 100,resizeMode: 'contain',alignSelf: 'center',marginTop:260, }}  source={require("./assets/aerifyLogo.png")} />
//       <Text style={{fontSize:20, textAlign: 'center',marginTop:20,fontWeight:"bold"}}>
//         Welcome to aerify
//       </Text>
//       <Button icon="logout"
//       textColor='#0a86ff'
//       style={{marginTop:270}}
//       onPress={() => getAuth().signOut()}>
//           Sign Out
//         </Button>
//     </View>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });





