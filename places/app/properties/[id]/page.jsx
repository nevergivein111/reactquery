import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import connectDB from "@/config/database";
import Property from "@/models/Posts";
import PostMeta from "@/models/PostMeta";
import NewUser from "@/models/NewUser";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { unserialize } from "php-unserialize";
import { decodeBase64Data, safeUnserialize } from "@/utils/decode";

const PropertyPage = async ({ params }) => {
  await connectDB();

  const property = await Property.findOne({ post_name: params.id }).populate(
    "metas"
  );

  const metaData = property.metas.reduce((acc, item) => {
    acc[item.meta_key] = item.meta_value;
    return acc;
  }, {});

  if (metaData.gallery_image_ids) {
    const idsArray = metaData.gallery_image_ids
      .split(",")
      .map((id) => id.trim());
    if (idsArray.length > 0) {
      // Fetch all posts where ID is in the list
      metaData.gallery_image_ids = await Property.find({
        ID: { $in: idsArray },
      });

      // array of matching documents
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

  if (metaData.listing_reviews) {
    const decodedReviews = decodeBase64Data(metaData.listing_reviews);
    metaData.listing_reviews = safeUnserialize(decodedReviews);
  }

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <div>test</div>
    </>
  );
};
export default PropertyPage;
