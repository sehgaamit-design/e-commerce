import React, { useContext } from 'react'
import { ShopContext } from '../components/Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrums from '../components/Breadcrums/Breadcrums';
import Productdisplay from '../components/Productdisplay/Productdisplay';
import Discription from '../components/Discription/Discription';
import Relatedproducts from '../components/Relatedproducts/Relatedproducts';

const Product = () => {

  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e)=>e.id === Number(productId));

  return (
    <div >
      <Breadcrums product = {product} />
      <Productdisplay product = {product} />
      <Discription/>
      <Relatedproducts />
    </div>
  )
}

export default Product