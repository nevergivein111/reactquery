import Image from "next/image";

const PropertyHeaderImage = ({ title, image, image2 }) => {
  const imageSrc =
    Array.isArray(image) && image.length > 0 ? image[0] : image2 || null;

  // If neither is set, render nothing
  if (!imageSrc) return null;
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={imageSrc}
            alt={title}
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};
export default PropertyHeaderImage;
