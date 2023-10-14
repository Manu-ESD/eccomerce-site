import { BiSearch } from "react-icons/bi";

const SearchComponent = ({
    searchValue,
    setSearchValue,
    handleSearch
}) => {
  return (
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
  )
}

export default SearchComponent