import Layout from "../components/Layout";
const AddOrUpdateProducts = () => {
  return (
    <Layout>
      <div className="w-full bg-white rounded p-6 space-y-4 mt-4">
        <h2 className="text-xl font-bold">Product Management Portal</h2>
        <div className="flex gap-x-3">
          <div className="brand-container">
            <label htmlFor="brand-input" className="text-lg me-2">
              Brand
            </label>
            <input
              id="brand-input"
              className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              placeholder="Enter Brand"
            />
          </div>
          <div className="category-container">
            <label htmlFor="category-input" className="text-lg me-2">
              Category
            </label>
            <input
              id="category-input"
              className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              placeholder="Enter Category"
            />
          </div>
          <div className="title-container">
          <label htmlFor="title-input" className="text-lg me-2">
            Title
          </label>
          <input
            id="title-input"
            className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            type="number"
            placeholder="Enter Title"
          />
        </div>
        </div>
        <div className="flex gap-x-3">
          <div className="discount-container">
            <label htmlFor="discount-input" className="text-lg me-2">
              Discount Percentage
            </label>
            <input
              id="discount-input"
              className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="number"
              placeholder="Enter Discount"
            />
          </div>
          <div className="price-container mx-3">
            <label htmlFor="price-input" className="text-lg me-2">
              Price (USD)
            </label>
            <input
              id="price-input"
              className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="number"
              placeholder="Enter Price"
            />
          </div>
          <div className="stock-container">
            <label htmlFor="stock-input" className="text-lg me-2">
              Total Stock
            </label>
            <input
              id="stock-input"
              className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="number"
              placeholder="Enter Stock"
            />
          </div>
        </div>
        <div className="image-container">
          <label htmlFor="image-input" className="text-lg me-2">
            Image Link
          </label>
          <input
            id="image-input"
            className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            type="text"
            placeholder="Enter Image Link"
          />
        </div>

        <div className="description-container">
          <label htmlFor="description-input" className="text-lg me-2">
            Description
          </label>
          <textarea
            className="resize-none rounded-md w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            name=""
            id="description-input"
            cols="30"
            rows="10"
            placeholder="Enter Product Description"
          ></textarea>
        </div>
        <div className="flex">
          <button className="w-30 py-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-gray-50 transition duration-200">
            Add Products
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddOrUpdateProducts;
