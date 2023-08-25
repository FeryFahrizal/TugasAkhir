import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { PulseIndicator } from 'react-native-indicators';
import PELANGGAN_API from './../Api/DataApi';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Register = ({ navigation, route }) => {

    const alamatMaps = route.params === undefined ? 'Alamat ...' : route.params.alamat;
    const latMaps = route.params === undefined ? null : route.params.lat;
    const lngMaps = route.params === undefined ? null : route.params.lng;


    const [nama, setnama] = useState('');
    const [namafocus, setnamafocus] = useState(false);
    const [alamat, setalamat] = useState(alamatMaps);
    const [alamatfocus, setalamatfocus] = useState(false);
    const [tlp, settlp] = useState('');
    const [tlpfocus, settlpfocus] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [loading, setLoading] = useState(false);
    const [iconPassword, setIconPassword] = useState('eye-off');
    const [tipePass, setTipePass] = useState(true);


    function ubahType(){
        if (tipePass) {
            setIconPassword('eye')
            setTipePass(false)
        }else{
            setIconPassword('eye-off')
            setTipePass(true)
        }
    }

    function handleRegistrsi() {
        setLoading(true)
        const data = {
            nama: nama,
            tlp: tlp,
            password: password,
            alamat: alamat,
            lat: latMaps,
            lng: lngMaps,
        }

        if (nama == "" && alamat == "Alamat ..." && tlp == "") {
            setLoading(false)
            Alert.alert('Peringatan', 'Inputan tidak boleh kosong', [
                { text: 'OK'},
            ]);
        } else {

            fetch(`${PELANGGAN_API}/registrasi`, {
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
                    console.log(res)
                    Alert.alert(`${res.status}`, `${res.message}`, [
                        { text: 'OK', onPress: () => navigation.navigate('Login') },
                    ]);
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
        <View className="flex-1 bg-yellow-600">
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
            <View className="">
                <View className="pt-8">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        className="ml-2"
                    >
                        <Icon name={'arrow-left'} size={24} color={`white`} />
                    </TouchableOpacity>
                    <View className="pt-6 px-6">
                        <Text className="text-3xl font-medium text-slate-100">REGISTRASI</Text>
                        <Text className="text-base font-medium text-slate-200">Silahkan registrasi akun anda agar dapat menggunakan layanan kami</Text>
                    </View>
                </View>
            </View>
            <View className="bg-white mt-6 p-6 rounded-tr-[50px] flex items-center justify-center" style={{ height: height - 190 }}>
                <View className="mb-3">
                    <Text className="text-base font-medium text-slate-600 mb-2">Alamat Lengkap</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Konfirmasi')}
                        className={`flex flex-row items-center border-2 ${alamatfocus == true || alamat != null ? ('border-green-600') : ('border-slate-300')} rounded-md relative`}>
                        <View className="flex items-center justify-center w-[57px] h-[57px]">
                            <Icon name={'map'} size={24} color={`${alamatfocus == true || alamat != undefined ? ('#16A34A') : ('#64748B')}`} />
                        </View>
                        <View className="flex justify-center  w-[251px] py-2">
                            <Text className="text-base font-medium text-slate-400">{alamatMaps}</Text>
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
                    onPress={handleRegistrsi}
                    className="px-6 py-4 bg-yellow-600 flex items-center justify-center rounded-md mt-3 w-full"
                >
                    <Text className="text-base font-medium text-white">REGISTRASI</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register;