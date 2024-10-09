export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DocEye",
  description: "Doctor portal website!",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Package",
      href: "/package",
    },
    {
      label: "Contact us",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Package",
      href: "/package",
    },
    {
      label: "Contact us",
      href: "/contact",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "/signin",
  },
};
