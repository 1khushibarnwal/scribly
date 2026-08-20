export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Pinned notes first, then newest first within each group.
// Mirrors the sort order used by the backend's getAllNotes query,
// so a restored (undone) note lands back in the right spot.
export function sortNotes(a, b) {
  if (a.pinned !== b.pinned) return b.pinned - a.pinned;
  return new Date(b.createdAt) - new Date(a.createdAt);
}

// Milliseconds to wait before a deleted note is actually removed
// from the server, giving the user a window to hit "Undo".
export const UNDO_DELETE_WINDOW_MS = 5000;
