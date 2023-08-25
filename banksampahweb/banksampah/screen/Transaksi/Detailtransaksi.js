import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { PulseIndicator } from 'react-native-indicators';
import PELANGGAN_API from './../Api/DataApi';
import Moment from 'moment';

const Detailtransaksi = ({ navigation, route }) => {

    const [data, setdata] = useState(route.params.item);
    const [loading, setLoading] = useState(false);


    function batalkanPesanan() {

        fetch(`${PELANGGAN_API}/batalkanTransaksi/${data.id}`)
            .then((response) => response.json())
            .then(async (res) => {
                setLoading(true)
                if (res.status === 200) {
                    setLoading(false)
                    Alert.alert(`${res.status}`, `${res.message}`, [
                        { text: 'OK', onPress : () => navigation.replace("Transaksi")},
                    ]);
                } else {
                    setLoading(false)
                    Alert.alert(`${res.status}`, `${res.message}`, [
                        { text: 'OK' },
                    ]);
                }
            })
            .catch((error) => {

                setLoading(false)
                Alert.alert(`${error.code}`, `${error.message}`, [
                    { text: 'OK' },
                ]);
            });
    }

    function selesaikanPesanan() {

        fetch(`${PELANGGAN_API}/selesaikanTransaksi/${data.id}`)
            .then((response) => response.json())
            .then(async (res) => {
                setLoading(true)
                if (res.status === 200) {
                    setLoading(false)
                    Alert.alert(`${res.status}`, `${res.message}`, [
                        { text: 'OK', onPress : () => navigation.replace("Transaksi")},
                    ]);
                } else {
                    setLoading(false)
                    Alert.alert(`${res.status}`, `${res.message}`, [
                        { text: 'OK' },
                    ]);
                }
            })
            .catch((error) => {

                setLoading(false)
                Alert.alert(`${error.code}`, `${error.message}`, [
                    { text: 'OK' },
                ]);
            });
    }

    function showAlert(){
        Alert.alert(`Peringatan !`, `Yakin ingin membatalkan pesanan ini ?!`, [
            { text: 'IYA BATALKAN', onPress: () => batalkanPesanan() },
            {
                text: 'TIDAK',
                style: 'cancel',
              },
        ]);
    }
    function showAlert1(){
        Alert.alert(`Peringatan !`, `Yakin ingin menyelesaikan pesanan ini ?!`, [
            { text: 'IYA SELESAIKAN', onPress: () => selesaikanPesanan() },
            {
                text: 'TIDAK',
                style: 'cancel',
              },
        ]);
    }

    if (loading) {
        return (
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
        <View className="flex-1">
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
            <View className="flex flex-row items-center bg-green-600 pt-8 pb-3">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-[57px] h-[57px] flex items-center justify-center"
                >
                    <Icon name={'chevron-left'} size={24} color={`#FFFFFF`} />
                </TouchableOpacity>
                <Text className="text-white font-medium ml-3 text-xl uppercase">detail transaksi </Text>
            </View>
            <View className="p-6 ">
                <View className="p-6 bg-white mb-3 rounded-md">
                    <Text className="text-base text-slate-500 font-medium mb-3">TRANSAKSI</Text>
                    <View className="flex flex-row items-center justify-between mb-3">
                        <Text className="text-sm text-slate-400 font-medium">Kode</Text>
                        <Text className="text-sm text-slate-500 font-medium">{data.kode}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between mb-3">
                        <Text className="text-sm text-slate-400 font-medium">Tanggal</Text>
                        <Text className="text-sm text-slate-500 font-medium">{Moment(data.created_at).format('d-MM-Y, H:m')}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between mb-3">
                        <Text className="text-sm text-slate-400 font-medium">Status</Text>
                        <Text className="text-sm text-slate-500 font-medium">{data.status}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-sm text-slate-400 font-medium">Berat</Text>
                        <Text className="text-sm text-slate-500 font-medium">{data.berat} KG</Text>
                    </View>
                </View>
                <View className="p-6 bg-white rounded-md mb-3">
                    <Text className="text-base text-slate-500 font-medium mb-3">SAMPAH</Text>
                    <View className="flex flex-row items-center justify-between mb-3">
                        <Text className="text-sm text-slate-400 font-medium">Jenis</Text>
                        <Text className="text-sm text-slate-500 font-medium">{data.sampah.nama}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-sm text-slate-400 font-medium">Harga</Text>
                        <Text className="text-sm text-slate-500 font-medium">{data.sampah.harga} / KG</Text>
                    </View>
                </View>
                <View className="p-6 bg-white rounded-md mb-3">
                    <Text className="text-base text-slate-500 font-medium mb-3">PETUGAS</Text>
                    <View className="flex flex-row items-center justify-between mb-3">
                        <Text className="text-sm text-slate-400 font-medium">Nama</Text>
                        <Text className="text-sm text-slate-500 font-medium">{data.petugas == null ? '-' : data.pet}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-sm text-slate-400 font-medium">Telepon</Text>
                        <Text className="text-sm text-slate-500 font-medium">{data.petugas == null ? '-' : data.petugas.tlp}</Text>
                    </View>
                </View>
            </View>
            <View className="p-6 bg-white rounded-md absolute w-full bottom-0 flex flex-row items-center justify-between">

                <View className="flex mb-3">
                    <Text className="text-base text-slate-500 font-medium mb-3">TOTAL</Text>
                    <Text className="text-xl text-slate-500 font-medium">
                        {data.berat != 0 ? data.total : 'Belum ditimbang'}
                    </Text>
                </View>
                {data.status == 'Baru' ? (
                        <TouchableOpacity
                            onPress={showAlert}
                            className="flex items-center justify-center bg-red-600 px-6 py-3 rounded-md"
                        >
                            <Text className="font-medium text-base text-white">BATALKAN</Text>
                        </TouchableOpacity>
                    ) : null
                     
                }
           

            </View>
        </View>
    )
}

export default Detailtransaksi