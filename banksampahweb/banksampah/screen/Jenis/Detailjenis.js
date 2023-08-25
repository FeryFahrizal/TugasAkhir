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
    FlatList,
    ScrollView
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import SelectDropdown from 'react-native-select-dropdown'
import { PulseIndicator } from 'react-native-indicators';

const Detailjenis = ({ route, navigation }) => {
    var title = route.params.item.nama;
    var deskripsi = route.params.item.deskripsi;
    
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
                <Text className="text-white font-medium ml-3 text-xl uppercase">{title}</Text>
            </View>
            <ScrollView className="">
                <Text className="text-slate-500 text-base text-left px-6 pt-6 mb-[100px] pb-6 ">{deskripsi}</Text>
            </ScrollView>
        </View>

    )
}

export default Detailjenis