<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application structure
- Keep shareable information pages as separate TanStack file routes, with a shared site shell in the root route, so navigation and page metadata stay consistent.
- Store assessments as authenticated, user-owned Cloud records protected by row-level security; keep personal details only on each assessment and do not create a reusable profile table.
- Run the explainable symptom text matching, graph traversal, and risk/recommendation rules in server-only application code, keeping health guidance educational and non-diagnostic.
- Keep the assessment layout mobile-first with stacked fields, a stable four-column progress indicator, and a desktop-only editorial aside so narrow screens prioritize the form.
