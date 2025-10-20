import Hero from "../components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import FeaturedProperties from "@/components/FeaturedProperties";
import Post from "@/models/Posts";
import PostMeta from "@/models/PostMeta";
import NewUser from "@/models/NewUser";

const post = await Post.findOne({ ID: 79195 })
  .populate("author")
  .populate("metas"); // Populates all postmeta records
console.log(post);

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};
export default HomePage;
