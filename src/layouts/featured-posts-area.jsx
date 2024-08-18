import FeaturedPost from "../components/featured-post";

const postData = [
  {
    desktop: "./images/featured-posts/featured-post1.jpg",
    mobile: "./images/featured-posts/featured-post4.jpg",
  },
  {
    desktop: "./images/featured-posts/featured-post2.jpg",
    mobile: "./images/featured-posts/featured-post5.jpg",
  },
  {
    desktop: "./images/featured-posts/featured-post3.jpg",
    mobile: "./images/featured-posts/featured-post6.jpg",
  },
];

export default function FeaturedPostsArea() {
  return (
    <>
      <div className=" mt-[5.5rem] gap-[1.3rem] flex flex-col md:flex md:flex-col justify-center items-center md:justify-center justify-between w-screen">
        <p className="font-bold text-xl text-[#23A6F0]">Practice Advice</p>
        <h2 className="text-3xl md:text-5xl font-bold">Featured Posts</h2>
        <p className="text-[#737373] mb-[2rem] w-[20rem] md:w-[27rem] text-center">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics{" "}
        </p>

        <div className="flex flex-col md:flex-row gap-[1rem]">
          {postData.map((item, ind) => {
            return <FeaturedPost key={ind} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}
