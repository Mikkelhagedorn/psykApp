import React, {useEffect, useState} from "react";
import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { db } from '../firebase';
import * as firebase from 'firebase';
const Details = ()=>{

    const [companyData, setCompanyData] = useState([]);

    const GetCompanyDetails=async ()=>{
        const docs = await db.collection('Company').get();
        const _service = [];
        docs.docs.forEach((doc) => {
                _service.push({...doc.data(), id: doc.id})
            }
        );
        await setCompanyData(_service);
    }
    useEffect(()=>{
        GetCompanyDetails();
    },[])

    return(
        <SafeAreaView>
            <View style={{ paddingHorizontal : 20, }}>
                <FlatList
                    data={companyData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.list_item}>
                            <View style={{ display : "flex",flexDirection : "row",justifyContent : "space-between"  } }>
                                <Text style={{ fontSize : 15,fontWeight : "bold" }}>{item.Name}</Text>
                                <Text style={{ fontSize : 13,fontWeight : "500" }}>{item.ContactNo}</Text>
                            </View>
                            <View style={{ marginTop : 8, }}>
                                <Text style={{ fontSize : 13,fontWeight : "500" }}>{item.Date}</Text>
                            </View>
                            <View style={{ marginTop : 8 }}>
                                <Text style={{ fontSize : 13,fontWeight : "500" }}>{item.Address}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    list_item : {
        width : "100%",
        backgroundColor : "#f5f5f5",
        marginTop : 10,
        paddingVertical : 20,
        paddingHorizontal : 10,
    }
})
export default Details;
