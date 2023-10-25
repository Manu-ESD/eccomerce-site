import { BiSearch } from "react-icons/bi";

const SearchComponent = ({ searchValue, setSearchValue, handleSearch }) => {
  return (
    <div className="flex flex-row items-center bg-orange-500 w-[30rem] rounded-lg ml-36">
      <input
        className="w-full p-1.5 rounded-l-lg focus:outline-none pl-5"
        type="text"
        placeholder="Search Product here"
        name="inputSearchValue"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      ></input>
      <BiSearch
        className="w-[40px] text-black hover:text-white rounded-r-lg"
        onClick={handleSearch}
      ></BiSearch>
    </div>
  );
};

export default SearchComponent;
