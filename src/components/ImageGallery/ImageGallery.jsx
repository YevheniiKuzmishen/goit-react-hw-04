import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <div>
            <ImageCard src={item.urls.small} alt={item.alt_description} />
          </div>
        </li>
      ))}
    </ul>
  );
}
