/**
 * Copy a string to the clipboard and confirm with a toast.
 *
 * Client-only (relies on `navigator.clipboard`); call it from an event handler.
 */
export function copyToClipboard(toCopy: string, message = 'Copied to clipboard') {
  const toast = useToast()
  navigator.clipboard.writeText(toCopy).then(() => {
    toast.add({ title: message, color: 'success', icon: 'i-lucide-check-circle' })
  })
}
