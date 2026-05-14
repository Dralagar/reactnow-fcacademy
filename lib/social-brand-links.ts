import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa";
import {
  SiFacebook,
  SiInstagram,
  SiMastodon,
  SiSlack,
  SiTiktok,
  SiX,
} from "react-icons/si";

/** Serializable key — mapped to icons inside `SocialBrandGlyph` */
export type SocialBrandKey =
  | "tiktok"
  | "x"
  | "instagram"
  | "linkedin"
  | "facebook"
  | "mastodon"
  | "slack";

export const SOCIAL_BRAND_ICONS: Record<SocialBrandKey, IconType> = {
  tiktok: SiTiktok,
  x: SiX,
  instagram: SiInstagram,
  linkedin: FaLinkedin,
  facebook: SiFacebook,
  mastodon: SiMastodon,
  slack: SiSlack,
};

/**
 * `publicUrl` loads from /public/images/ when files exist.
 * `brand` selects the SVG fallback when the file is missing (404).
 */
export type NavSocialBrandLink = {
  publicUrl: string;
  href: string;
  label: string;
  brand: SocialBrandKey;
};

export const NAV_SOCIAL_BRAND_LINKS: NavSocialBrandLink[] = [
  {
    publicUrl: "/images/Tiktok.jpeg",
    href: "https://www.tiktok.com/@react_now.fc.academy?_r=1&_t=ZS-95UZc6038WD",
    label: "TikTok",
    brand: "tiktok",
  },
  {
    publicUrl: "/images/Xlogo.png",
    href: "https://x.com/reactnowfc?s=21",
    label: "X (Twitter)",
    brand: "x",
  },
  {
    publicUrl: "/images/InstLOGO.jpeg",
    href: "https://www.instagram.com/reactnowfc_academy?igsh=ODluamo4NGhhbHdl&utm_source=qr",
    label: "Instagram",
    brand: "instagram",
  },
  {
    publicUrl: "/images/LinkedInLogo.png",
    href: "https://linkedin.com/company/reactnowfc",
    label: "LinkedIn",
    brand: "linkedin",
  },
  {
    publicUrl: "/images/Facebooklogo.png",
    href: "https://facebook.com/reactnowfc",
    label: "Facebook",
    brand: "facebook",
  },
  {
    publicUrl: "/images/mastadonLogo.png",
    href: "https://mastodon.social/@reactnowfc",
    label: "Mastodon",
    brand: "mastodon",
  },
  {
    publicUrl: "/images/slack.png",
    href: "https://join.slack.com/t/reactnowfc/shared_invite/xxx",
    label: "Slack",
    brand: "slack",
  },
];

export type FooterSocialBrandLink = NavSocialBrandLink & { gradient: string };

export const FOOTER_SOCIAL_BRAND_LINKS: FooterSocialBrandLink[] = [
  {
    publicUrl: "/images/Tiktok.jpeg",
    href: "https://www.tiktok.com/@react_now.fc.academy?_r=1&_t=ZS-95UZc6038WD",
    label: "TikTok",
    brand: "tiktok",
    gradient: "from-black to-gray-800",
  },
  {
    publicUrl: "/images/Xlogo.png",
    href: "https://x.com/reactnowfc?s=21",
    label: "X (Twitter)",
    brand: "x",
    gradient: "from-slate-600 to-slate-800",
  },
  {
    publicUrl: "/images/InstLOGO.jpeg",
    href: "https://www.instagram.com/reactnowfc_academy?igsh=ODluamo4NGhhbHdl&utm_source=qr",
    label: "Instagram",
    brand: "instagram",
    gradient: "from-[#e4405f] to-[#d81f3d]",
  },
  {
    publicUrl: "/images/LinkedInLogo.png",
    href: "https://linkedin.com/company/reactnowfc",
    label: "LinkedIn",
    brand: "linkedin",
    gradient: "from-[#0077b5] to-[#005582]",
  },
  {
    publicUrl: "/images/Facebooklogo.png",
    href: "https://facebook.com/reactnowfc",
    label: "Facebook",
    brand: "facebook",
    gradient: "from-[#1877f2] to-[#0e5fc7]",
  },
  {
    publicUrl: "/images/mastadonLogo.png",
    href: "https://mastodon.social/@reactnowfc",
    label: "Mastodon",
    brand: "mastodon",
    gradient: "from-[#6364ff] to-[#4a4ad6]",
  },
  {
    publicUrl: "/images/slack.png",
    href: "https://join.slack.com/t/reactnowfc/shared_invite/xxx",
    label: "Slack",
    brand: "slack",
    gradient: "from-[#4A154B] to-[#36123b]",
  },
];
