# Real Capita — Google sign-in setup

The **Continue with Google** button is visible on both `login.html` and `register.html`. It does not create a real account while running this local, frontend-only prototype. The button explains what must be configured if clicked.

## Enabling live sign-in later

1. Create a Google Cloud project and configure the Google Identity Services OAuth consent screen.
2. Create an **OAuth 2.0 Web client ID**. Add your deployed web origin (such as `https://your-domain.example`) to Authorized JavaScript origins. `file://` cannot be used as an OAuth authorized origin.
3. Open `assets/js/google-config.js` and set `clientId` to the public Web client ID and `verifyUrl` to your own HTTPS backend route. Do not put a Google client secret in this file.
4. Implement `POST /api/auth/google` on the Real Capita backend. Verify the Google ID token server-side using the official Google library (signature, audience, issuer and expiry). Create or link a user account only after verification; create a secure HttpOnly session cookie. Enforce appropriate CSRF protection and your authorization rules.
5. Deploy over HTTPS. Google Identity Services will render an official Google button automatically when the configured service can be reached. The frontend sends the ID token to your verification endpoint and redirects to the buyer dashboard only after a success response.
6. Connect the buyer dashboard and authorization checks to the actual server session. No demo local session is created from a Google credential.

**Important:** The demo email/password sign-in also uses browser-local state; it is not production authentication. Keep credential verification on the backend before going live.
