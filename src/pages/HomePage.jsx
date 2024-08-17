import CurrentAdvice from "../components/current-advice";
import EditorsPick from "../components/editors-pick";
import Hero from "../components/hero";
import BestSellerProducts from "../layouts/best-seller-products-area";
import FeaturedPostsArea from "../layouts/featured-posts-area";
import Footer from "../layouts/footer";

import Header from "../layouts/header";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />

      <EditorsPick />

      <BestSellerProducts />

      <Hero />

      <CurrentAdvice />

      <FeaturedPostsArea />

      <Footer />
    </>
  );
}
