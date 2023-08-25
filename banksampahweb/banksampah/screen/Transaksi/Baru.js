import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	FlatList,
	ScrollView,
	Alert
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { PulseIndicator } from 'react-native-indicators';
import Moment from 'moment';
import  PELANGGAN_API  from "./../Api/DataApi";


const Baru = ({navigation, route}) => {
  
	const [datatransaksi, setdatatransaksi] = useState('')
	const [loading, setLoading] = useState(true);

	Moment.locale('id');
	useEffect(() => {
		ambilData()
	}, [])
	
	const dataId = route.params.dataId;

	{console.log(dataId)}

	async function ambilData(){


		fetch(`${PELANGGAN_API}/transaksiBaru/${dataId}`)
		.then((response) => response.json())
		.then(async (res) => {
			setLoading(false)
			if (res.status === 200) {
				setdatatransaksi(res.data)
			   
			}else{
				setLoading(false)
				Alert.alert(`${res.status}`, `${res.message}`, [
					{ text: 'OK'},
				]);
			}
		})
		.catch((error) => {
			
			Alert.alert(`${error.code}`, `${error.message}`, [
				{ text: 'OK'},
			]);
		});
	}

	

	

	
	  function renderData({item}){
		 return(
			<TouchableOpacity
				onPress={() => navigation.navigate("Detailtransaksi", {item})}
				className="p-6 border-b-2 border-b-slate-300 flex flex-row items-center justify-between bg-white"
				>
				<View>
					<View className="flex flex-row items-center mt-2">
						<Icon name={'slack'} size={18} color={`grey`} />
						<Text className="text-sm text-slate-600 font-medium ml-2">#{item.kode}</Text>
					</View>
					<View className="flex flex-row items-center mt-2">
						<Icon name={'calendar'} size={16} color={`grey`} />
						<Text className="text-sm text-slate-400 ml-2">{Moment(item.created_at).format('d MMMM Y, H:m')}</Text>
					</View>
				</View>
				{ item.status == 'Baru' ? (<Text className="text-sm text-yellow-400 ml-2">{item.status}</Text>) : null }
				{ item.status == 'Proses' ? (<Text className="text-sm text-cyan-400 ml-2">{item.status}</Text>) : null }
				{ item.status == 'Selesai' ? (<Text className="text-sm text-green-400 ml-2">{item.status}</Text>) : null }
				{ item.status == 'Batal' ? (<Text className="text-sm text-red-400 ml-2">{item.status}</Text>) : null }
			</TouchableOpacity>
		 )
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

	return (
		<View className="">
			<StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
			<View className="flex flex-row items-center bg-green-600 pt-8 pb-3">
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="w-[57px] h-[57px] flex items-center justify-center"
				>
					<Icon name={'chevron-left'} size={24} color={`#FFFFFF`} />
				</TouchableOpacity>
				<Text className="text-white font-medium ml-3 text-xl uppercase">riwayat transaksi</Text>
			</View>
			

			{
				datatransaksi == '' ? (
					<View className="w-screen h-[81%] flex items-center justify-center bg-white">
						<Text className="text-base font-medium text-slate-400">Belum ada data untuk ditampilkan !</Text>
					</View>
				) : 
				(
					<FlatList
						data={datatransaksi}
						renderItem={renderData}
						className="mb-14"
					/>
				)
			}
		
			
		</View>
		
	);
}

export default Baru