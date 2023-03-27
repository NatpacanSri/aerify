import * as React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, FlatList, SafeAreaView, LogBox, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Provider as PaperProvider, Card, List, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import LoginScreen from './Login'

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

export default function App() {
  const [air, setAir] = React.useState([]);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    var auth = getAuth();
    auth.onAuthStateChanged(function (us) {
      setUser(us);
    });
    dbListener("/air", setAir);
  }, []);

  if (user == null) {
    return <LoginScreen />;
  }

  return (
    <View style={styles.container}>
          <Image style={{ width: 100, height: 100,resizeMode: 'contain',alignSelf: 'center',marginTop:260, }}  source={require("./assets/aerifyLogo.png")} />
      <Text style={{fontSize:20, textAlign: 'center',marginTop:20,fontWeight:"bold"}}>
        Welcome to aerify
      </Text>
      <Button icon="logout"
      textColor='#0a86ff'
      style={{marginTop:270}}
      onPress={() => getAuth().signOut()}>
          Sign Out
        </Button>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
