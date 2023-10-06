import { collection, getDocs } from "firebase/firestore";
import { db } from "../service";
import { doc, setDoc } from "firebase/firestore";

export const getProducts = async() => {
  try {
    const response = await fetch(import.meta.env.VITE_API_ENDPOINT);
    if (!response) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.err(err);
  }
};

export const getProductByID = async(id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/${id}`);
    if (!response) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.err(err);
  }
};

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

const postProductsData = (data)=>{
  data.forEach(async(data)=>{
    await setDoc(doc(db, "products", `product-${data.id}`), data);
  })
}