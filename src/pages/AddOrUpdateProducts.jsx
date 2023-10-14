import { useState } from "react";
import Layout from "../components/Layout";
import { postDataToFirebase } from "../utility/utils";

const AddOrUpdateProducts = () => {
  const [formData, setFormData] = useState({
    brand: "",
    category: "",
    title: "",
    discount: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setFormData({
        brand: "",
        category: "",
        title: "",
        discount: "",
        price: "",
        stock: "",
        image: "",
        description: "",
        rating: {
          count: 0,
          rate: 0,
        },
      });

      const response = await postDataToFirebase({
        collectionName:"products",
        dataToWrite:formData
      });
      if (!response) {
        throw new Error("Unable to add product");
      }
      console.log("Product Added Successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="w-full bg-white rounded p-6 mt-4">
        <h2 className="text-xl font-bold mt-4">Product Management Portal</h2>
        <form onSubmit={handleSubmit} className="space-y-4  mt-4">
          <div className="flex gap-x-3">
            {/* Brand Input */}
            <div className="brand-container">
              <label htmlFor="brand-input" className="text-lg me-2">
                Brand
              </label>
              <input
                id="brand"
                className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="Enter Brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </div>
            {/* Category Input */}
            <div className="category-container">
              <label htmlFor="category-input" className="text-lg me-2">
                Category
              </label>
              <input
                id="category"
                className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="Enter Category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </div>
            {/* Title Input */}
            <div className="title-container">
              <label htmlFor="title-input" className="text-lg me-2">
                Title
              </label>
              <input
                id="title"
                className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="text"
                placeholder="Enter Title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex gap-x-3">
            {/* Discount Input */}
            <div className="discount-container">
              <label htmlFor="discount-input" className="text-lg me-2">
                Discount Percentage
              </label>
              <input
                id="discount"
                className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="number"
                placeholder="Enter Discount"
                value={formData.discount}
                onChange={handleInputChange}
              />
            </div>
            {/* Price Input */}
            <div className="price-container mx-3">
              <label htmlFor="price-input" className="text-lg me-2">
                Price (USD)
              </label>
              <input
                id="price"
                className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="number"
                placeholder="Enter Price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            {/* Stock Input */}
            <div className="stock-container">
              <label htmlFor="stock-input" className="text-lg me-2">
                Total Stock
              </label>
              <input
                id="stock"
                className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                type="number"
                placeholder="Enter Stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Image Input */}
          <div className="image-container">
            <label htmlFor="image-input" className="text-lg me-2">
              Image Link
            </label>
            <input
              id="image"
              className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              placeholder="Enter Image Link"
              value={formData.image}
              onChange={handleInputChange}
            />
          </div>
          {/* Description Input */}
          <div className="description-container">
            <label htmlFor="description-input" className="text-lg me-2">
              Description
            </label>
            <textarea
              id="description"
              className="resize-none rounded-md w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              cols="30"
              rows="10"
              placeholder="Enter Product Description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="w-30 py-4 bg-green-600 hover:bg-green-700 rounded text-sm font-bold text-gray-50 transition duration-200"
            >
              Add Products
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddOrUpdateProducts;
