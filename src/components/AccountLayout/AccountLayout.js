const navigation = [
  { name: "Account", href: "#", current: true },
  { name: "Change Password", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  return (
    <nav className="flex flex-1 flex-col col-span-1" aria-label="Sidebar">
      <ul role="list" className="-mx-2 space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-50 text-evening-sea-600"
                  : "text-gray-700 hover:text-evening-sea-600 hover:bg-gray-50",
                "group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold"
              )}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
