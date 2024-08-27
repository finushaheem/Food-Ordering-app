import Button from '@/components/Button';
import { defualtPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';


const CreateProductScreen = () => {
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');

    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

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

    const onCreate = () => {
        if (!validateInput()){
            return;
        }
        console.warn('Creating product');
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

    return(
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            keyboardVerticalOffset={100} // Adjust this value according to your UI
        >
            <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{title: 'Create Product'}}/>

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
                <Button onPress={onCreate}text='Create'/>
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
