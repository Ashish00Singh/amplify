import Image from "next/image";
import Link from "next/link";


const footerLinks = {
  Services: [
    { label: "SaaS Development", href: "#" },
    { label: "AI App Development", href: "#" },
    { label: "Laravel Development", href: "#" },
    { label: "Agency Outsourcing", href: "#" },
  ],
  "Open Source": [
    { label: "Initiatives", href: "#" },
    { label: "Slate UI Kit", href: "#" },
    { label: "Electrik Starter Kit", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Insights", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Security", href: "#" },
    { label: "Subprocessors", href: "#" },
  ],
};

export default function FooterSection() {
  return (
    <footer

      className="text-white mt-15 px-10"
    >
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2">
          <Image src="/images/AmplifyNewLogo.svg" alt="Logo" width={120} height={40} />
        </Link>
            <p className="mt-3 max-w-xs text-sm text-white/80">
              Enterprise tech delivery for agencies and brands.
            </p>

            <a
              href="mailto:hello@quickbrownfox.io"
              className="mt-5 inline-flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
            >
              {/* <Mail size={16} /> */}
              hello@quickbrownfox.io
            </a>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-white/80 hover:text-white transition-colors"
              >
                {/* <Linkedin size={18} /> */}
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/80 hover:text-white transition-colors"
              >
                {/* <Instagram size={18} /> */}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-white">{heading}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/75 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-8 border-y border-white py-4">
          <p className="text-xs text-center text-white/70">Amplify For  © 2026</p>
        </div>
      </div>
    </footer>
  );
}