import { View, FlatList, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Text } from 'react-native-paper';
import Icon from "react-native-vector-icons/Feather";

const Historidetail = ({navigation,route}) => {
    
    const [datahistori, setdatahistori] = useState(route.params.item)

    {console.log(datahistori)}
    return (
        <View>
             <View className="pt-6  bg-green-600 flex flex-row items-center">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="flex items-center justify-center w-[57px] h-[57px]"
                >
                    <Icon name="arrow-left" size={24} color={'white'} />
                </TouchableOpacity>
                <Text className="text-xl text-white font-bold">DETAIL HISTORI</Text>
            </View>
            <Text className="text-base text-slate-700 font-medium uppercase p-6">Pelanggan</Text>
            <View className="bg-white">
                <View className="flex flex-row items-center justify-between px-6 py-3">
                    <View className="flex flex-row items-center">
                        <Icon name="user" size={20} color={'grey'} />
                        <Text className="text-base text-slate-500 font-medium ml-4">Nama</Text>
                    </View>
                    <Text className="text-base text-slate-600 font-medium ml-4">{datahistori.pelanggan.nama}</Text>
                </View>
                <View className="flex flex-row items-center justify-between px-6 py-3">
                    <View className="flex flex-row items-center">
                        <Icon name="phone" size={20} color={'grey'} />
                        <Text className="text-base text-slate-500 font-medium ml-4">No.Telepon</Text>
                    </View>
                    <Text className="text-base text-slate-600 font-medium ml-4">{datahistori.pelanggan.tlp}</Text>
                </View>
                <View className="px-6 py-3">
                    <View className="flex flex-row items-center">
                        <Icon name="map" size={20} color={'grey'} />
                        <Text className="text-base text-slate-500 font-medium ml-4">Alamat</Text>
                    </View>
                    <Text className="text-base text-slate-600 font-medium ml-9 mt-2">{datahistori.pelanggan.alamat}</Text>
                </View>
            </View>
            <Text className="text-base text-slate-700 font-medium uppercase p-6">Transaksi</Text>
            <View className="bg-white">
                <View className="flex flex-row items-center justify-between px-6 py-3">
                    <View className="flex flex-row items-center">
                        <Icon name="calendar" size={20} color={'grey'} />
                        <Text className="text-base text-slate-500 font-medium ml-4">Waktu</Text>
                    </View>
                    <Text className="text-base text-slate-600 font-medium ml-4">{datahistori.created_at}</Text>
                </View>
                <View className="flex flex-row items-center justify-between px-6 py-3">
                    <View className="flex flex-row items-center">
                        <Icon name="info" size={20} color={'grey'} />
                        <Text className="text-base text-slate-500 font-medium ml-4">Status</Text>
                    </View>
                    <Text className="text-base text-slate-600 font-medium ml-4">{datahistori.status}</Text>
                </View>
                <View className="flex flex-row items-center justify-between px-6 py-3">
                    <View className="flex flex-row items-center">
                        <Icon name="list" size={20} color={'grey'} />
                        <Text className="text-base text-slate-500 font-medium ml-4">Berat</Text>
                    </View>
                    <Text className="text-base text-slate-600 font-medium ml-4">{datahistori.berat} KG</Text>
                </View>
            </View>
        </View>
    )
}

export default Historidetail