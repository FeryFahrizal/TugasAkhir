import React, {useState, useEffect} from 'react'
import { View, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import { Text } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";
import { PulseIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PETUGAS_API from './../api/DataApi';


const Histori = ({ navigation }) => {

    const [dataHistori, setdataHistori] = useState('');
    const [loading, setloading] = useState(false);

    {console.log(dataHistori)}

    useEffect(() => {
        ambilHistori()
    
    }, [])
    

    async function ambilHistori(){
        setloading(true)
        try {
            const userData = await AsyncStorage.getItem('petugas');
            if (userData != null) {
                fetch(`${PETUGAS_API}/histori/${userData}`)
                .then(response => response.json())
                .then(json => {
                    setloading(false)
                    if (json.status === 200) {
                        setdataHistori(json.data)
                    }
                })
                .catch(error => {
                    setloading(false)
                    console.error(error);
                });
                
            }else{
                setloading(false)
            }
        } catch (error) {
            console.log(error.message); 
        }
    };



    function listHeader() {
        return (
            <View className="pt-6  bg-green-600 flex flex-row items-center">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="flex items-center justify-center w-[57px] h-[57px]"
                >
                    <Icon name="arrow-left" size={24} color={'white'} />
                </TouchableOpacity>
                <Text className="text-xl text-white font-bold">HISTORI</Text>
            </View>
        )
    }


    function renderItem({ item }) {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Historidetail", { item })}
                className={`p-6 mb-3 m-3 bg-white  rounded-md ${item.status == 'Baru' ? ('border-[1px] border-yellow-400') : null} ${item.status == 'Proses' ? ('border-[1px] border-cyan-400') : null} ${item.status == 'Selesai' ? ('border-[1px] border-green-400') : null} ${item.status == 'Batal' ? ('border-[1px] border-red-400') : null}`}
            >
                <View className="flex flex-row items-center justify-between mb-3">
                    <View>
                        <View>
                            <Text className="text-[11px] text-slate-400">{item.kode}</Text>
                            <Text className="text-base font-medium text-slate-600 ">{item.pelanggan.nama}</Text>
                            <View className="flex flex-row items-center mt-3">
                                <Icon name="calendar" size={14} color={'grey'} />
                                <Text className="text-[11px] text-slate-400 ml-2">{item.created_at}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        { item.status == 'Baru' ? (<Icon name="bell" size={25} color={'#f59e0b'} />) : null }
                        { item.status == 'Proses' ? (<Icon name="info" size={25} color={'#14b8a6'} />) : null }
                        { item.status == 'Selesai' ? (<Icon name="check" size={25} color={'#10b981'} />) : null }
                        { item.status == 'Batal' ? (<Icon name="x" size={25} color={'#ef4444'} />) : null }
                    </View>
                </View>
                <View className="flex flex-row items-center">
                    <Icon name="map-pin" size={16} color={'grey'} />
                    <Text className="text-[11px] text-slate-500 pl-3">{item.pelanggan.alamat}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    if (loading) {
        return(
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
        <View>
            <FlatList
                data={dataHistori}
                renderItem={renderItem}
                ListHeaderComponent={listHeader}
                stickyHeaderIndices={[0]}
                className="mb-0"
            />
        </View>
    )
}

export default Histori