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
4. Add a project title, category, and Google Drive video link.
5. Click `Add Project To Portfolio`.

Portfolio records are saved in `data/portfolio.json`. Optional custom thumbnails are saved in `public/uploads`.

For Google Drive videos, open sharing access for the file so visitors can view it. Use a Drive link like `https://drive.google.com/file/d/FILE_ID/view`.

## Add Portfolio Videos In Code

You can also add videos manually in `src/data/siteData.js` inside `portfolioItems`:

```js
{
  id: 'car-delivery-shoot',
  title: 'Car Delivery Shoot',
  category: 'Car/Bike Delivery Shooting',
  year: '2026',
  googleDriveUrl: 'https://drive.google.com/file/d/FILE_ID/view',
  thumbnail: 'https://your-thumbnail-image-url.jpg',
  aspectRatio: '16 / 9',
}
```

The `googleDriveUrl` will automatically open in the portfolio video player.

Keep `npm run dev` running while uploading. If the upload server is not running, the site will show an error and the video will not be saved only in the admin browser.

## Build

```bash
npm run build
```
