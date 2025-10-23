import Image from "next/image";
import Link from "next/link";
import Property from "@/models/Posts";
// @ts-ignore
import { unserialize } from "php-unserialize";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

const PropertyCard2 = async ({ property }) => {
  var propertyImageobject = {};
  const metaData = property.metas.reduce((acc, item) => {
    acc[item.meta_key] = item.meta_value;
    return acc;
  }, {});

  if (metaData.gallery_image_ids) {
    const idsArray = metaData.gallery_image_ids
      .split(",")
      .map((id) => id.trim());
    if (idsArray[0]) {
      propertyImageobject = await Property.findOne({ ID: idsArray[0] });
    }
  }

  if (metaData.lp_listingpro_options) {
    metaData.lp_listingpro_options = unserialize(
      metaData.lp_listingpro_options
    );
  }

  if (metaData.google_place_photos) {
    metaData.google_place_photos = unserialize(metaData.google_place_photos);
  }

  let imageGuid =
    propertyImageobject?.guid ||
    metaData?.google_place_photos?.images[0] ||
    "/image-not-found.png";
  imageGuid = imageGuid.replace(
    "http://pakistanplaces.com/wp-content",
    "http://localhost:3000"
  );

  return (
    <div className="rounded-xl shadow-md relative">
      <div className="relative w-full rounded-xl overflow-hidden">
        <div className="relative w-full aspect-[4/3]">
          <Image
            key={`${imageGuid}-${property.ID}`} // Add unique key combination
            src={imageGuid}
            alt={property.post_title || "Property Image"}
            fill
            className="object-cover rounded-lg transition-opacity duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={true} // Replace loading="eager" with priority
            quality={75} // Add quality parameter
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRodHSQkHR0nJCQpJyonJycpKjQ6Mi40Kis6PT0/OkVFRTpHR0tLS0pLS0tLS0v/2wBDARUXFyAeIBwgICBHOCo4R0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0v/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      </div>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.post_title}</div>
          <h3 className="text-xl font-bold">{property.post_title}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"></h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-orange-700 mt-1" />
            <span className="text-orange-700"> </span>
          </div>
          <Link
            href={`/properties/${property.post_name}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PropertyCard2;
