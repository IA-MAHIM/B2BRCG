/** Google Identity Services settings. Leave blank for a local preview.
 * Use an OAuth Web Client ID and a secure server endpoint in production.
 * Never insert a Google client secret in frontend files.
 */
window.RC_GOOGLE_CONFIG = {
  clientId: "",
  verifyUrl: "/api/auth/google"
};
