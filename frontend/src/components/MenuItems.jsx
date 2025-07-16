import { Children } from "react";
import PropTypes from "prop-types";

export default function MenuItems( {href, children} ) {
    return (
        <li>
            <a 
                href={href}
                className="flex gap-4 items-center py-2 px-2 font-medium text-base"
                target={href.startsWith('http') ? '_blank' : undefined }
                rel={href.startsWith('http') ? 'noopener noreferer' : undefined}
            >
                {children}
            </a>
        </li>
    )
}

MenuItems.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};