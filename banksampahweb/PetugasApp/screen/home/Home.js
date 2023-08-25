import React, {useState,useEffect} from 'react'
import { View, FlatList, TouchableOpacity,StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";
import { PulseIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PETUGAS_API from './../api/DataApi';


const Home = ({navigation}) => {

    const [datapetugas, setdatapetugas] = useState();
    const [jemput, setjemput] = useState();
    const [loading, setloading] = useState(false);



    useEffect(() => {
        ambilDataPetugas()
        ambilDataPenjemputan()
    }, [])

    async function ambilDataPetugas(){
        setloading(true)
        try {
            const userData = await AsyncStorage.getItem('petugas');
            if (userData != null) {
                fetch(`${PETUGAS_API}/cekLogin/${userData}`)
                .then(response => response.json())
                .then(json => {
                  
                    setloading(false)
                    if (json.status === 200) {
                        setdatapetugas(json.data)
                    }
                })
                .catch(error => {
                    setloading(false)
                    console.error(error);
                });
                
            }else{
                setloading(false)
                navigation.navigate("Login")
            }
        } catch (error) {
            setloading(false)
            console.log(error.message); 
        }
    };
    
    async function ambilDataPenjemputan(){
        setloading(true)
        try {
            const userData = await AsyncStorage.getItem('petugas');
            if (userData != null) {
                fetch(`${PETUGAS_API}/cekPenjemputan/${userData}`)
                .then(response => response.json())
                .then(json => {
                    
                    setloading(false)
                    if (json.status === 200) {
                        setjemput(json.data)
                    }
                })
                .catch(error => {
                    setloading(false)
                    console.error(error);
                });
                
            }else{
                setloading(false)
                navigation.navigate("Login")
            }
        } catch (error) {
            console.log(error.message); 
        }
    };


    function listHeader() {
        return (
            <View className="pt-16 px-6 pb-4 bg-white">
                <Text className="text-sm text-slate-600 font-medium">Hello !</Text>
                <Text className="text-base text-slate-600 font-bold">{datapetugas != undefined ? datapetugas.nama : '' }</Text>
            </View>
        )
    }


    function renderItem({ item }) {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Jemput", {item})}
                className="p-6 mb-3 m-3 bg-white rounded-md"
            >
                <View className="flex flex-row items-center justify-between mb-3">
                    <View>
                        <Text className="text-base font-medium text-slate-600">{item.kode}</Text>
                        <Text className="text-[11px] text-slate-400">Menunggu penjemputan</Text>
                    </View>
                    <View className="flex flex-row items-center">
                        <Icon name="calendar" size={14} color={'grey'} />
                        <Text className="text-[11px] text-slate-400">{item.created_at}</Text>
                    </View>
                </View>
                <View className="flex flex-row items-center">
                    <Icon name="map-pin" size={16} color={'grey'} />
                    <Text className="text-[11px] text-slate-500 pl-3">{item.pelanggan.alamat}</Text>
                </View>
            </TouchableOpacity>
        )
    }





    return (
        <View className="flex-1">

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
            <FlatList
                data={jemput}
                renderItem={renderItem}
                ListHeaderComponent={listHeader}
                stickyHeaderIndices={[0]}
                className="mb-[57px]"
            />
            <View className="absolute bottom-0 w-full h-[57px] flex flex-row bg-white">
                <TouchableOpacity
                    className="w-1/3 flex items-center justify-center"
                >
                    <Icon name="home" size={24} color={'#22c55e'} />
                    <Text className="text-base text-green-500">Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Histori")}
                    className="w-1/3 flex items-center justify-center"
                >
                    <Icon name="refresh-ccw" size={24} color={'grey'} />
                    <Text className="text-base text-slate-500">Histori</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Profile")}
                    className="w-1/3 items-center justify-center"
                >
                    <Icon name="user" size={24} color={'grey'} />
                    <Text className="text-base text-slate-500">Akun</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home