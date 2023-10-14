import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  deleteUser,
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

export const getProductById = (collectionName, documentID) => {
  const docRef = doc(db, collectionName, documentID);
  return getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return {};
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
};

export const getProductsParams = (productsData) => {
  const uniqueValues = (arr) => [...new Set(arr)];

  const brands = [];
  const price = [];
  const ratings = [];
  const stock = [];
  const discount = [];
  const category = [];
  const subCategory = [];
  const categories = {
    "clothing": [],
    "electronics": [],
    "cosmetics": [],
    "personal-care": [],
    "home-needs": [],
    "fashion": [],
    "jewelry": [],
    "footwear": []
  };

  productsData.forEach((product) => {
    brands.push(product.brand);
    price.push(product.price);
    ratings.push(product.rating.rate);
    stock.push(product.stock);
    discount.push(product.discountPercentage);
    category.push(product.category);
    subCategory.push(product["sub-category"]);
    categories[product.category].push(product["sub-category"]);
  });

  for (const category in categories) {
    categories[category] = uniqueValues(categories[category]);
  }

  return {
    brands: uniqueValues(brands),
    price: uniqueValues(price),
    ratings: uniqueValues(ratings),
    stock: uniqueValues(stock),
    discount: uniqueValues(discount),
    category: uniqueValues(category),
    subCategory: uniqueValues(subCategory),
    categories
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

export const signInHandler = ({ email, password }) =>
  signInWithEmailAndPassword(auth, email, password);

export const signUpWithFirebase = ({ email, password }) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signOutWithFirebase = () => {
  signOut(auth);
  store.dispatch(signOff());
};

export const passwordReset = async (email) =>
  await sendPasswordResetEmail(auth, email);

export const confirmThePasswordReset = async (oobCode, newPassword) => {
  if (!oobCode && !newPassword) return;
  return await confirmPasswordReset(auth, oobCode, newPassword);
};

export const deleteUserFromFirebase = () => {
  const user = auth.currentUser;
  deleteUser(user)
    .then((res) => {
      if (!res) {
        throw new Error(
          "Unable to delete your account. Please try after sometime !!"
        );
      }
      signOutWithFirebase();
      console.log("Account deleted successfully");
    })
    .catch((error) => {
      console.err(error);
    });
};
