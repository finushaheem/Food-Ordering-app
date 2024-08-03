import { StyleSheet, Text, View, Image } from 'react-native';
import colors from '../constants/Colors';
import { Product } from '../types';

export const defualtPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png';

type ProductListItemProps= {
 product: Product;
};

const ProductListItem = ({ product}: ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image || defualtPizzaImage }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
} ;

export default ProductListItem;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,

  },

  image: {
    width: '100%',
    aspectRatio: 1
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
    color: colors.light.tint,
  },
});
