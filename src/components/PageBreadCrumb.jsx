import { Link, useSearchParams } from "react-router-dom";
import { titleCase } from "../utility/utils";

const PageBreadCrumb = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const subCategory = searchParams.get("sub-category");
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to={`/products?category=${category}`}>
            {titleCase(category)}
          </Link>
        </li>
        <li>
          {" "}
          <Link
            to={`/products?category=${category}&sub-category=${subCategory}`}
          >
            {titleCase(subCategory)}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default PageBreadCrumb;
