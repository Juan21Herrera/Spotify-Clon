import PropTypes from "prop-types";

export default function MenuItems({ href, children }) {
  const isExternal = href.startsWith("http");

  return (
    <li className="w-full">
      <a
        href={href}
        className="flex gap-3 items-center py-2 px-3 font-medium text-sm sm:text-base text-gray-200 hover:text-white hover:bg-[#282828] rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    </li>
  );
}

MenuItems.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
