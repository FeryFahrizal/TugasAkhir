import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, StatusBar, Image, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { PulseIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PELANGGAN_API from './../Api/DataApi';

const kertas = require('./../../assets/kategori/kertas.jpg');
const kaca = require('./../../assets/kategori/kaca.jpg');
const plastik = require('./../../assets/kategori/plastik.jpg');
const pickup = require('./../../assets/kategori/pickup.jpg');
const sampah = require('./../../assets/kategori/sampah.jpg');


const Home = ({navigation, route}) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('');

    useEffect(() => {
        async function ambilLogin(){
            try {
                const userData = await AsyncStorage.getItem('pelanggan');
                if (userData != null) {
                    fetch(`${PELANGGAN_API}/cekLogin/${userData}`)
                    .then(response => response.json())
                    .then(json => {
                        setLoading(false)
                        if (json.status === 200) {
                            setData(json.data)
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
                    
                }
            } catch (error) {
                console.log(error.message); 
            }
        };
        ambilLogin()
    }, [])


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
        <View className="relative flex-1">
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
            <View className="flex flex-row justify-between bg-green-600 pt-12 px-6 pb-3 h-[250px] rounded-b-[30px]">
                <View className="flex flex-col">
                    <View className="flex flex-col mb-3">
                        <View className="flex flex-row items-center">
                            <Icon name={'sun'} size={16} color={`#FFFFFF`} />
                            <Text className="text-white font-medium ml-3">Selamat Siang !</Text>
                        </View>
                        <View>
                            <Text className="text-white font-medium text-xl">{data.nama}</Text>
                            <Text className="text-white font-medium text-base">{data.tlp}</Text>
                        </View>
                    </View>
                    
                </View>
                <Image 
                    source={require('./../../assets/user1.png')}
                    className="w-[45px] h-[45px] rounded-full" 
                />
            </View>
            <View className="p-6 absolute top-[110px]  w-[400px]">
                <View className="bg-white p-6 rounded-md  flex flex-row">
                    <View className="w-[214px]">
                        <Text className="text-base text-slate-600 font-bold">Tukarkan Sampahmu  Sekarang !</Text>
                        <Text className="text-sm text-slate-400">Aplikasi kami menyediakan rute terbaik untuk pengambilan sampah.</Text>
                    </View>
                    <Image source={kertas} className="w-[50px] h-[50px] rounded-full mb-3" />
                </View>
            </View>
            <View className="p-6 mt-[30px]">
                <TouchableOpacity
                    className="relative mb-6"
                    onPress={()=> navigation.navigate("Jemput", {data})}
                >
                    <ImageBackground source={pickup} resizeMode='contain' className="flex flex-row items-center w-full bg-white rounded-md mt-6 h-[130px]">
                        <Text className="text-base font-medium uppercase text-white">JEMPUT SAMPAH</Text>
                    </ImageBackground>
                    <View className="absolute w-full h-full bg-green-600 rounded-md flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                        <Text className="text-xl font-bold text-white">JEMPUT SAMPAH</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> navigation.navigate("Jenis")}
                    className="relative mb-6"
                >
                    <ImageBackground source={sampah} resizeMode='contain' className="flex flex-row items-center w-full bg-white rounded-md mt-6 h-[130px]">
                        <Text className="text-base font-medium uppercase text-white">JEMPUT SAMPAH</Text>
                    </ImageBackground>
                    <View className="absolute w-full h-full bg-green-600 rounded-md flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                        <Text className="text-xl font-bold text-white">JENIS SAMPAH</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
            <View className="flex flex-row absolute bottom-0 w-full">
                
                <TouchableOpacity
                    onPress={()=> navigation.navigate("Transaksi", {data})}
                    className="flex items-center justify-center w-[140px]"
                >
                    <Icon name="refresh-cw" size={20} color={'grey'} />
                    <Text className="text-base text-medium text-slate-400">RIWAYAT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-green-600 relative top-[-27px]"
                >
                    <Icon name="home" size={30} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> navigation.navigate("Profile",{data})}
                    className="flex items-center justify-center w-[140px]"
                >
                    <Icon name="user" size={20} color={'grey'} />
                    <Text className="text-base text-medium text-slate-400">PROFILE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home