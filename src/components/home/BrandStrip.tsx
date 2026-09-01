const brands = [
  "VERSACE",
  "ZARA",
  "GUCCI",
  "PRADA",
  "Calvin Klein",
];

function BrandStrip() {
  return (
    <section className="bg-black py-4">
      <div className="container-shop flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-white lg:justify-between">
        {brands.map((brand) => (
          <span
            key={brand}
            className="whitespace-nowrap text-[17px] font-semibold  sm:text-[23px]"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

export default BrandStrip;