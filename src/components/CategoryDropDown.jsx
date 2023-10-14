import { Fragment } from "react";
import { headerFormatter } from "../utility/utils";
import { Menu, Transition } from "@headlessui/react";

const CategoryDropDown = ({handleCategory, category, subCategory }) => {
    
  return (
    <Menu as="div" className="text-xl relative px-3">
      <Menu.Button className="text-sm text-white focus:outline-none font-semibold hover:text-gray-200">
        {headerFormatter(category)}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none">
          {subCategory.map((item) => (
            <Menu.Item
              value={item}
              key={item}
              onClick={() => handleCategory(category, item)}
            >
              <div className={"block px-4 py-2 text-sm text-gray-700"}>
                {headerFormatter(item)}
              </div>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CategoryDropDown;
