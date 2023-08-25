import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text,
    StatusBar,
    TextInput, 
    TouchableOpacity,
    Alert,
    FlatList,
    RefreshControl
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import SelectDropdown from 'react-native-select-dropdown'
import { PulseIndicator } from 'react-native-indicators';
import PELANGGAN_API from './../Api/DataApi';

const Jemput = ({ navigation, route }) => {

    var randomstring = require("randomstring");

   
    const [kategoriSampah, setkategoriSampah] = useState('')
    const idPelanggan = route.params.data.id;

    
   
    const [kilo, setKilo] = useState(0);
    const [kiloFocus, setKiloFocus] = useState(false);
    const [harga, setHarga] = useState(0);
    const [idSampah, setIdSampah] = useState('');
    const [loading, setLoading] = useState(true);
    const [katFocus, setCkatFocus] = useState('');
    const kode = randomstring.generate(10);

  


    // Ambil data Sampah
    useEffect(() => {
        ambilData()
    }, []);


    async function ambilData(){
            fetch(`${PELANGGAN_API}/dataSampah`)
            .then((response) => response.json())
            .then(async (res) => {
                setLoading(false)
                if (res.status === 200) {
                    setkategoriSampah(res.data)
                    
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
    

    async function Pesan(){
        // setLoading(true)
        const data = {
            kode: kode,
            id_pelanggan: idPelanggan,
            id_sampah: idSampah,
            berat: 0,
            total: harga,
        }
        
        if (kilo == 0 && harga == 0) {
            Alert.alert(`404`, `Inputan tidak boleh kosong`, [
                { text: 'OK'},
            ]);
        }else{
            fetch(`${PELANGGAN_API}/kirimTransaksi`, {
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
                    const data = res.data
                
                    Alert.alert(`${res.status}`, `${res.message}`, [
                        { text: 'OK', onPress : () => navigation.replace("Transaksi")},
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

    function kirimData(item){
        setIdSampah(item.id)
        setHarga(item.harga)
        setCkatFocus(item.id)
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

    function renderItem({item}){

        return (
            <TouchableOpacity
                onPress={() => kirimData(item)}
                className="mb-4 flex flex-row items-center justify-between"
            >
                <View className="flex flex-row items-center">
                    <Text className={`w-[24px] h-[24px]  rounded-md ${katFocus == item.id ? ('bg-green-600') : ('border-2 border-slate-400')}`}></Text>
                    <Text className={`text-base font-medium mx-4 ${katFocus == item.id ? ('text-green-600 line-through') : ('text-slate-400')}`}>{item.nama}</Text>
                </View>
                <Text className={`text-base font-medium mx-4 ${katFocus == item.id ? ('text-green-600 line-through') : ('text-slate-400 ')}`}>{item.harga}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <View 
            className="bg-white flex-1"
        >
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
            <View className="flex flex-row items-center bg-green-600 pt-8 pb-3">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-[57px] h-[57px] flex items-center justify-center"
                >
                    <Icon name={'chevron-left'} size={24} color={`#FFFFFF`} />
                </TouchableOpacity>
                <Text className="text-white font-medium ml-3 text-xl">JEMPUT SAMPAH</Text>
            </View>

            <View className="p-6 flex items-center justify-center h-[615px]">
                <View className="mb-6 w-full">
                    <Text className="text-base font-medium text-slate-500 mb-3">Kategori Sampah</Text>
                   
                    <FlatList 
                        data={kategoriSampah}
                        renderItem={renderItem}
                    />
                  
                </View>
                
               
            </View>
            <View className="flex flex-row items-center justify-between px-6">
                    <Text className="text-xl font-bold text-green-600">Rp.{kilo == 0 ? harga : kilo * harga }</Text>
                    <TouchableOpacity
                        onPress={() => Pesan()}
                        className=" bg-green-600 w-[180px] flex items-center justify-center px-6 py-4 rounded-md"
                    >
                        <Text className="text-sm text-white">JEMPUT SEKARANG</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default Jemput