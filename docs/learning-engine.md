# Learning Engine Architecture

The Field Ops learning engine is built to track and optimize long-term retention of Kaseya product knowledge. It uses a spaced repetition system (SRS) based on the SM-2 algorithm, enhanced with confidence intervals and mastery estimation.

## SM-2 Implementation

The core algorithm is a variant of SuperMemo 2 (SM-2). It schedules the next review date based on user performance:

- **Ease Factor (EF):** Represents how easy an item is. It starts at `2.5`. Correct answers maintain or increase EF, while incorrect or "hard" answers decrease it (minimum `1.3`).
- **Interval (I):** The number of days until the next review.
  - 1st review: `I = 1` day
  - 2nd review: `I = 6` days
  - 3rd+ review: `I = previous I * EF`

### Ratings
When a user reviews a flashcard or repairs a mistake, they provide a rating:
- **Again (0):** The user failed. Interval resets to 0 (review again today or tomorrow), EF drops.
- **Hard (1):** The user remembered, but it was difficult. Interval grows slowly. EF drops slightly.
- **Good (2):** The user remembered comfortably. Normal interval growth. EF stays neutral.
- **Easy (3):** The user remembered effortlessly. Interval grows quickly. EF increases.

## Confidence Penalization

Unlike traditional SM-2, we track `ConfidenceLevel` (guessing, somewhat, confident, highly_confident) *before* the user sees the answer (in scenarios).
- If a user marks "highly_confident" but answers incorrectly, they suffer a higher Ease Factor penalty and are flagged for faster relearning, because *overconfidence* in an MSP setting leads to dangerous actions.
- A "guessing" correct answer receives a smaller interval boost than a "confident" correct answer.

## Mastery Formula

The `masteryEstimate` is a 0-100 score indicating how ingrained the knowledge is.
It is calculated as a blend of:
1. **Streak:** Consecutive correct answers.
2. **Interval Length:** Longer intervals indicate long-term retention.
3. **Ease Factor:** Higher ease means the knowledge is fluent.

This feeds into the `ModuleCompetency` object to update metrics like `knowledge` and `retention`.

## How Content Feeds the Engine

- **Scenarios:** A correct path through a scenario updates the `decisionMaking` and `procedure` competencies. A wrong path generates a `Mistake` which is fed to the Mistake Bank and eventually scheduled by the `DailySessionEngine` for repair.
- **Flashcards:** Standard fact-recall feeding `knowledge`.
- **Field Test Simulator:** End-of-module exams that penalize mistakes and boost competency if passed without hints.
