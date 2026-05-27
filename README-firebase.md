# Firebase and Google Cloud Upload Setup

This app uploads images directly to a private Google Cloud Storage bucket. A
Firebase Cloud Functions storage trigger writes uploaded image metadata to
Firestore.

## Required configuration

1. Create or select a Firebase project.
2. Enable Firestore.
3. Enable Cloud Storage for Firebase or use a private GCS bucket.
4. Set these environment variables for the Next app:
   - `GOOGLE_CLOUD_PROJECT`
   - `GCS_BUCKET_NAME`
   - `GOOGLE_APPLICATION_CREDENTIALS` for local development
   - optional `FIRESTORE_DATABASE_ID`
5. Replace the placeholder project id in `.firebaserc`.
6. Set the Functions environment variable `GCS_BUCKET_NAME` if you want the
   storage trigger to ignore other buckets.

## Bucket CORS

The browser uploads with a signed `PUT` URL and custom `x-goog-meta-*` headers.
Configure bucket CORS to allow:

- method: `PUT`
- headers: `content-type`, `x-goog-meta-title`, `x-goog-meta-category`,
  `x-goog-meta-description`, `x-goog-meta-tags`, `x-goog-meta-owner-id`
- origin: your app origin

## Commands

```bash
npm run functions:build
npm run lint
npm run build
firebase deploy --only functions,firestore:rules,storage
```
