import heroImage from "../../assets/images/home/homehero.png";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F2F0F1]">
      <div className="container-shop relative grid lg:grid-cols-2 lg:h-142.5 xl:h-165.75">

        {/* Content Section */}
        <div className="relative z-10 pt-7 pb-6 lg:py-14 flex flex-col justify-center">

          <h1 className=" text-[35px] uppercase sm:text-[64px]">
            Find clothes
            <br />
            that matches
            <br />
            your style
          </h1>

          <p className="mt-3 text-[14px] md:text-[16px] leading-[1.6] text-gray-500 max-w-136.25">
            Browse through our diverse range of meticulously
            crafted garments, designed to bring out your
            individuality and cater to your sense of style.
          </p>

          <div>
            <button className="mt-4 w-full rounded-full bg-black py-2.5 text-[9px] font-medium text-white lg:w-auto lg:px-8">
              Shop Now
            </button>
          </div>

          {/* Stats Wrapper - Positioned inside left column layout on Desktop */}
          <div className="hidden lg:mt-12 lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8">
            <StatItem value="200+" label="International Brands" />
            <StatItem value="2,000+" label="High-Quality Products" />
            <StatItem value="30,000+" label="Happy Customers" />
          </div>
        </div>

        {/* Dedicated Stats Block layout underneath image for Mobile / Tablet viewports */}
        <div className="col-span-1 py-8 border-t border-gray-200 lg:hidden">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-center sm:gap-x-12">
            <StatItem value="200+" label="International Brands" />
            <StatItem value="2,000+" label="High-Quality Products" />
            <div className="w-full sm:hidden" /> {/* Structural break to keep third item clean on mobile */}
            <StatItem value="30,000+" label="Happy Customers" />
          </div>
        </div>

        {/* Hero Image Section Layout */}
        <div className="relative flex min-h-75 items-end justify-center sm:min-h-112.5 lg:absolute lg:bottom-0 lg:right-0 lg:h-full lg:w-1/2 lg:min-h-0">

          <img
            src={heroImage}
            alt="Hero Exhibition"
            className="h-full w-full object-contain object-bottom"
          />

          {/* Large Decorative Star (Top Right) */}
          <span className="absolute right-[8%] top-[10%] text-[44px] lg:text-[56px] xl:text-[76px]">
            ✦
          </span>

          {/* Small Decorative Star (Mid Left) */}
          <span className="absolute left-[8%] top-[45%] text-[28px] lg:text-[36px] xl:text-[44px]">
            ✦
          </span>
        </div>



      </div>
    </section>
  );
}

// Extracted utility component keeping layout modifications isolated
interface StatItemProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center lg:text-left">
      <p className="text-[24px] md:text-[40px] font-bold leading-none">
        {value}
      </p>
      <p className="mt-1 text-[12px] md:text-[16px] text-gray-500">
        {label}
      </p>
    </div>
  );
}

export default Hero;
