# Samuel Dolle — Portfolio

A React portfolio built from the original FESPortfolio starter, following the layout and interactions of the supplied David Hyesung Lee reference. The animation gallery is omitted.

## Stack

- React and Vite
- Tailwind CSS 4 for layout, spacing, and responsive utilities
- Bootstrap 5 and React Bootstrap for the accessible modal, mobile offcanvas navigation, forms, alerts, and buttons
- Bootstrap Icons, original transparent frontend artwork, and custom CSS animations
- Optional EmailJS integration

Tailwind utilities use the `tw:` prefix. Bootstrap and custom styles have explicit cascade layers, and Tailwind Preflight is omitted so the two frameworks do not apply competing resets.

The transparent frontend artwork was created with built-in image generation; its saved prompt and provenance are in [assets/frontend-art.prompt.txt](assets/frontend-art.prompt.txt).

## Run

Use Node.js 22.12+ (Node 24 LTS recommended).

```sh
npm ci
npm run dev
```

`npm run build` creates the production site in `dist/`. Use `npm run preview` to check it locally. Vite uses relative asset paths, so the build can be served at the repository subpath on GitHub Pages or the root of another static host.

## Content

Edit `src/content.js` to update the introduction, contact links, skills, and projects:

1. Marvel Champions Digital — community build; live demo pending
2. Netflix Clone
3. Summarist
4. Skinstric

The Marvel image comes from the project's repository documentation. The other three images are screenshots of the actual live projects. Marvel's description credits the original Irefrixs project, Summarist's account/subscription flows are described as a demo, and Skinstric's results are described as simulated.

The original starter assets remain in Git for reference. Its sample resume and placeholder project links are not displayed. Set `profile.resume` to a real resume URL to enable the resume link.

## Contact

Without EmailJS configuration, the validated contact form opens the visitor's email application with a draft to `sam_dolle@outlook.com`. The site explicitly labels this action and does not claim the draft was sent.

To enable direct sending, copy `.env.example` to `.env.local` and set the EmailJS service ID, template ID, and public key. Configure the template recipient in EmailJS and use the form variables `user_name`, `user_email`, and `message`. These are public browser integration identifiers; do not put email account passwords or private service credentials in Vite environment variables.

## Interaction and accessibility

- Staggered hero entrance, original frontend artwork with a slide-in entrance, gentle floating, pointer-responsive tilt, hover lift, and scroll indicator
- Project zoom/blur/overlay transitions with mouse and keyboard access
- Project descriptions always visible on phone and touch layouts
- Light/dark preference saved in local storage
- Focus-trapped, keyboard-dismissible Bootstrap dialog and mobile navigation
- Form labels, input validation, status announcements, and honest email-draft fallback
- Decorative hero artwork is hidden from assistive technology and omitted on phone layouts
- Reduced-motion preference respected; hero artwork motion and hover transforms are disabled

## Checks

`npm run build` is run in GitHub Actions on pushes and pull requests. Browser QA covers desktop and phone layouts, image loading, modal open/close, focus restoration, theme persistence, project details, and form validation.

## Deployment

The live portfolio is hosted at [sdolle1775.github.io/FESPortfolio](https://sdolle1775.github.io/FESPortfolio/).

Every push to `main` builds and deploys `dist/` to GitHub Pages. The workflow can also be run manually from GitHub Actions. Other branches and pull requests only run the build check. Repository Settings → Pages uses **GitHub Actions** as its publishing source.
