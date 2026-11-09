# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Admin account deletion

Admin account deletion runs through a Firebase callable Cloud Function so the
Firebase Authentication account and its Firestore profile are both removed.
Deploy it to the configured Firebase project with the Firebase CLI:

```sh
firebase deploy --only functions:deleteUserAccount
```

Cloud Functions deployment may require the Firebase project to use the Blaze
plan. The function checks the caller's admin role (or the configured admin
email) and prevents deleting the caller's own account.

## Google sign-in

Enable the Google provider under Firebase Console → Authentication → Sign-in
method, and add the deployed site's domain under Authentication → Settings →
Authorized domains. First-time Google sign-ins get a basic choir profile and
can add their grade, group, part, and phone number later from their profile.
