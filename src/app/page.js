import Hero from "@/components/Hero";
import NewProducts from "@/components/NewProducts";
import Testimonial from "@/components/Testimonial";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  return (
    <main>
      <Hero />
      <NewProducts />
      <Testimonial />
    </main>
  );
}
