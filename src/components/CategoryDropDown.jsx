import { headerFormatter } from "../utility/utils";

const CategoryDropDown = ({handleCategory, category, subCategory }) => {
    
  return (
    <div className="dropdown dropdown-bottom flex justify-center items-center">
      <label
        tabIndex={0}
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium"
      >
        {headerFormatter(category)}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-52"
      >
        {subCategory.map((item) => (
          <li value={item} key={item} onClick={()=>handleCategory(category,item)}>
            <a>{headerFormatter(item)}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropDown;
