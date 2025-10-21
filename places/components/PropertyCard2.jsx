import Image from "next/image";
import Link from "next/link";
import Property from "@/models/Posts";
import SafeImage from "./SafeImage";
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
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
  imageGuid = imageGuid.replace(
    "http://pakistanplaces.com/wp-content",
    "http://localhost:3000"
  );

  return (
    <div className="rounded-xl shadow-md relative">
      <SafeImage
        src={imageGuid}
        alt={property.post_title}
        width={400}
        height={0}
        className="rounded-lg object-cover"
      />
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
