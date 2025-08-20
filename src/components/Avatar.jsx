export default function Avatar({ src="/avatar.jpg", alt="Alisha Stone", size=88 }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full border-4 border-white shadow-card object-cover"
      style={{ aspectRatio: "1 / 1" }}
    />
  );
}
