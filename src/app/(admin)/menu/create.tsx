import Button from '@/components/Button';
import { defualtPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image, Alert} from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';
import { coolDownAsync } from 'expo-web-browser';


const CreateProductScreen = () => {
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');

    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const {id} = useLocalSearchParams();
    const isUpdating = !!id;


    const resetFeilds = () => {
        setName('');
        setPrice('');
    };

    const validateInput = () => {
        setErrors ('');
        if (!name){
            setErrors ('Name is Required');
            return false;
        }
        if (!price){
            setErrors ('Price is Required');
            return false;
        }
        if (isNaN(parseFloat(price))){
            setErrors ('Price is not a number');
            return false;
        }

        return true;

    }

    const onSubmit = ()=> {
        if (isUpdating){
            //update
            onUpdateCreate();
        } else {
            onCreate();
        }
    }

    const onUpdateCreate = () => {
        if (!validateInput()){
            return;
        }
        console.warn('Updating product: ');
        resetFeilds();
    };

    // save in the database

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
      const onDelete = () => {
        console.warn ("Delete!!!!");
      }
      const confirmDelete = () => {
        Alert.alert('Confrim', 'Are you sure want to delete this product', [
            {
                text: 'Cancel',
        },
        {
            text: 'Delete',
            style: 'destructive',
            onPress: onDelete,
        },
    ])
      };

    return(
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            keyboardVerticalOffset={100} // Adjust this value according to your UI
        >
            <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen
                options= {{ title: isUpdating ? 'Update Product' : 'Create Product' }}/>

                <Image source={{ uri: image|| defualtPizzaImage}} style={styles.image} />
                <Text onPress={pickImage} style={styles.textButton}>Select Image </Text>

                <Text style={styles.label}>Name</Text>
                <TextInput 
                value={name}
                onChangeText={setName}
                placeholder='Name' 
                style={styles.input} />

                <Text style={styles.label}>Price ($)</Text>
                <TextInput 
                value={price}
                onChangeText={setPrice}
                placeholder='99.9' 
                style={styles.input} keyboardType='numeric' />

                <Text style={{ color: 'red'}}>{errors}</Text>
                <Button onPress={onSubmit}text= {isUpdating? 'Update' : 'Create'}/>
                {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, 
        justifyContent: 'center',
        padding: 10,
    },

    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf:'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },

    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },

    label :{
        color: 'gray',
        fontSize: 16,
    },
});

export default CreateProductScreen;
