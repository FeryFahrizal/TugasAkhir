import React, { useEffect, useState } from 'react'
import { View, Text, Alert, StatusBar, Image, TextInput, TouchableOpacity, Dimensions, Modal } from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { PulseIndicator } from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PELANGGAN_API from './../Api/DataApi';

const Profile = ({ navigation, route }) => {

    
    const [profile, setProfile] = useState(route.params.data);
    const [modalUpdate, setModalUpdate] = useState(false);
    
    const alamatMaps = route.params.alamat === undefined ? '' : route.params.alamat;
    const latMaps = route.params.lat === undefined ? '' : route.params.lat;
    const lngMaps = route.params.lng === undefined ? '' : route.params.lng;



    const [nama, setnama] = useState(profile.nama);
    const [namafocus, setnamafocus] = useState(false);
    const [alamat, setalamat] = useState(alamatMaps);
    const [lat, setlat] = useState(latMaps);
    const [lng, setlng] = useState(lngMaps);
    const [alamatfocus, setalamatfocus] = useState(false);
    const [tlp, settlp] = useState(profile.tlp);
    const [tlpfocus, settlpfocus] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [loading, setLoading] = useState(false);
    const [iconPassword, setIconPassword] = useState('eye-off');
    const [tipePass, setTipePass] = useState(true);

  

    function ubahType() {
        if (tipePass) {
            setIconPassword('eye')
            setTipePass(false)
        } else {
            setIconPassword('eye-off')
            setTipePass(true)
        }
    }

    async function hapusSesi(){
        try {
            const userData = await AsyncStorage.removeItem('pelanggan');
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

    function handleUpdate() {
        setLoading(true)
        const data = {
            nama: nama == '' ? profile.nama : nama,
            tlp: tlp == '' ? profile.tlp : tlp,
            password: password,
            alamat: alamat == '' ? profile.alamat : alamat,
            lat: lat == '' ? profile.lat : lat,
            lng: lng == '' ? profile.lng : lng,
        }


        fetch(`${PELANGGAN_API}/updateProfile/${profile.id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((res) => {
                setLoading(false)
                if (res.status === 200) {
                    const data = res.data;
                    setModalUpdate(false)
                    Alert.alert(`${res.status}`, `${res.message}`, [
                        { text: 'OK', onPress: () => navigation.replace('Profile', {data}) },
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
        <View className="bg-white flex-1">
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
            <View className="flex flex-row items-center bg-green-600 pt-8 pb-3">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-[57px] h-[57px] flex items-center justify-center"
                >
                    <Icon name={'chevron-left'} size={24} color={`#FFFFFF`} />
                </TouchableOpacity>
                <Text className="text-white font-medium ml-3 text-xl">PROFILE</Text>
            </View>
            <View className="p-6">
                <View className="">

                </View>
                <View className="py-3 border-b-2 border-b-slate-200">
                    <View className="flex flex-row items-center mb-2">
                        <Icon name="user" size={20} color={'#64748b'} />
                        <Text className="text-base font-medium text-slate-500 ml-3">Nama</Text>
                    </View>
                    <Text className="text-base font-medium text-slate-400 ml-8">{profile.nama}</Text>
                </View>
                <View className="py-3 border-b-2 border-b-slate-200">
                    <View className="flex flex-row items-center mb-2">
                        <Icon name="phone" size={20} color={'#64748b'} />
                        <Text className="text-base font-medium text-slate-500 ml-3">No.Telepon / Hp</Text>
                    </View>
                    <Text className="text-base font-medium text-slate-400 ml-8">{profile.tlp}</Text>
                </View>
                <View className="py-3 border-b-2 border-b-slate-200">
                    <View className="flex flex-row items-center mb-2">
                        <Icon name="map" size={20} color={'#64748b'} />
                        <Text className="text-base font-medium text-slate-500 ml-3">Alamat</Text>
                    </View>
                    <Text className="text-base font-medium text-slate-400 ml-8">{profile.alamat}</Text>
                </View>
                <View className="py-3 border-b-2 border-b-slate-200">
                    <View className="flex flex-row items-center mb-2">
                        <Icon name="key" size={20} color={'#64748b'} />
                        <Text className="text-base font-medium text-slate-500 ml-3">Password</Text>
                    </View>
                    <Text className="text-base font-medium text-slate-400 ml-8">{profile.password}</Text>
                </View>
            </View>
            <View className="absolute bottom-0 w-full gap-3 p-6 flex flex-row items-center">
                <TouchableOpacity
                    onPress={() => setModalUpdate(true)}
                    className="border-2 border-green-600 w-1/2 flex items-center justify-center rounded-full px-6 py-3"
                >
                    <Text className="block font-medium text-base text-green-600 uppercase">UPDATE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleLogout}
                    className="border-2 border-red-600 w-1/2 flex items-center justify-center rounded-full px-6 py-3"
                >
                    <Text className="block font-medium text-base text-red-600 uppercase">LOGOUT</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalUpdate}
                onRequestClose={() => {
                    setModalUpdate(!modalUpdate);
                }}>
                <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
                <View className="flex flex-row items-center bg-green-600 pt-0 pb-3">
                    <TouchableOpacity
                        onPress={() => setModalUpdate(!modalUpdate)}
                        className="w-[57px] h-[57px] flex items-center justify-center"
                    >
                        <Icon name={'chevron-left'} size={24} color={`#FFFFFF`} />
                    </TouchableOpacity>
                    <Text className="text-white font-medium ml-3 text-xl">UPDATE PROFILE</Text>
                </View>
                <View className="flex-1 top-0 bg-white p-6">
                    <View className="mb-3">
                        <Text className="text-base font-medium text-slate-600 mb-2">Alamat Lengkap</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AlamatUpdate', {profile})}
                            className={`flex flex-row items-center border-2 ${alamatfocus == true || alamat != null ? ('border-green-600') : ('border-slate-300')} rounded-md relative`}>
                            <View className="flex items-center justify-center w-[57px] h-[57px]">
                                <Icon name={'map'} size={24} color={`${alamatfocus == true || alamat != undefined ? ('#16A34A') : ('#64748B')}`} />
                            </View>
                            <View className="flex justify-center  w-[251px] py-2">
                                <Text className="text-base font-medium text-slate-400">{profile.alamat}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="mb-3">
                        <Text className="text-base font-medium text-slate-600 mb-2">Nama</Text>
                        <View className={`flex flex-row items-center border-2 ${namafocus == true || nama.length != 0 ? ('border-green-600') : ('border-slate-300')} rounded-md relative`}>
                            <View className="flex items-center justify-center w-[57px] h-[57px]">
                                <Icon name={'user'} size={24} color={`${namafocus == true || nama.length != 0 ? ('#16A34A') : ('#64748B')}`} />
                            </View>
                            <TextInput
                                placeholder='Nama lengkap ...'
                                placeholderTextColor={'#A4ABB3'}
                                onChangeText={(val) => setnama(val)}
                                value={nama}
                                
                                className="font-medium text-base w-[251px] h-[57px] text-slate-600"
                                onFocus={() => setnamafocus(true)}
                                onBlur={() => setnamafocus(false)}
                            />
                        </View>
                    </View>
                    <View className="mb-3">
                        <Text className="text-base font-medium text-slate-600 mb-2">No.Telepon</Text>
                        <View className={`flex flex-row items-center border-2 ${tlpfocus == true || tlp.length != 0 ? ('border-green-600') : ('border-slate-300')} rounded-md relative`}>
                            <View className="flex items-center justify-center w-[57px] h-[57px]">
                                <Icon name={'phone'} size={24} color={`${tlpfocus == true || tlp.length != 0 ? ('#16A34A') : ('#64748B')}`} />
                            </View>
                            <TextInput
                                placeholder='Masukan No.Tlp'
                                placeholderTextColor={'#A4ABB3'}
                                onChangeText={(val) => settlp(val)}
                                value={tlp}
                                className="font-medium text-base w-[251px] h-[57px] text-slate-600"
                                onFocus={() => settlpfocus(true)}
                                onBlur={() => settlpfocus(false)}
                            />
                        </View>
                    </View>
                    <View className="mb-3">
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
                        onPress={handleUpdate}
                        className="px-6 py-4 bg-green-600 flex items-center justify-center rounded-md mt-3 w-full"
                    >
                        <Text className="text-base font-medium text-white">UPDATE</Text>
                    </TouchableOpacity>
                </View>
            </Modal>



        </View>
    )
}

export default Profile