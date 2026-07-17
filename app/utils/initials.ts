/**
 * Derives up to two uppercase initials from a name, used as an avatar fallback when no
 * picture is available (e.g. "Hugo Lassiege" → "HL", "Hugo" → "H").
 */
export function getInitials(name?: string): string {
  if (!name) {
    return ''
  }
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) {
    return ''
  }
  if (parts.length === 1) {
    return parts[0]!.charAt(0).toUpperCase()
  }
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase()
}
