import { collection, getDocs } from "firebase/firestore";
import { db } from "../service";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export const getDataFromFirebase = async(collectionName) => {
  try{
    const querySnapshot = await getDocs(collection(db, collectionName));
    if(!querySnapshot){
      throw new Error(`Unable to fetch data from ${collectionName}`);
    }
    const retrievedData = [];
    querySnapshot.forEach((doc) => retrievedData.push(doc.data()));
    return retrievedData;

  }catch(err){
    console.error(err.message);
  }
};

export const postProductsData = async (type, collectionName, productsData) => {
  if (type === "isMulti") {
    productsData.forEach(async (data) => {
      await setDoc(doc(db, collectionName, uuidv4()), data);
    });
  } else {
    await setDoc(doc(db, collectionName, uuidv4()), productsData);
  }
};

export const getFiltersParams = (productsData)=>{
  const brands=[];
  const price=[];
  const ratings=[];
  const stock=[];
  const discount=[];
  productsData.forEach((product)=>{
    brands.push(product.brand);
    price.push(product.price);
    ratings.push(product.rating.rate);
    stock.push(product.stock);
    discount.push(product.discountPercentage);
  })

  return {
    brands:[...new Set(brands)],
    price:[...new Set(price)],
    ratings:[...new Set(ratings)],
    stock:[...new Set(stock)],
    discount:[...new Set(discount)]
  }
  
}
