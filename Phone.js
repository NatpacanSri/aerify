import * as React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { initializeApp, getApp } from "firebase/app";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import Logo from "./assets/aerifyLogo.png";
import { BottomNavigation } from "react-native-paper";

export default function PhoneScreen() {
  // Ref or state management hooks
  const app = getApp();
  const auth = getAuth();
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();

  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;

  return (
    <View style={{ padding: 20, marginTop: 50,backgroundColor:"#023F62",flex:1 }}>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        // attemptInvisibleVerification
      />

    

    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <TouchableOpacity>
      <Image
        source={require('./assets/back_icon.png')}
        style={{  width: 50,
          height: 50,
          resizeMode: "contain",
          alignSelf: "flex-start",
        marginTop:"auto",marginBottom:"auto" }}
      />
    </TouchableOpacity>

      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
          alignSelf: "flex-end",
        }}
        source={require("./assets/cloud.png")}
      />
    </View>

      <Text style={{ marginTop: 20,color:"white" }}>Phone No.</Text>
      <TextInput
        style={{
          marginVertical: 10,
          fontSize: 17,
          borderRadius: 20,
          padding: 10,
          fontSize: 16,
          backgroundColor:"#02466E",
          color:"white"
        }}
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      >
        +66
      </TextInput>
      {/* <Button
        title="Send OTP"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: 'Verification code has been sent to your phone.',
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}
      />
    
      <TextInput
        style={{ marginVertical: 10, fontSize: 17,borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 5,
          padding: 10,
          fontSize: 16, }}
        editable={!!verificationId}
        placeholder="Enter 6-digit code"
        onChangeText={setVerificationCode}
          >
          </TextInput> */}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            marginVertical: 10,
            fontSize: 17,
            borderRadius: 20,
            padding: 10,
            fontSize: 16,
            width:"77%",
            color:"white",
            backgroundColor:"#02466E",
            
          }}
          editable={!!verificationId}
          placeholder="Enter 6-digit code"
          onChangeText={setVerificationCode}
          placeholderTextColor={"white"}
          keyboardType="phone-pad"
        />
        <TouchableOpacity
          disabled={!phoneNumber}
          onPress={async () => {

            try {
              const phoneProvider = new PhoneAuthProvider(auth);
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId);
              showMessage({
                text: "Verification code has been sent to your phone.",
              });
            } catch (err) {
              showMessage({ text: `Error: ${err.message}`, color: "red" });
            }
          }}
        >
          <Text style={{color:"#05A0FA",marginLeft:10}}>Send OTP</Text>
        </TouchableOpacity>
      </View>

          <View
          style={{flex:1}}
          ></View>

        <View style={{borderRadius: 40, overflow: "hidden"}}>
            <Button
                buttonStyle={{textTransform:"none"}}
                title="Sign in"
                color={"#05A0FA"}
                textTransform={"none"}
                // disabled={!verificationId}
                onPress={async () => {
          try {
            const credential = PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await signInWithCredential(auth, credential);
            showMessage({ text: "Phone authentication successful 👍" });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
        
      />
        </View>
      

      

      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: "center" },
          ]}
          onPress={() => showMessage(undefined)}
        >
          <Text
            style={{
              color: message.color || "blue",
              fontSize: 17,
              textAlign: "center",
              margin: 20,
            }}
          >
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>

  );
}

const styles = StyleSheet.create({
//   button:{
//     backgroundColor:"#05A0FA",
//     borderRadius:20,
//   }
})
