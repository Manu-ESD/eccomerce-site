import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { HiOutlineBell, HiUser, HiShoppingCart } from "react-icons/hi";
import { Link,useNavigate,createSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOutWithFirebase } from "../utility/utils";
import { useDispatch } from "react-redux";
import { updateSearchValue } from "../features/searchValueSlice";
import { getDataFromFirebase } from "../utility/utils";
import { useEffect } from "react";
import { getFiltersParams } from "../utility/utils";
import { useNavigate } from "react-router-dom";
import { updateselectedCategories } from "../features/selectedCategories";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../service";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Products", href: "/products", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Offers", href: "/offers", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const authData = useSelector((state) => state.authData);
  const addToCart = useSelector((state) => state.addToCart.value);

  const selectedCategories = useSelector(
    (state) => state.selectedCategories.value
  );

  const [categories, setCategories] = useState([""]);
  // const [selectedCategory, setSelectedCategory] = useState(selectedCategories);

  const navigate = useNavigate();

  useEffect(() => {
    // !Note: In production we do not get all the data at once, this implementation is for the current project only
    getDataFromFirebase("products")
      .then((data) => {
        const { category,categories } = getProductsParams(data);
        dispatch(updateProductsData(data));
        setCategoryArr(category);
        setAllCategories(categories);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(updateSearchValue(searchValue));
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-10 w-auto mix-blend-screen"
                    src="https://i.pinimg.com/564x/15/96/e3/1596e3b738d6e32dbd700844ed062488.jpg"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <>
                        {item.name !== "Products" ? (
                          <Link to={item.href} key={item.name}>
                            <button
                              key={item.name}
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </button>
                          </Link>
                        ) : (
                          <div className="dropdown dropdown-bottom flex justify-center items-center">
                            <label
                              tabIndex={0}
                              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                            >
                              Products
                            </label>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li
                                value={"all"}
                                onClick={() => handleCategorieSeletion("all")}
                              >
                                <a>All Items</a>
                              </li>
                              {categories.map((item) => (
                                <li
                                  value={item}
                                  key={item}
                                  onClick={() => handleCategorieSeletion(item)}
                                >
                                  <a>{item}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center bg-orange-500">
                <input
                  className="w-[300px] p-1"
                  type="text"
                  placeholder="Search Product here"
                  name="inputSearchValue"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                ></input>
                <BiSearch
                  className="w-[30px] text-black hover:text-white"
                  onClick={handleSearch}
                ></BiSearch>
              </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 mr-3 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <HiOutlineBell className="h-6 w-6" aria-hidden="true" />
              </button>
              <Link to={`/cart`}>
                <button
                  type="button"
                  className="relative rounded-full flex bg-gray-800 p-1 mr-3 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Cart</span>
                  <HiShoppingCart className="h-6 w-6 me-1" />
                  {addToCart.length}
                </button>
              </Link>

              {authData.isLoggedIn ? (
                <Link
                  to="/"
                  onClick={signOutWithFirebase}
                  className="flex bg-gray-800 p-1 mr-3 text-gray-400 hover:text-white"
                >
                  <HiUser className="h-6 w-6 me-1" />
                  <span>Sign Out</span>
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="flex bg-gray-800 p-1 mr-3 text-gray-400 hover:text-white"
                >
                  <HiUser className="h-6 w-6 me-1" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </>
      <Disclosure as="nav" className="bg-gray-800">
      <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 md:px-8">
              <div className="relative flex h-10 items-center justify-between">
                <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {
                        categoryArr?.map((category,index)=>{
                          return <CategoryDropDown handleCategory={handleCategory} category={category} subCategory={allCategories[category]} key={index}/>
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigationRoutes.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
      </Disclosure>
    </>
  );
}
