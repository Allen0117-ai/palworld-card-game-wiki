export const ANALYTICS_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    && process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
);

// Keep prior analytics opt-in for EEA countries plus the United Kingdom and Switzerland.
const ANALYTICS_OPT_IN_REGIONS = [
  "AT", "BE", "BG", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR",
  "GB", "GR", "HR", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT",
  "NL", "NO", "PL", "PT", "RO", "SE", "SI", "SK",
];

export const ANALYTICS_CONSENT_DEFAULTS_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('consent', 'default', {
    ad_personalization: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    analytics_storage: 'granted'
  });
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    region: ${JSON.stringify(ANALYTICS_OPT_IN_REGIONS)},
    wait_for_update: 500
  });
  var savedAnalyticsConsent = null;
  try {
    savedAnalyticsConsent = window.localStorage.getItem('palpagos-analytics-consent');
  } catch (storageError) {
    savedAnalyticsConsent = 'declined';
    console.warn('Analytics consent preference is unavailable.', storageError);
  }
  if (savedAnalyticsConsent === 'accepted' || savedAnalyticsConsent === 'declined') {
    gtag('consent', 'update', {
      ad_personalization: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      analytics_storage: savedAnalyticsConsent === 'accepted' ? 'granted' : 'denied'
    });
  }
  gtag('set', 'allow_google_signals', false);
  gtag('set', 'allow_ad_personalization_signals', false);
  window.clarity = window.clarity || function () {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };
  window.clarity('consentv2', {
    ad_Storage: 'denied',
    analytics_Storage: 'denied'
  });
`;
