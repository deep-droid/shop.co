import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const footerLinks = {
  company: ["About", "Features", "Works", "Career"],
  help: [
    "Customer Support",
    "Delivery Details",
    "Terms & Conditions",
    "Privacy Policy",
  ],
  faq: ["Account", "Manage Deliveries", "Orders", "Payments"],
  resources: [
    "Free eBooks",
    "Development Tutorial",
    "How to - Blog",
    "Youtube Playlist",
  ],
};

function Footer() {
  return (
    <footer className="-mt-[90px] bg-[#F0F0F0] pb-20 pt-36">
      <div className="container-shop px-4 sm:px-6 md:px-8">

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 gap-12 border-b border-black/10 pb-12 md:grid-cols-4 lg:grid-cols-6 lg:gap-12">

          {/* Brand Identity */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <h2 className="font-integral text-[28px] font-black text-black">
              SHOP.CO
            </h2>

            <p className="mt-4 max-w-[248px] text-sm leading-[1.6] text-black/60">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <SocialIcon>
                <FaTwitter />
              </SocialIcon>

              <SocialIcon>
                <FaFacebookF />
              </SocialIcon>

              <SocialIcon>
                <FaInstagram />
              </SocialIcon>

              <SocialIcon>
                <FaGithub />
              </SocialIcon>
            </div>
          </div>

          {/* Footer Columns */}
          <FooterColumn
            title="Company"
            links={footerLinks.company}
          />

          <FooterColumn
            title="Help"
            links={footerLinks.help}
          />

          <FooterColumn
            title="FAQ"
            links={footerLinks.faq}
          />

          <FooterColumn
            title="Resources"
            links={footerLinks.resources}
          />

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">

          <p className="text-sm text-black/60">
            Shop.co © 2000-2023, All Rights Reserved
          </p>

          {/* Payment Platforms */}
          <div className="flex items-center gap-3">
            <PaymentBadge text="Visa" />
            <PaymentBadge text="Mastercard" />
            <PaymentBadge text="PayPal" />
            <PaymentBadge text="ApplePay" />
            <PaymentBadge text="GooglePay" />
          </div>

        </div>

      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: string[];
}

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div className="space-y-4">

      <h3 className="text-sm font-medium uppercase  text-black">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <span className="cursor-pointer text-sm text-black/60 transition hover:text-black">
              {link}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
}

function SocialIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white text-xs text-black transition hover:bg-black hover:text-white"
      aria-label="Social media"
    >
      {children}
    </button>
  );
}

function PaymentBadge({
  text,
}: {
  text: string;
}) {
  return (
    <span className="flex h-[30px] w-[46px] items-center justify-center rounded-[5px] border border-[#D6D6D6] bg-white text-[9px] font-bold text-black shadow-sm">
      {text}
    </span>
  );
}

export default Footer;