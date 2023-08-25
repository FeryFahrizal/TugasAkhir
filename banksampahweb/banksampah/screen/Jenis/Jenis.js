import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import SelectDropdown from 'react-native-select-dropdown'
import { PulseIndicator } from 'react-native-indicators';
import PELANGGAN_API from './../Api/DataApi';
import IMAGE_API from './../Api/ImageApi';

const Jenis = ({navigation}) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('');
    const imgUrl = `${IMAGE_API}`;



    useEffect(() => {
        async function ambilJenisSampah(){
            try {
                fetch(`${PELANGGAN_API}/dataSampah`)
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
            } catch (error) {
                console.log(error.message); 
            }
        };
        ambilJenisSampah()
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


   


    function renderItem({ item }) {
      
        return (
            <TouchableOpacity
                className="relative m-3"
                onPress={() => navigation.navigate("Detailjenis", {item})}
            >
                <ImageBackground source={{ uri: `${imgUrl}/${item.gambar}` }} resizeMode='contain' className="flex flex-row items-center w-full bg-white mt-6 h-[130px]" />
                <View className="absolute w-full h-full bg-green-600 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <Text className="text-xl font-bold text-white">{item.nama}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View>
            <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
            <View className="flex flex-row items-center bg-green-600 pt-8 pb-3">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-[57px] h-[57px] flex items-center justify-center"
                >
                    <Icon name={'chevron-left'} size={24} color={`#FFFFFF`} />
                </TouchableOpacity>
                <Text className="text-white font-medium ml-3 text-xl">JENIS SAMPAH</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
            />
        </View>
    )
}

export default Jenis