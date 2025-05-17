import { Link, useLocation } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
const Breadcrumbs = () => {
  const location = useLocation();
  const path = location.hash ? location.hash.slice(1) : location.pathname;
  const segments = path.split("/").filter(Boolean); // Remove empty segments
  const newPath = segments[1]
    const { user } = useSelector((state) => state.auth);
  
  // console.log(newPath)

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
  const isLast = index === segments.length - 1;

  // Replace userId-like segments with something readable
  const isUserId = segment.length > 20 && !segment.includes('-'); // adjust based on your ID pattern
  const isNumeric = !isNaN(segment);
  const isUndefined = segment === 'undefined';

  // Decide what to show
  let label = decodeURIComponent(segment);
  if (isUndefined) return null;
  if (isUserId || isNumeric) label = user.name || 'profile'; // or a dynamic name if you have it

  return (
    <li key={to} className="flex items-center">
      {/* Separator */}
      <span className="text-xl ml-3 mr-2 text-gray-400">›</span>

      {/* Breadcrumb Link / Text */}
      {isLast ? (
        <span className="text-gray-700 font-semibold capitalize">{label}</span>
      ) : (
        <Link to={to} className="text-blue-500 ml-2 hover:underline capitalize">
          {label}
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
