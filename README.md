# Meet Vaghani Films Portfolio

React + Vite portfolio site with a small Node API for uploading portfolio videos.

## Run Locally

```bash
npm install
npm run dev
```

`npm run dev` starts both:

- Portfolio API: `http://localhost:5000`
- Vite site: `http://localhost:5173`

## Upload Portfolio Videos

1. Open the site and go to the `Portfolio` section.
2. Click `Admin Project Upload`.
3. Login with the admin password.
   - Default password: `Meet@2005`
   - To change it, set both `ADMIN_PASSWORD` for the API and `VITE_ADMIN_PASSWORD` for the site.
4. Add a project title, category, video file, and optional thumbnail image.
5. Click `Add Project To Portfolio`.

Uploaded videos are saved in `public/uploads`, and portfolio records are saved in `data/portfolio.json`.

Keep `npm run dev` running while uploading. If the upload server is not running, the site will show an error and the video will not be saved only in the admin browser.

## Build

```bash
npm run build
```
