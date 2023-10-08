import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import { db, auth } from "../service";
import { v4 as uuidv4 } from "uuid";
import store from "../store";
import { signOff } from "../features/authSlice";

export const getDataFromFirebase = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    if (!querySnapshot) {
      throw new Error(`Unable to fetch data from ${collectionName}`);
    }
    const retrievedData = [];
    querySnapshot.forEach((doc) => retrievedData.push(doc.data()));
    return retrievedData;
  } catch (err) {
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

export const getFiltersParams = (productsData) => {
  const brands = [];
  const price = [];
  const ratings = [];
  const stock = [];
  const discount = [];
  const category = [];

  productsData.forEach((product) => {
    brands.push(product.brand);
    price.push(product.price);
    ratings.push(product.rating.rate);
    stock.push(product.stock);
    discount.push(product.discountPercentage);
    category.push(product.category);
  });

  return {
    brands: [...new Set(brands)],
    price: [...new Set(price)],
    ratings: [...new Set(ratings)],
    stock: [...new Set(stock)],
    discount: [...new Set(discount)],
    category: [...new Set(category)],
  };
};

export const signUpHandler = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const signInHandler = ({ email, password }) => signInWithEmailAndPassword(auth, email, password);

export const signUpWithFirebase = ({ email, password }) => createUserWithEmailAndPassword(auth, email, password);

export const signOutWithFirebase = () => {
  signOut(auth);
  store.dispatch(signOff());
};

export const passwordReset = async (email) => await sendPasswordResetEmail(auth, email);

export const confirmThePasswordReset = async (oobCode, newPassword) => {
  if (!oobCode && !newPassword) return;
  return await confirmPasswordReset(auth, oobCode, newPassword);
};