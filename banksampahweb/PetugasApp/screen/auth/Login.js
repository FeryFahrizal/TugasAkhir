import React, { useState, useEffect } from 'react';
import { View, StatusBar,  Alert } from 'react-native';
import {
    TextInput,
    Button,
    Text,
   
} from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";
import { PulseIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PETUGAS_API from './../api/DataApi';

const Login = ({ navigation }) => {

    const [tlp, settlp] = useState('');
    const [password, setpassword] = useState('');
    const [typepass, settypepass] = useState(true);

    const [iconpass, seticonpass] = useState("eye-off");
    const [loading, setloading] = useState(false);

    function setPass() {
        iconpass == "eye-off" ? (seticonpass("eye"), settypepass(false)) : (seticonpass("eye-off"), settypepass(true))
    }

    useEffect(() => {
        async function ambilLogin(){
            try {
                const userData = await AsyncStorage.getItem('petugas');
                if (userData != null) {
                    fetch(`${PETUGAS_API}/cekLogin/${userData}`)
                    .then(response => response.json())
                    .then(json => {
                        if (json.status === 200) {
                            navigation.navigate("Home") 
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
                    
                }else{
                    navigation.navigate("Login")
                }
            } catch (error) {
                console.log(error.message); 
            }
        };
        ambilLogin()
    }, [])

    
    function handleLogin(){
        setloading(true)
        const data = {
            tlp: tlp,
            password: password,
        }
        if (password == "" && tlp == "") {
            setloading(false)
            Alert.alert('Peringatan', 'Inputan tidak boleh kosong', [
                { text: 'OK'},
            ]);
        } else {

            fetch(`${PETUGAS_API}/login`, {
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
                    const id = JSON.stringify(res.data.id)
                    await AsyncStorage.setItem('petugas', id)
                    setloading(false)
                    navigation.navigate("Home")
                   
                }else{
                    setloading(false)
                    Alert.alert(`${res.status}`, `${res.message}`, [
                        { text: 'OK'},
                    ]);
                }
            })
            .catch((error) => {
                setloading(false)
                Alert.alert(`${error.code}`, `${error.message}`, [
                    { text: 'OK'},
                ]);
            });
        }
    }




    return (
        <>
            {
                    loading ? (
                        <View className="w-full h-full flex items-center justify-center aboslute bg-transparent">
                            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
                            <PulseIndicator
                                color='#16A34A'
                                animationDuratio={300}
                                size={60}
                            />
                        </View>
                    ) : null
                }
            
            <View className="flex-1 bg-green-100 p-6 relative">
            
                <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />

                <View className=" mt-[150px] mb-[50px]">
                    <Text className="text-3xl font-medium text-slate-500">PETUGAS</Text>
                    <Text className="text-3xl font-medium text-slate-500 mb-3">BANK SAMPAH</Text>
                    <Text className="text-base font-medium text-slate-400">Silahkan login menggunakan nomor telepon anda</Text>
                </View>
                <View className="">
                    <View className="mb-3">

                        <TextInput
                            label="No.Telepon"
                            onChangeText={(val) => settlp(val)}
                            left={<TextInput.Icon icon="phone" />}
                            className="bg-transparent"
                        />
                    </View>
                    <View className="mb-3">

                        <TextInput
                            label="Password"
                            secureTextEntry={typepass}
                            onChangeText={(val) => setpassword(val)}
                            left={<TextInput.Icon icon="lock" />}
                            right={<TextInput.Icon icon={iconpass} onPress={setPass} />}
                            className="bg-transparent"


                        />
                    </View>
                    <View className="mb-3 flex items-end justify-end">
                        <Button
                            mode="contained"
                            onPress={handleLogin}
                            className="px-6 py-2 mt-6"
                        >
                            SIGN-IN
                        </Button>
                    </View>
                </View>
            </View>
        </>

    )
}

export default Login