export function findHashtags(searchText: string) {
  const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
  const result = searchText.match(HASHTAG_REGEX);

  return result || [];
}
