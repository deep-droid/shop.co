import frame1 from "../../assets/images/products/Frame61.png";
import frame2 from "../../assets/images/products/Frame62.png";
import frame3 from "../../assets/images/products/Frame63.png";
import frame4 from "../../assets/images/products/Frame64.png";

const dressStyles = [
  {
    name: "Casual",
    image: frame1,
    className: "md:col-span-1",
  },
  {
    name: "Formal",
    image: frame2,
    className: "md:col-span-2",
  },
  {
    name: "Party",
    image: frame4,
    className: "md:col-span-2",
  },
  {
    name: "Gym",
    image: frame3,
    className: "md:col-span-1",
  },
];

function DressStyleSection() {
  return (
    <section className="container-shop px-4 py-10 sm:px-6 md:px-8 md:py-16">
      <div className="rounded-[20px] bg-[#F0F0F0] px-6 py-10 sm:px-14 sm:py-16 md:rounded-[40px]">

        {/* Global Styled Heading */}
        <h2 className=" text-center text-3xl font-black uppercase sm:text-4xl lg:text-[48px]">
          Browse by dress style
        </h2>

        {/* Grid Categories Layout wrapper */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-14 lg:grid-cols-3 md:gap-5">
          {dressStyles.map((style) => (
            <button
              key={style.name}
              className={`group relative h-[190px] w-full overflow-hidden rounded-[20px] bg-white text-left transition duration-300 md:h-[289px] ${style.className}`}
            >
              {/* Product Background Image */}
              <img
                src={style.image}
                alt={style.name}
                className="absolute inset-0 h-full w-full object-fill object-right-top transition duration-500 group-hover:scale-105 sm:object-center md:object-right-top"
              />

              {/* Interaction Overlay layer */}
              <div className="absolute inset-0 bg-black/[0.02] transition group-hover:bg-black/[0.06]" />

              {/* Title Text anchored tightly */}
              {/* <span className="absolute left-6 top-6 z-10 font-satoshi text-2xl font-bold text-black sm:left-9 sm:top-9 sm:text-[36px]">
                {style.name}
              </span> */}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export default DressStyleSection;
