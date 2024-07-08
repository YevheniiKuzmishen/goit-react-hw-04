import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../../images-api";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [images, setImages] = useState([]);

  const handleSearchSubmit = async (query) => {
    try {
      const results = await fetchImages(query);
      setImages(results);
    } catch (error) {
      toast.error("Failed to fetch images");
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {images.length > 0 && <ImageGallery items={images} />}
      <Toaster />
    </div>
  );
}
