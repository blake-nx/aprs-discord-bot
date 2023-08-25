export default function titleCase(title) {
  if (title.length > 0) {
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
  return;
}
