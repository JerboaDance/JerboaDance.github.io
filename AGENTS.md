# Agent workflow and search indexing

These instructions apply to this repository. The static site is published from
`docs/`; the default branch is `master`.

## Required workflow

Do not skip or reorder these gates.

1. **Investigate and plan before editing.** Read relevant code, tests,
   documentation, and repository status. Plan the behavior, data flow, tests,
   rollout, relevant security and search-indexing impacts, and known tradeoffs.
2. **Get Rubber Duck approval before implementation.** Have a separate-model
   reviewer challenge the plan. Do not edit files, change dependencies, or begin
   implementation until there are no blocking design or logic concerns. Revise
   and resubmit the plan when blockers are found.
3. **Work on a feature branch.** Inspect the branch and working tree, preserve
   existing user changes, and use a descriptive `feature/<short-description>`
   branch before editing. If switching safely is not possible, ask the user.
   Never implement or commit on `master` or another default branch. Never push
   to `master` or another default branch, including from a feature branch; do not
   rely on remote branch protection. Never rewrite history, force-push, or amend
   commits unless explicitly requested.
4. **Implement and validate completely.** Follow existing conventions and keep
   changes focused. Add or update tests for changed behavior and run the smallest
   relevant existing tests, linters, and builds. Do not claim completion while
   required checks are failing.
5. **Get independent code-review approval before handoff.** Submit the complete
   diff, including new files, to the code-review agent. Resolve high-confidence
   correctness, security, data-loss, and regression findings. For material fixes,
   rerun relevant validation and obtain another review before committing or
   pushing.
6. **Commit, push, and hand off without merging.** After validation and review
   approval, commit and push the completed feature branch; no additional request
   is needed for those actions. Report the meaningful changes, branch, checks,
   review outcome, and unresolved limitations. Provide a GitHub compare URL
   against `master`. Do not create, approve, or merge a pull request unless the
   user explicitly asks. Never merge into the default branch during
   implementation.

Approval means no unresolved blocking design flaws or high-confidence bugs,
security problems, data-loss risks, or regressions, as appropriate to the gate.
An unavailable reviewer, timeout, incomplete review, or ambiguous response is not
approval. Stop and report the blocked gate rather than bypassing it.

## Search indexing and URL continuity

Consider search-indexing impacts in every design and review, not as cleanup
after implementation.

- Published URLs are compatibility contracts. Preserve IDs, paths, filename case,
  and existing links when changing content or adding details.
- Publish upcoming shows as ordinary show/performance pages at their lasting
  `/shows/<id>.html` URLs. Support missing details in the existing model and
  template; fill them in place. Do not introduce temporary page types or routes
  that require migration when dates, cast, artwork, or tickets become available.
- Before changing routes, IDs, URL helpers, generators, redirects, navigation,
  sitemap entries, or page metadata, identify effects on indexed URLs and
  discoverability. Keep generated pages and runtime rendering consistent.
- Do not rename or delete published pages without explicit approval of the
  migration. If a URL must change, preserve access from the old URL using the
  site's supported redirect approach and update internal links and the sitemap.
- Remove obsolete redirect stubs only after the user approves the indexing
  transition and checks confirm replacement pages exist, are in the sitemap,
  and retained site files no longer reference the retired URLs.
- Preserve existing sitemap URLs and priorities unless the task intentionally
  changes them. Do not bulk-regenerate unrelated pages or sitemap priorities.

## Relevant files and validation

- `docs/scripts/database.js` defines show and performer IDs and content.
- `docs/scripts/urls.js` defines public show, performer, and asset paths.
- `tools/generateShowsFolder.cjs` defines the generated show-page template.
- `tools/generateSitemap.js` and `docs/sitemap.xml` control sitemap entries.
- Verify new and retained sitemap URLs resolve locally, internal links remain
  valid, and adding missing show details leaves the public URL unchanged.
- Include search-indexing impact in the design duck and independent code review.
  Report what was checked; local validation does not prove that a search engine
  has crawled, indexed, or archived a page.
