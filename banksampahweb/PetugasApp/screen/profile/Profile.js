import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableOpacity,
    Dimensions,
    Alert,
    StatusBar,
    Modal
} from 'react-native';

import Icon from "react-native-vector-icons/Feather";
import { PulseIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PETUGAS_API from './../api/DataApi';

import { Appbar, Text,  TextInput } from 'react-native-paper';

const Profile = ({ navigation }) => {

    const [petugas, setpetugas] = useState();
    const [loading, setloading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [nama, setnama] = useState('');
    const [tlp, settlp] = useState('');
    const [password, setpassword] = useState('');
    const [typepass, settypepass] = useState(true);

    const [iconpass, seticonpass] = useState("eye-off");

    function setPass() {
        iconpass == "eye-off" ? (seticonpass("eye"), settypepass(false)) : (seticonpass("eye-off"), settypepass(true))
    }



    useEffect(() => {
        ambilDataPetugas()
    }, [])

    async function ambilDataPetugas() {
        setloading(true)
        try {
            const userData = await AsyncStorage.getItem('petugas');
            if (userData != null || userData != undefined) {
                fetch(`${PETUGAS_API}/cekLogin/${userData}`)
                    .then(response => response.json())
                    .then(json => {

                        setloading(false)
                        if (json.status === 200) {
                            setpetugas(json.data)
                        }
                    })
                    .catch(error => {
                        setloading(false)
                        console.error(error);
                    });

            } else {
                setloading(false)
                navigation.navigate("Login")
            }
        } catch (error) {
            setloading(false)
            console.log(error.message);
        }
    };

    function handleUpdate(){
        setloading(true)
        const data = {
            id: petugas.id,
            nama: nama != '' ? nama : petugas.nama,
            tlp: tlp != '' ? tlp : petugas.tlp,
            password: password,
        }

        fetch(`${PETUGAS_API}/updateProfile`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then(async (res) => {
            
            if (res.status === 200) {
                setModalVisible(false)
                navigation.replace("Profile")
               
            }else{
                setModalVisible(false)
                setloading(false)
                Alert.alert(`${res.status}`, `${res.message}`, [
                    { text: 'OK'},
                ]);
            }
        })
        .catch((error) => {
            setModalVisible(false)
            setloading(false)
            Alert.alert(`${error.code}`, `${error.message}`, [
                { text: 'OK'},
            ]);
        });
    }

    async function hapusSesi(){
        try {
            const userData = await AsyncStorage.removeItem('petugas');
            navigation.replace("Login")
        } catch (error) {
            console.log(error.message); 
        }
    }

    function handleLogout(){
        Alert.alert(`Notifikasi !`,'Yakin ingin keluar dari aplikasi ini ?!', [
            {
                text: 'BATAL',
                style: 'cancel',
            },
              {text: 'OK', onPress: () => hapusSesi()},
        ]);
    }

    if (loading) {
        return (
            <View className="w-full h-full flex items-center justify-center aboslute bg-transparent">
                <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
                <PulseIndicator
                    color='#16A34A'
                    animationDuratio={300}
                    size={60}
                />
            </View>
        )
    }
    return (


        <View className="flex-1">

            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.replace("Home")} />
                <Appbar.Content title="PROFILE" />
            </Appbar.Header>

            <View className="p-6 m-6 bg-white rounded-md">
                <View className="flex flex-row items-center justify-between">
                    <Text className="text-base font-medium text-slate-400">Nama</Text>
                    <Text className="text-base font-medium text-slate-500">{petugas != undefined ? petugas.nama : '-'}</Text>
                </View>
                <View className="flex flex-row items-center justify-between my-6">
                    <Text className="text-base font-medium text-slate-400">Telepon</Text>
                    <Text className="text-base font-medium text-slate-500">{petugas != undefined ? petugas.tlp : '-'}</Text>
                </View>
                <View className="flex flex-column">
                    <Text className="text-base font-medium text-slate-400 mb-3">Password</Text>
                    <Text className="text-base font-medium text-slate-500">{petugas != undefined ? petugas.password : '-'}</Text>
                </View>
            </View>
            <View className="absolute bottom-0 w-full bg-white p-6">
                <TouchableOpacity onPress={() => setModalVisible(true)} className="border-2 border-green-600 px-6 py-4 rounded-md flex items-center justify-center mb-6">
                    <Text className="text-base font-medium text-green-600">UPDATE PROFILE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} className="border-2 border-red-600 px-6 py-4 rounded-md flex items-center justify-center">
                    <Text className="text-base font-medium text-red-600">LOGOUT</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View className="w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View className="bg-white w-full h-full ">
                        <TouchableOpacity onPress={() => setModalVisible(false)} className="flex items-center justify-center px-6 py-4 w-full rounded-md">
                            <View className="w-12 h-2 bg-slate-500"></View>
                        </TouchableOpacity>
                        <View className="flex items-center justify-center p-6 w-full h-full ">
                            <View className="mb-3 w-full">

                                <TextInput
                                    label={petugas != undefined ? petugas.nama : 'Nama'}
                                    onChangeText={(val) => setnama(val)}
                                    left={<TextInput.Icon icon="account" />}
                                    className="bg-transparent"
                                />
                            </View>
                            <View className="mb-3 w-full">

                                <TextInput
                                     label={petugas != undefined ? petugas.tlp : 'No.Telepon'}
                                    onChangeText={(val) => settlp(val)}
                                    left={<TextInput.Icon icon="phone" />}
                                    className="bg-transparent"
                                />
                            </View>
                            <View className="mb-3 w-full">

                                <TextInput
                                    label="Password"
                                    secureTextEntry={typepass}
                                    onChangeText={(val) => setpassword(val)}
                                    left={<TextInput.Icon icon="lock" />}
                                    right={<TextInput.Icon icon={iconpass} onPress={setPass} />}
                                    className="bg-transparent"


                                />
                            </View>
                            <View className="my-6 w-full">

                               <TouchableOpacity onPress={handleUpdate} className="flex items-center justify-center px-6 py-4 bg-green-600">
                                    <Text className="font-medium text-base text-white">UPDATE</Text>
                               </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>



        </View>
    )
}

export default Profile