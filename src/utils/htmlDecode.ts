export function htmlDecode(str: string) {
  const doc = new DOMParser().parseFromString(str, 'text/html');

  return doc.documentElement.textContent;
}
