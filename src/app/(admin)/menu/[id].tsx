import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@assets/data/products';
import { defualtPizzaImage } from '@components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/Provider/CartProvider';
import { PizzaSize } from '@/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];


const ProductDetailsScreen = () => {
  const { id }= useLocalSearchParams ();
  const { addItem }= useCart();

const router = useRouter();

const [ selectedSize, setSelectedSize ] = useState <PizzaSize>('XL');

const product = products.find ((p) => p.id.toString()=== id ) ;

const addToCart = () => {
  if (!product) {
    return;
  }
  addItem(product, selectedSize);
  router.push ('/cart');
};

if (!product){
return <Text>
Product Not Found
</Text>;
}
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product?.name }} />
      <Image source={{ uri: product.image || defualtPizzaImage}} style={styles.image}/>


      <Text style={styles.title}>${product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>

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
title: {
  fontSize: 20,
  fontWeight: 'bold',
  
  },
price: {
fontSize: 18,
fontWeight: 'bold',

},

});

export default ProductDetailsScreen;