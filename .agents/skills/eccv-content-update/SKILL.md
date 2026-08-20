# ECCV Content Update Skill

Use this skill when updating workshop text, dates, links, speakers, schedules, competition information, organizers, or FAQs.

## Procedure

1. Start in the authoring copy, not `ECCV2026-publish`.
2. Locate the owning field in `src/data/workshopData.js`.
3. Change the smallest relevant data block and preserve its existing shape.
4. Use ISO timestamps for `importantDates` and verify the intended time zone.
5. For portraits, add the image under the appropriate `src/assets/` directory and match its filename to the data name.
6. Run `npm run build`.
7. Run `scripts/sync-publish.ps1` after the build succeeds.
8. Review the resulting publish diff. Do not commit or push automatically.

## Quality Checks

Confirm that the page renders, the updated content appears in the correct section, dates are ordered correctly, links are complete and reachable, portraits load without distortion, and no private information entered the public files.

## Do Not

- Edit compiled `dist/` output by hand.
- Duplicate content edits directly in the publishing clone.
- Guess missing event details.
- copy `node_modules/` or `PRIVATE_WEBSITE_UPDATE_TUTORIAL.md`.
