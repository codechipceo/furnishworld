
import React from "react";
import { Link } from "react-router-dom";

// BreadcrumbItem Component
const BreadcrumbItem = ({ children, href, active }) => {
  const linkClasses =
    "ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ms-2 dark:text-gray-400 dark:hover:text-white";
  const activeClasses =
    "ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400";

  return (
    <li>
      <div className='flex items-center'>
        {/* Only show the chevron for non-first items */}
        {!active && (
          <svg
            className='rtl:rotate-180 w-3 h-3 text-gray-400 mx-1'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 6 10'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 9 4-4-4-4'
            />
          </svg>
        )}
        {active ? (
          <span className={activeClasses} aria-current='page'>
            {children}
          </span>
        ) : (
          <Link to={href} className={linkClasses}>
            {children}
          </Link>
        )}
      </div>
    </li>
  );
};

// Breadcrumb Component
const Breadcrumb = ({ items }) => {
  return (
    <nav className='flex mb-4' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index === 0 ? ( // Special handling for the first "Home" item
              <li className='inline-flex items-center'>
                <Link
                  to={item.href}
                  className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white'
                >
                  <svg
                    className='w-3 h-3 me-2.5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
                  </svg>
                  {item.label}
                </Link>
              </li>
            ) : (
              <BreadcrumbItem href={item.href} active={item.active}>
                {item.label}
              </BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
