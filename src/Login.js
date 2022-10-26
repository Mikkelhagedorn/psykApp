import React, {useState} from "react";
import {SafeAreaView, Text, View, StyleSheet, StatusBar, TextInput, TouchableOpacity, ToastAndroid} from "react-native";
import * as firebase from 'firebase';
import {db} from '../firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";

const Login = ({ navigation }) => {

    // Hooks
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [isTime, setIsTime] = useState(false);
    //Adding Login Details

    const AddLoginDetails = () => {

        firebase.firestore().collection("Company").add({
            Name : name,
            ContactNo : contact,
            Date : date,
            Address : address,
        }).then(function (){
            Reset();
            ToastAndroid.show("Registered Successfully.", ToastAndroid.LONG);
        })

    }

    const Reset=()=>{
        setName("");
        setDate("");
        setContact("");
        setAddress("");
    }

    function onTimeSelected(event, value) {
        let date = value;
        date = new Date(value);
        date = date.toLocaleDateString();
        setDate(date);
        setIsTime(false);
    }

    return (
        <SafeAreaView style={{marginTop: StatusBar.currentHeight}}>
            <View style={{display: "flex", alignItems: "center", marginTop: StatusBar.currentHeight}}>
                <Text style={styles.heading}>Login Form</Text>
            </View>
            <View style={{marginTop: 50, display: "flex", alignItems: "center", paddingHorizontal: 40,}}>
                <View style={styles.form_group}>
                    <Text style={styles.label}>Company Name *</Text>
                    <TextInput style={styles.input} value={name} onChangeText={(val) => {
                        setName(val);
                    }}/>
                </View>
                <View style={styles.form_group}>
                    <Text style={styles.label}>Contact No *</Text>
                    <TextInput style={styles.input} value={contact} onChangeText={(val) => {
                        setContact(val);
                    }}/>
                </View>
                {
                    isTime ? <RNDateTimePicker onChange={onTimeSelected}
                                               value={new Date()} mode="date"/> : <></>
                }

                <View style={styles.form_group}>
                    <Text style={styles.label}>Available Time *</Text>
                    <TouchableOpacity style={styles.btn_login} onPress={() => {
                        setIsTime(true);
                    }
                    }>
                        <Text style={[styles.btn_text,{ textAlign : "left",marginLeft : 5, }]}>{date}</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.form_group}>
                    <Text style={styles.label}>Company Address *</Text>
                    <TextInput style={[styles.input, {height: 80,}]} value={address} multiline={true}
                               onChangeText={(val) => {
                                   setAddress(val);
                               }}/>
                </View>
                <View style={styles.form_group}>
                    <TouchableOpacity style={styles.btn_login} onPress={() => {
                        AddLoginDetails();
                    }}>
                        <Text style={styles.btn_text}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.form_group}>
                    <TouchableOpacity style={{ marginTop : 20 }} onPress={()=>{
                        navigation.navigate("Details");
                    }}>
                        <Text style={{ textDecorationLine : "underline" }}>Company Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 22,
        fontWeight: "bold",
    },
    form_group: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 5,
    },
    label: {
        fontSize: 14,
        width: "100%",
        textAlign: "left",
    },
    input: {
        marginTop: 5,
        width: "100%",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderColor: "#000",
        borderRadius: 4,
        borderWidth: 1,
    },
    btn_login: {
        width: "100%",
        marginTop: 10,
        borderRadius: 5,
        borderColor: "#555",
        borderWidth: 1,
        paddingVertical: 10,
    },
    btn_text: {
        width: "100%",
        textAlign: "center",
    }
})

export default Login;
