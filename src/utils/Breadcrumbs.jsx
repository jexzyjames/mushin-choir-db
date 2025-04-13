import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const path = location.hash ? location.hash.slice(1) : location.pathname;
  const segments = path.split("/").filter(Boolean); // Remove empty segments
  const newPath = segments[1]
  console.log(newPath)

  return (
    <nav className="text-gray-600 text-sm my-4">
      <ol className="flex items-center m-0">
        {/* Home Link */}
        <li>
          <Link to="/dash" className=" m-0 text-blue-500 hover:underline font-medium">
            Home
          </Link>
        </li>
 
        {segments.map((segment, index) => {
          const to = "/" + segments.slice(0, index + 1).join("/");
          {if(segment.includes('undefined'|| Number)){
            return ''
          }}
          const isLast = index === segments.length - 1;

          return (
            <li key={to} className="flex items-center">
              {/* Separator */}
              <span className="text-xl ml-3 mr-2n text-gray-400">›</span>
              
              {/* Breadcrumb Link / Text */}
              {isLast ? (
                <span className="text-gray-700 font-semibold capitalize">{decodeURIComponent(segment)}</span>
              ) : (
                <Link to={to} className="text-blue-500 ml-2 hover:underline capitalize">
                  {decodeURIComponent(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
