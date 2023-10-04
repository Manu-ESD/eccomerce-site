export const getProducts = async () => {
    try{
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT);
      if (!response) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    }catch(err){
      console.err(err);
    }
  };