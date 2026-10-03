# David Montaño — Portfolio

A single-page software developer portfolio built with React, TypeScript, Vite, Tailwind CSS, and GSAP. The work spans web interfaces, hospitality operations, and C/systems projects from 42 Porto.

## Development

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run build
npm run lint
npx tsc --noEmit
npx tsc --noEmit -p tsconfig.app.json
npm run test:e2e
```

Browser tests use an installed Google Chrome (`channel: 'chrome'`) and start Vite automatically. They cover all nine viewport sizes from the final audit request, the previous tablet sizes, and an additional 1024×500 short viewport. Screenshots are saved under ignored `test-results/`. `npx playwright test` also includes the desktop composition captures and section-height measurements in `tests/audit.spec.ts`.

The browser suite checks externally hosted previews and source URLs as well as local behavior. On 2026-10-03, both live sites and all five project source URLs responded successfully, including `https://github.com/Daviddm03/philo`. LinkedIn returns 999 to automated requests and requires a manual signed-out check. Email uses `mailto:`; no email was sent during validation.

## Motion and navigation

- Native scrolling; no router or scroll replacement.
- The desktop Hero → Introduction pin retains its 120% scroll distance and 0.8 scrub smoothing.
- Reduced motion shows both landing sections in normal flow and the completed construction scene. Short mobile viewports and all viewports under 600px high also use the normal-flow landing layout.
- Supporting group reveals use existing GSAP/ScrollTrigger contexts, play once, and disappear entirely under reduced motion. The About narrative, Stack scanner, and construction choreography retain their custom behavior.
- Building Next plays once, keeps the truck and its cargo in place, and rearms only after returning to the page top. On mobile, later construction phases wait for their panels to enter view.
- The Portal menu contains keyboard focus, supports Escape, locks background scrolling, and restores focus to its opener.

See [the final audit report](docs/final-audit-report.md) for current validation, measurements, recruiter assessment, remaining issues, and launch priorities. The [refinement report](docs/refinement-report.md) and [refinement plan](docs/refinement-plan.md) document the earlier 2026-10-02 pass. Production canonical/absolute social image metadata should be added when the deployed portfolio URL is known.
