import { site, whatsappLink } from "@/data/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export default function FloatingButtons() {
  return (
    <div className="fab" aria-label="Quick contact">
      <a
        href={whatsappLink("Hi YM Cars, I'd like some information please.")}
        className="fab__btn fab__btn--wa"
        target="_blank"
        rel="noopener"
        aria-label={`WhatsApp ${site.whatsappDisplay}`}
      >
        <WhatsAppIcon size={28} />
        <span className="fab__label">WhatsApp</span>
      </a>
      <a href={site.phoneHref} className="fab__btn fab__btn--call" aria-label={`Call ${site.phoneDisplay}`}>
        <PhoneIcon size={24} />
        <span className="fab__label">Call Now</span>
      </a>
    </div>
  );
}
