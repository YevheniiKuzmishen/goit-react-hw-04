import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../../images-api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const handleSearchSubmit = async (newQuery) => {
    if (newQuery.trim() === "") {
      toast.error("Please enter a search query");
      return;
    }

    setLoading(true);
    setError(null);
    setQuery(newQuery);
    setPage(1);
    try {
      const results = await fetchImages(newQuery, 1);
      setImages(results);
    } catch (error) {
      setError("Failed to fetch images");
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const results = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...results]);
      setPage(nextPage);
    } catch (error) {
      setError("Failed to fetch images");
      toast.error("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && images.length > 0 && (
        <>
          <ImageGallery items={images} />
          <LoadMoreBtn onClick={loadMoreImages} />
        </>
      )}
      <Toaster />
    </div>
  );
}
