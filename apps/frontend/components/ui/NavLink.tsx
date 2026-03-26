interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  return (
    <a
      className="hover:text-primary hover:border-b-2 hover:border-b-secondary"
      href={href}
    >
      {label}
    </a>
  );
}
