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
import { exit } from "process";

const PropertyPage = async ({ params }) => {
  await connectDB();

  const property = await Property.findOne({ post_name: params.id }).populate(
    "metas"
  );

  const metaData = property.metas.reduce((acc, item) => {
    acc[item.meta_key] = item.meta_value;
    return acc;
  }, {});

  // ...existing code...

  if (metaData?.gallery_image_ids) {
    try {
      const idsArray = metaData.gallery_image_ids
        .split(",")
        .filter(Boolean)
        .map((id) => id.trim());

      if (idsArray.length > 0) {
        // Fetch all posts where ID is in the list
        const galleryImages = await Property.find({
          ID: { $in: idsArray },
        });

        // Extract only the guid field from gallery images
        if (galleryImages.length > 0) {
          metaData.gallery_image_ids = galleryImages.map((img) =>
            img.guid.replace(
              "http://pakistanplaces.com/wp-content",
              "http://localhost:3000"
            )
          );
        }
      }
    } catch (error) {
      console.error("Error processing gallery images:", error);
      metaData.gallery_image_ids = [];
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
      {(metaData?.google_place_photos?.images?.[0] ||
        metaData?.gallery_image_ids) && (
        <PropertyHeaderImage
          {...(metaData?.google_place_photos?.images?.[0]
            ? { image2: metaData.google_place_photos.images[0] }
            : {})}
          {...(metaData?.gallery_image_ids
            ? { image: metaData.gallery_image_ids }
            : {})}
        />
      )}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6"></div>
        </div>
      </section>

      {metaData?.google_place_photos?.images &&
        Object.keys(metaData.google_place_photos.images).length > 0 && (
          <PropertyImages images={metaData.google_place_photos.images} />
        )}
      {metaData?.gallery_image_ids &&
        metaData?.gallery_image_ids?.length > 0 && (
          <PropertyImages images={metaData.gallery_image_ids} />
        )}
    </>
  );
};
export default PropertyPage;
