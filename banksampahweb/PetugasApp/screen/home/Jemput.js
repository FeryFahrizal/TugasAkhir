import { View, Text, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icons from "react-native-vector-icons/Feather";
import PETUGAS_API from './../api/DataApi';
import { TextInput } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Jemput = ({ navigation, route }) => {

    const [jarak, setjarak] = useState(0)
    const [waktutempuh, setwaktutempuh] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);

    const [newberat, setnewberat] = useState(0);
    

    const routeParams = route.params.item;

   

    const GOOGLE_MAPS_APIKEY = 'AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k';
    const coordinates = [
        {
            latitude: -1.8036819,
            longitude: 109.9531932,
        },
        {
            latitude: Number(routeParams.pelanggan.lat),
            longitude: Number(routeParams.pelanggan.lng),
        },
    ]

    async function prosesPenjemputan() {
        
        const data = {
            id: routeParams.id,
            berat: newberat,
            total: routeParams.sampah.harga * newberat,
        }

        fetch(`${PETUGAS_API}/prosesJemput`, {
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
                navigation.replace("Home")
            } else {
                Alert.alert(`${res.status}`, `${res.message}`, [
                    { text: 'OK' },
                ]);
            }
        })
        .catch((error) => {
            
            Alert.alert(`${error.code}`, `${error.message}`, [
                { text: 'OK' },
            ]);
        });
        
    }

 
    return (

        <View>
            <MapView
                className="w-full h-full z-10"
                initialRegion={{
                    latitude: coordinates[1].latitude,
                    longitude: coordinates[1].longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={coordinates[0]} />
                <Marker coordinate={coordinates[1]} />
                <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor="#059669"
                    optimizeWaypoints={true}
                    onReady={result => {
                        setjarak(`${result.distance.toFixed(2)} km`)
                        setwaktutempuh(`${result.duration.toFixed(2)} min.`)

                    }}
                />
            </MapView>
            <View className="absolute z-50 top-0 bg-white w-full pt-12 flex flex-row items-center pb-3">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="flex items-center justify-center w-[57px] h-[57px]"
                >
                    <Icons name="arrow-left" size={24} />
                </TouchableOpacity>
                <View>
                    <Text className="text-base font-medium text-slate-500">{routeParams.pelanggan.nama}</Text>
                    <Text className="text-sm text-slate-400 ">{routeParams.kode}</Text>
                </View>
            </View>
            <View className="absolute z-50 bottom-[200px] p-4 bg-white right-[24px] rounded-md">
                <Text className="text-sm text-slate-400 ">Berat</Text>
                <Text className="text-base font-medium text-slate-500">{routeParams.berat} Kg</Text>
            </View>
            <View className="absolute z-50 bottom-0 p-6 bg-white w-full">
                <View className="flex flex-row items-center justify-between mb-2">
                    <Text className="text-base font-medium text-slate-500">Lokasi</Text>
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-sm text-slate-400">{jarak}</Text>
                        <Text className="text-sm text-slate-400 ml-2">{waktutempuh}</Text>
                    </View>
                </View>
                <Text className="text-sm text-slate-400">{routeParams.pelanggan.alamat}</Text>
                {
                    routeParams.status == 'Baru' ? (
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            className="flex items-center justify-center w-full px-6 py-3 mt-5 bg-green-600 rounded-md"
                        >
                            <Text className="text-base text-white font-medium">JEMPUT SAMPAH INI</Text>
                        </TouchableOpacity>
                    ) : (
                        routeParams.status == 'Proses' ? (
                            <Text className="text-base font-bold text-center text-green-600">Sedang diproses ...</Text>
                        ) : null
                    )
                }

            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    
                    <View className="bg-white h-auto rounded-md" style={{ width: windowWidth - 64 }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} className="flex items-center justify-center px-6 py-4 ">
                            <View className="block w-12 h-2 bg-slate-500 rounded-full"></View>
                        </TouchableOpacity>
                        <View className="p-6">
                            <View className="flex flex-row items-center justify-between mb-3">
                                <Text className="text-base font-medium text-slate-400">Sampah</Text>
                                <Text className="text-base font-medium text-slate-400">{routeParams.sampah.nama}</Text>
                            </View>
                            <View className="flex flex-row items-center justify-between mb-3">
                                <Text className="text-base font-medium text-slate-400">Harga / Kg</Text>
                                <Text className="text-base font-medium text-slate-400">{routeParams.sampah.harga}</Text>
                            </View>
                            <View className="flex">
                                <Text className="text-base font-medium text-slate-400">Masukan Berat</Text>
                                <TextInput
                                    placeholder='Masukan berat ...'
                                    onChangeText={(text) => setnewberat(text)}
                                    right={() => <Text className="text-slate-600">Kg</Text>}
                                />
                            </View>
                            <View className="flex my-3">
                                <Text className="text-base font-medium text-slate-400">TOTAL</Text>
                                <Text className="text-xl font-medium text-green2-600">{routeParams.sampah.harga * newberat}</Text>
                            </View>
                            <TouchableOpacity onPress={prosesPenjemputan} className="flex items-center justify-center px-6 py-4 bg-green-500 rounded-md mt-3">
                                <Text className="text-base font-medium text-white">Selesai</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Jemput