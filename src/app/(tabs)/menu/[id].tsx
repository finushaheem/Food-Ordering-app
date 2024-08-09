import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import products from '@assets/data/products';
import { defualtPizzaImage } from '@components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id }= useLocalSearchParams ();

const [ selectedSize, setSelectedSize ] = useState ('XL');

const product = products.find ((p) => p.id.toString()=== id ) ;

const addToCart = () => {
  console.warn('Adding to cart , size: ', selectedSize);
};

if (!product){
return <text>
Product Not Found
</text>;
}
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product?.name }} />
      <Image source={{ uri: product.image || defualtPizzaImage}} style={styles.image}/>
 

    <Text> Select the Size </Text>
      <View style={styles.sizes} >
        {sizes.map((size) => (
         <Pressable 
         onPress={() => {
          setSelectedSize(size);
         }

         }         style={[
          styles.size, 
         { backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
         },
         ]} 
         key= {size} 
         >
              <Text style={[styles.sizeText,
                 { color: selectedSize === size ? 'black' : 'grey',
                 },
              ]}> {size} </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to Cart" />
    </View>
  );
};

const styles= StyleSheet.create({
container:{
  backgroundColor: 'white',
  flex: 1, 
  padding: 10,


},
image: {
  width: '100%',
  aspectRatio: 1,
},
price: {
fontSize: 18,
fontWeight: 'bold',
marginTop: 'auto',

},
sizes:{
flexDirection: 'row',
justifyContent: 'space-around',
marginVertical: 10,

},
size: {
backgroundColor: 'gainsboro',
width: 50,
aspectRatio: 1,
borderRadius: 25,
alignItems: 'center',
justifyContent: 'center',

},
sizeText:{
  fontSize: 20,
  fontWeight: '500'
},
});

export default ProductDetailsScreen;