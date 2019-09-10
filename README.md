# gunar - 2019-09-10

## Installation
```
yarn install
```

### Developing
```
yarn dev
```

### Running

```
yarn build && yarn start
```

### Testing

```
yarn test
```

## Security
### Concerns that have been addressed
- Memory overflow because file too big (check happens on the backend)
- Upload of non-image files (weak check because mime-based)
- Upload of malicious code — even if an attacker successfully uploads code disguised as an image, this code would never be executed, because both backend and frontend have a build phase
- Deleting files outside of the `/public` folder (e.g. `DELETE ../index.js`)
- Uploading files outside the `/public` folder (e.g. `UPLOAD ../index.js`)
- Listing files outside the `/public` folder (e.g. `GET /files?query=../`)
- Files are never placed in `/public` before validations (i.e. they're placed in the `/tmp` folder)
- XSS in the filename — Invalid file names such as `file<script>...</script>.jpg` fail to be uploaded because the library `multiparty` fails to parse it. Nonetheless, we do a `striptags` on the filename just in case.
### Concerns to be addressed as improvement
- Content Security Policy (CSP) — This is important, but I've had [too much](https://github.com/zeit/next.js/issues/256) [trouble](https://github.com/zeit/next.js/issues/4591) trying to make it play nice with `Next.js` and I can't spend more time on this right now
- Store files in a third-party persistent storage service (e.g. AWS S3)
- When doing operations on files (e.g. deleting) it's usually safer to reference files by their `uid`s than by their names
- API security tests that, for example, assert that the application doesn't allow a user to invoke `DELETE ../index.js`
- Actually testing that the file uploaded is a valid image, instead of just relying on mime-type

## Improvements
- **TypeScript.** Not worth it for a small project like this but can't-live-without for large scale applications—and by the way, typings for `Next.js` are very good
- **Optimistic updates.** For deletions, searches, and uploads
- **Thumbnails.** For images uploaded
- **Progress bar.** For uploads
- **External storage.** Storing files in a third-party (e.g. AWS S3) instead of local persistent storage.
- **Testing the File Select Dialog.** There's currently no way to have cypress select files from the File Select Dialog, so instead of clicking the `Upload` button, we're hooking directly into hidden `<Input type="file"/>` element

## Libraries
- `next` — [Next.js](https://nextjs.org) React Framework
- `isomorphic—unfetch` — Making API calls both from frontend and as Server—Side Rendering
- `prettier` — Formatting the code (not added as an explicit dependency)
- `multiparty` — Parsing multipart—form data requests (i.e. file uploads)
- `micro` — For parsing the body of requests differently depending on the HTTP VERB — needed to allow `PUT` and `DELETE` to the same endpoint route
- `p-debounce` — Avoiding making too many calls to the backend when typing in the search query
- `react—toastify` — Presenting success and error notifications
- `striptags` — Removing HTML tags to avoid XSS
- `cypress` — End—to—end tests
- `cypress-file-upload` — Command for Cypress to simulate file uploads

## API
`Next.js` automatically generates API Endpoints for files under the `/pages/api` directory.

### GET /api/files?query=
- Returns a list of files
- Query arguments: `query` — filters results

### PUT /api/file
- Uploads a file
- Expects `multipart/form-data`
- Max file size: 10mb
- Returns `200` on success

### DELETE /api/file
- Deletes a file
- JSON POST arguments: `filename` — name of the file to be deleted
- Returns `200` on success

---
## Other notes
Hi, and thanks for taking a look at my code.

As you can see, `Next.js` is doing all the heavy lifting. Thanks `Next.js`!

Cheers,

Gunar
