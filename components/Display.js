import React, { useState, useEffect } from 'react';
import {
    TextInput,
    Dimensions,
    Alert,
    Button,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    View,
    FlatList,
    StyleSheet,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { getData, postData, BaseUrl } from './FetchServices';
// import { NavigationEvents } from 'react-navigation';
const { width, height } = Dimensions.get('window');
import { useSelector } from 'react-redux';


function Item({ item, props }) {

    console.log(`${BaseUrl}/images/${item.image}`)
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity disabled>
                <View style={styles.item}>
                    <Image style={styles.imageStyle} source={{ uri: BaseUrl + '/images/' + item.image }} />

                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={styles.title}>Title: {item.title}</Text>
                            <Text style={styles.descStyle}>Category: {item.category}</Text>
                            <Text>Name: {item.name}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                            <Text>Available:</Text>
                            <Text>From: {item.availability_start}</Text>
                            <Text>to: {item.availability_end}</Text>
                            <Text>Price: {item.price}</Text>
                            <Text>Discount: {item.discount}%</Text>
                            
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 5,
                                marginLeft: -5,
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: '#e58e26'
                            }}
                        >
                            <Text style={{ color: '#ffffff', fontWeight: '700' }}>{'\u20B9'} {item.finalprice}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    );
}


export default function Display(props) {
    const [getList, setList] = useState([]);
	
	// const profile=useSelector(state=>state.profile)
	// console.log("'PROFILE......'",Object.values(profile)[0].field)

    const readAllRedcords = async () => {
        var list = await getData('form/displayall');
        console.log(list)
        setList(list);
    };



    useEffect(()=>{
        readAllRedcords()
    },[])
    return (

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* <NavigationEvents onWillFocus={() => fetchPlans()} /> */}
                

                <View style={styles.mainHeadStyle}>
                    <Text style={{ marginTop: 39, fontSize: 23, fontWeight: 'bold', color: '#3B7BBF' }}>Display All</Text>
                </View>

                <View style={{marginTop:10}} >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
                            style={{height:height*0.85}}
                            data={getList}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <Item item={item} props={props} />}
                            keyExtractor={(item) => item.id}
                        />
                    </ScrollView>
                </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 1,
        padding: 4
    },
    item: {
        backgroundColor: 'white',
        width: width * 0.9,
        // height: 90,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        borderColor: '#222f3e',
        borderWidth: 0.1,
        //elevation: 2,
        marginBottom: 10,
        overflow: 'hidden'
    },

    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 7
    },

    imageStyle: {
        borderRadius: 15,
        width: 60,
        height: 60,
        marginBottom: 20,
        padding: 5,
        marginRight: 15
    },
    itemcircle: {
        flexDirection: 'row',
        backgroundColor: '#feecef',
        padding: 5
    },
    mcircle: {
        flexDirection: 'row',
        borderColor: '#dadada',
        borderTopWidth: 1,
        backgroundColor: '#fff'
    },
    imgcircle: {
        borderRadius: 50,
        width: 40,
        height: 40
    },
    loginContainer: {
        flexDirection: 'row',
        backgroundColor: '#eb3b5a',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#ecf0f1',

        borderRadius: 15
    },
    priceStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fbc531'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        width: width * 0.5
    },

    descStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        width: width * 0.5,
        // padding: 5,
        color: '#636e72'
    },

    buttonStyle: {
        marginTop: 40,
        fontWeight: 'bold',
        marginRight: 100,
        borderRadius: 15
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ecf0f1'
    },
    textContainer: {
        width: width * 0.9,
        flexDirection: 'row',
        // marginBottom: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        // shadowOpacity: 2.25,
        // shadowRadius: 2.84,
        height: 40,
        backgroundColor: 'white',
        borderColor: '#f3f3f3',
        borderWidth: 0.5,
        borderRadius: 10,
        elevation: 1,
        marginBottom: 9
    },
    mainHeadStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100%'
    },
    emailIcon: {
        color: '#999',
        marginLeft: 50
    },
    textStyleText: {
        fontSize: 16,
        fontWeight: 'bold',
        width: width * 0.9,

        marginLeft: 5
    }
});
// IListPlan.navigationOptions = ({ navigation }) => ({
//     header: null
// });
