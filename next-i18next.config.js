/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'am'],
    localeDetection: false, // Changed to false to address warning
  },
  fallbackLng: {
    default: ['en'],
  },
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
