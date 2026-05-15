import { getCurrentYear } from "@/lib/utils";
import BrandIcon from "./BrandIcon";
import Link from "next/link";
import { FaGlobeAfrica } from "react-icons/fa";
import { MessageSquareTextIcon } from "lucide-react";
import { FaAt } from "react-icons/fa6";

const footerData = {
  "For Students": [
    { title: "Find a Hostel", href: "#" },
    { title: "Student Discounts", href: "#" },
    { title: "Safety Guidelines", href: "#" },
    { title: "Move-in Checklist", href: "#" },
  ],
  Company: [
    { title: "About Us", href: "#" },
    { title: "Contact Us", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
  ],
  Partners: [
    { title: "List a Property", href: "#" },
    { title: "Hostel Owners", href: "#" },
    { title: "University Partners", href: "#" },
    { title: "Brand Ambassadors", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10 font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <Link href="#">
              <BrandIcon className="text-2xl" />
            </Link>
            <p className="text-emerald-100/60 text-sm leading-relaxed max-w-xs">
              Empowering Nigerian students with seamless access to secure, verified,
              and affordable housing solutions nationwide.
            </p>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(footerData).map(([section, items]) => (
              <div key={section}>
                <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 mb-6">
                  {section}
                </h4>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.title}>
                      <Link
                        className="text-sm text-emerald-100/80 hover:text-white transition-colors duration-200"
                        href={item.href}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-emerald-100/40 text-[10px] font-medium tracking-wider uppercase">
            © {getCurrentYear()} Hostel.ng. All rights reserved. Built for Nigerian
            Students.
          </p>
          <div className="flex gap-6">
            <Link
              className="text-primary-light hover:text-orange-500 transition-colors duration-300"
              href="#"
            >
              <FaGlobeAfrica size={15} />
            </Link>
            <Link
              className="text-primary-light hover:text-orange-500 transition-colors duration-300"
              href="#"
            >
              <FaAt size={15} />
            </Link>
            <Link
              className="text-primary-light hover:text-orange-500 transition-colors duration-300"
              href="#"
            >
              <MessageSquareTextIcon size={15} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
