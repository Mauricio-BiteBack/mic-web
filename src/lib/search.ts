export function normalizeText(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[] = new Array(n + 1);
  for (let j = 0; j <= n; j++) dp[j] = j;
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = temp;
    }
  }
  return dp[n];
}

function wordMatches(word: string, query: string): boolean {
  // Words/queries shorter than 3 chars (e.g. "a", "tv", "d") are too short to
  // fuzzy- or substring-match without producing noisy false positives.
  if (word.length < 3 || query.length < 3) return word === query;
  if (word.includes(query) || query.includes(word)) return true;
  const maxDist = query.length <= 4 ? 1 : query.length <= 8 ? 2 : 3;
  return levenshtein(word, query) <= maxDist;
}

/** Accent-insensitive, case-insensitive, typo-tolerant match of `query` within `text`. */
export function fuzzySearch(text: string, query: string): boolean {
  const normQuery = normalizeText(query);
  if (!normQuery) return true;

  const normText = normalizeText(text);
  if (normText.includes(normQuery)) return true;

  const textWords = normText.split(/\s+/).filter(Boolean);
  const queryWords = normQuery.split(/\s+/).filter(Boolean);

  return queryWords.every(qw => textWords.some(tw => wordMatches(tw, qw)));
}
