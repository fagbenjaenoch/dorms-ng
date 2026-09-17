export function generateErrorMailLink({
  subject,
  body,
  recipient: recepient,
}: {
  subject: string;
  body: string;
  recipient: string;
}) {
  return `mailto:${recepient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
