import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Amenities from "@/components/home/Amenities";
import RoomsPreview from "@/components/home/RoomsPreview";
import Dining from "@/components/home/Dining";
import Location from "@/components/home/Location";
import ClosingCta from "@/components/home/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Amenities />
      <RoomsPreview />
      <Dining />
      <Location />
      <ClosingCta />
    </>
  );
}
