import React, { useState } from 'react'
import {View,Text,TextInput,Button,ScrollView,Dimensions,TouchableOpacity, Alert, ShadowPropTypesIOS} from 'react-native'
import {
    OutlinedTextField, TextField,
  } from 'react-native-material-textfield';
  import ImagePicker from 'react-native-image-picker';
import NumericInput from 'react-native-numeric-input'
import { Avatar } from 'react-native-elements';
import Eicon from 'react-native-vector-icons/Entypo'
import Aicon from 'react-native-vector-icons/AntDesign'
import FAIcon from 'react-native-vector-icons/FontAwesome'
//import { } from 'react-native-gesture-handler';
  const {height,width}=Dimensions.get('window')
  import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { postDataAndImage } from './FetchServices';
import {useDispatch} from 'react-redux'
  const options = {
    title: 'Select Avatar',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };




export default function B(props){

    const [photosource,setPhotosource]=useState(null)
    const [photo,setPhoto]=useState(null)
    const [getTitle,setTitle]=useState('')
    const [getCategory,setCategory]=useState('')
    const [getDescription,setDescription]=useState('')
    const [getArticle,setArticle]=useState('')
    const [getAvailable,setAvailable]=useState('')
    const [getInitialValue,setInitialValue]=useState('')
    const [getDateState, setDateState] = useState(false)
    const [getDateState2, setDateState2] = useState(false)
    const [getDiscount,setDiscount]=useState('')
    const[getDate,setDate]=useState(new Date())
    const [getDate2,setDate2]=useState('')
    const [getFinalValue,setFinalValue]=useState('')
    const[tempdate,setTempdate]=useState(new Date())

    const dispatch=useDispatch()
    
     const addnewrecord=async()=>{

      if(getTitle!='' && getCategory!='' && getArticle!='' && getDescription!='' && getAvailable!='' && getDate!='' && getDate2!='' && getInitialValue!='' && getDiscount!='' && getFinalValue!='' && photo!='' && photosource!=''  ){
        let formData=new FormData()
      formData.append('title',getTitle)
      formData.append('category',getCategory)
      formData.append('name',getArticle)
      formData.append("description",getDescription)
      formData.append('quantity',getAvailable)
      formData.append('availability_start',getDate)
      formData.append('availability_end',getDate2)
      
      formData.append('price',getInitialValue)
      formData.append('discount',getDiscount)
      formData.append('finalprice',getFinalValue)
      formData.append('photo', {
				uri: photosource,
				type: 'image/jpeg',
				name: `${getTitle}pic.jpg`
      });
      console.log(formData)
      const config={header:{'content-type':'mutipart/form-data'}}
      const result=await postDataAndImage('form/submitform',formData,config)
      console.log(result)
      if(result)
      {
        dispatch({type:'POST',payload:[getTitle+getArticle,formData]})
        setTitle('')
        setCategory('')
        setArticle('')
        setDate('')
        setDate2('')
        setPhotosource(null)
        setDescription('')
        setInitialValue('')
        setDiscount('')
        setFinalValue('')
      }
      else{
        alert('not submitted')


      }
      }
      else{
        Alert.alert("Please Fill All Fields","")
      }

      
    }

    const handleDatePicked =async (date) => {
      console.log('A date has been picked: ', date);
      const ndate = moment(date).format('MMMM D, YYYY')
      console.log(ndate)
      setDateState(false)
      setDate(ndate)
      setTempdate(date)
      
    }

    const handleDatePicked2 =async (date) => {
      console.log('A date has been picked: ', date);
      const ndate = moment(date).format('MMMM D, YYYY');
      console.log(ndate)
      setDateState2(false)
      setDate2(ndate);
    };
  

    const myfunction=()=>{
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
                setPhotosource(response.uri)
                setPhoto(response.data)
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
             }
          });
    }

    const handleDiscount=(data)=>{
      setDiscount(data)
      let price=getInitialValue
      let disprice=getInitialValue*data/100
      let np=price-disprice
      console.log(np)
      setFinalValue(np)
    }

    return(<ScrollView>
        <View style={{padding:10,marginTop:'3%',color:'white'}}>
            <View>
           <OutlinedTextField  
            label='Title'
            containerStyle={{borderRadius:15}}
            value={getTitle}
            onChangeText={(item)=>setTitle(item)}
            />
            </View>
            <View>
            <OutlinedTextField 
            label='Category'
            value={getCategory}
            containerStyle={{borderRadius:15}}
            onChangeText={(item)=>setCategory(item)}
            />
            </View>
            <View>
            <OutlinedTextField 
            label='Article name'
            value={getArticle}
            onChangeText={(item)=>setArticle(item)}
            />
            </View>
            <View style={{padding:15,justifyContent:'center',alignItems:'center'}}>
                  <View style={{}}>
                   <Avatar
                     rounded
                     onPress={myfunction}
                     size='large'
                    source={{
                        uri:photosource!=null?photosource:'data:image/jpeg;base64,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'
                            }}
                            />
                   </View>
                   <Text>Upload Image</Text>

                   
               </View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
              <View>
                  <Text style={{fontWeight:'500'}}>Available Quantity:</Text>
                  </View>
                  <View style={{marginRight:15}}>
                  <NumericInput style={{width:width*0.2}}
               rounded 
               textColor='#B0228C'
               totalWidth={70}
               rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'
            minValue={1}
            onChange={value =>setAvailable(value)}
           
            iconStyle={{ color: 'white' }}
               />
                      </View>
            
                </View>
                <View style={{marginTop:8}}>
                <OutlinedTextField 
            label='Description'
            multiline
            onChangeText={(data)=>setDescription(data)}
            />

               </View>
               <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingLeft:15,paddingTop:5}}>
               <View>
                   <Text>Initial price</Text>
               </View>
               <View>
                   <Text>Discount (In %)</Text>
               </View>
               <View>
                   <Text style={{paddingRight:15}} >Final Price</Text>
               </View>
               </View>
               <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',padding:15}}>
               <View>
               <TextInput
      style={{ height:40 ,width:100, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => setInitialValue(text)}
      keyboardType={'decimal-pad'}
      // value={value}
    />
               </View>
               <View>
               <NumericInput style={{width:width*0.2,}}
               rounded 
               textColor='#B0228C'
               totalWidth={80}
               rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'
            minValue={0}
           onChange={(data)=>handleDiscount(data)}
            iconStyle={{ color: 'white' }}
               />
               </View>
               <View>
                       <Text
            style={{ height:40 ,width:100, borderColor: 'gray', borderWidth: 1,padding:10 }}
            //onChangeText={text => onChangeText(text)}
            value={getFinalValue}
             
          >{getFinalValue}</Text>
               </View>
               </View>
               
               <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:5}} >
                 <Text style={{marginHorizontal:'10%'}}>Availability Period:  </Text>

               <FAIcon name="calendar" size={30} onPress={()=>setDateState(true)}/>
                   <DateTimePicker
                   minimumDate={new Date()}
						isVisible={getDateState}
						onConfirm={(date) => handleDatePicked(date)}
						onCancel={() => setDateState(false)}
						format="YYYY-MM-DD"
						mode="date"
					/>
          <Text style={{marginHorizontal:'3%'}}>To</Text>

<FAIcon  name="calendar" size={30} onPress={()=>setDateState2(true)}/>
                   <DateTimePicker
            isVisible={getDateState2}
            minimumDate={tempdate}
						onConfirm={(date) => handleDatePicked2(date)}
						onCancel={() => setDateState2(false)}
						format="YYYY-MM-DD"
						mode="date"
					/>
               </View>
               <TouchableOpacity onPress={addnewrecord} >
               <View style={{justifyContent:'center',alignItems:'flex-end',marginTop:10}}> 
               <Aicon name={'checkcircle'} style={{marginRight:10}} size={60}/>
                   </View>
                   </TouchableOpacity>

                   <View>

                    <View>
                     <TouchableOpacity onPress={()=>props.navigation.navigate('Display')} style={{marginTop:15}}>
                       <Text style={{textAlign:'center',fontSize:25,borderRadius:20,backgroundColor:'orange',padding:5,textColor:'#fff'}} >Display All</Text>
                     </TouchableOpacity>
                     </View>
                  
                       </View>
            </View>
            </ScrollView>
    )



}