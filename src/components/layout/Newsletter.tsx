import { FiMail } from "react-icons/fi";

function Newsletter() {
  return (
    <section className="container-shop relative z-10 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col gap-6 rounded-[20px] bg-black px-6 py-9 text-white sm:px-16 md:flex-row md:items-center md:justify-between lg:py-11">

        {/* Heading */}
        <div className="md:max-w-[550px]">
          <h2 className="font-integral text-[32px] font-black uppercase leading-[1.1] sm:text-[40px]">
            Stay up to date about
            <br />
            our latest offers
          </h2>
        </div>

        {/* Form */}
        <form className="flex w-full flex-col gap-3 md:max-w-[350px]">
          {/* Input field */}
          <div className="flex h-[48px] items-center gap-3 rounded-full bg-white px-4">
            <FiMail size={20} className="shrink-0 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="h-[48px] rounded-full bg-white text-sm font-medium text-black transition hover:bg-gray-100"
          >
            Subscribe to Newsletter
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
