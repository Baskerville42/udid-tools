/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.udid.tools",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // не індексуємо success (із query теж)
  exclude: ["/success", "/success*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
    ],
    // sitemap автоматично додасться
  },
};
