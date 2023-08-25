import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, StatusBar, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { PulseIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PELANGGAN_API from './../Api/DataApi';
 const [defaultRoute, setdefaultRoute] = useState('')

const Login = ({navigation}) => {

    const [defaultRoute, setdefaultRoute] = useState('')

    const [tlp, setTlp] = useState('');
    const [tlpFocus, setTlpFocus] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [loading, setLoading] = useState(false);

    const [iconPassword, setIconPassword] = useState('eye-off');
    const [tipePass, setTipePass] = useState(true);

    useEffect(() => {
        async function ambilLogin(){
            try {
                const userData = await AsyncStorage.getItem('pelanggan');
                if (userData != null) {
                    fetch(`${PELANGGAN_API}/cekLogin/${userData}`)
                    .then(response => response.json())
                    .then(json => {
                        if (json.status === 200) {
                            var par = json.data;
                            navigation.navigate("Home", {par}) 
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
      


    function ubahType(){
        if (tipePass) {
            setIconPassword('eye')
            setTipePass(false)
        }else{
            setIconPassword('eye-off')
            setTipePass(true)
        }
    }

    
    function handleLogin(){
        setLoading(true)
        const data = {
            tlp: tlp,
            password: password,
        }
        if (password == "" && tlp == "") {
            setLoading(false)
            Alert.alert('Peringatan', 'Inputan tidak boleh kosong', [
                { text: 'OK'},
            ]);
        } else {

            fetch(`${PELANGGAN_API}/login`, {
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
                    await AsyncStorage.setItem('pelanggan', id)
                    setLoading(false)
                    navigation.navigate("Home")
                   
                }else{
                    setLoading(false)
                    Alert.alert(`${res.status}`, `${res.message}`, [
                        { text: 'OK'},
                    ]);
                }
            })
            .catch((error) => {
                setLoading(false)
                Alert.alert(`${error.code}`, `${error.message}`, [
                    { text: 'OK'},
                ]);
            });
        }
    }

    if(loading){
        return(
            <View className="flex-1 bg-white flex items-center justify-center">
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
        <View className="relative  flex-1 bg-white">


            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
            <Image
                source={require('./../../assets/image/login-bg.png')}
                className="absolute"
                resizeMode='cover'
            />
            <View className="absolute z-10 top-[100px] w-full p-6">
                <Text className="text-3xl font-medium text-slate-100">BANK SAMPAH</Text>
                <Text className="text-base font-medium text-slate-200">Silahkan login menggunakan nomor telepon anda</Text>
            </View>
            <View className="p-6 bg-transparent mt-[300px] ">
                <View className="mb-3">
                    <Text className="text-base font-medium text-slate-500 mb-2">No.Telepon</Text>
                    <View className={`flex flex-row items-center border-2 ${tlpFocus == true || tlp.length != 0 ? ('border-green-600') : ('border-slate-300')} rounded-md relative`}>
                        <View className="flex items-center justify-center w-[57px] h-[57px]">
                            <Icon name={'phone'} size={24} color={`${tlpFocus == true || tlp.length != 0 ? ('#16A34A') : ('#64748B')}`} />
                        </View>
                        <TextInput
                            placeholder='Masukan No.Tlp'
                            placeholderTextColor={'#A4ABB3'}
                            onChangeText={(val) => setTlp(val)}
                            className="font-medium text-base w-[251px] h-[57px] text-slate-600"
                            onFocus={() => setTlpFocus(true)}
                            onBlur={() => setTlpFocus(false)}
                        />
                    </View>
                </View>
                <View className="">
                    <Text className="text-base font-medium text-slate-500 mb-2">Password</Text>
                    <View className={`flex flex-row items-center border-2 ${passwordFocus == true || password.length != 0 ? ('border-green-600') : ('border-slate-300')} rounded-md relative`}>
                        <View className="flex items-center justify-center w-[57px] h-[57px]">
                            <Icon name={'key'} size={24} color={`${passwordFocus == true || password.length != 0 ? ('#16A34A') : ('#64748B')}`} />
                        </View>
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor={'#A4ABB3'}
                            onChangeText={(val) => setPassword(val)}
                            className="font-medium text-base w-[251px] h-[57px] text-slate-600"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            secureTextEntry={tipePass}
                        />
                        <TouchableOpacity
                            onPress={ubahType}
                            className="flex items-center justify-center w-[57px] h-[57px] absolute right-0"
                        >
                            <Icon name={iconPassword} size={24} color={`${iconPassword == 'eye-off' ? ('#64748B') : ('#16A34A')}`} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={handleLogin}
                    className="px-6 py-4 bg-green-600 flex items-center justify-center rounded-md mt-12"
                >
                    <Text className="text-base font-medium text-white">SIGN-IN</Text>
                </TouchableOpacity>
                <View className="mt-4 flex flex-row items-center justify-center">
                    <Text className="text-base font-normal text-slate-500">Belum punya akun ?!, </Text>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('Register')}
                        className="ml-2"
                    >
                        <Text className="text-base font-medium text-green-600">Registrasi disini</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Login