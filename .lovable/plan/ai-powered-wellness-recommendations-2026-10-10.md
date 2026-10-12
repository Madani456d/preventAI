# AI-powered wellness recommendations

## Build
- Connect the existing assessment review step to an AI-generated recommendation result using the Lovable AI Gateway, with all model calls and credentials kept server-side.
- Send only the health context needed for guidance; exclude the name and do not persist the submitted assessment or recommendations.
- Present practical wellness suggestions, possible areas to discuss with a clinician, and clear urgent-care guidance, with persistent educational/non-diagnostic disclaimers.
- Keep the existing four-step journal-style assessment and make loading, errors, and completion usable on mobile.

## Technical details
- Use TanStack Start server functions and the Responses API with the workspace default model, following the required gateway setup and status handling.
- Validate and constrain submitted fields; stream the model response server-side and return final recommendations to the assessment page.
- No database schema changes or history feature are included.
