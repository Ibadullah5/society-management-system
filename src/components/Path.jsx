import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

const Path = () => {
  const paths = useLocation();
  const pathNames = paths.pathname.split("/").filter((path) => path);

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink asChild>
          <Link to="/">Home</Link>
        </BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {pathNames.map((link, index) => {
            const isIdPath = link === "id";
            const linkName =
              isIdPath && id
                ? `${id}`
                : link.charAt(0).toUpperCase() + link.slice(1);
            const href =
              isIdPath && id
                ? `${location.pathname}?id=${id}`
                : `/${pathNames.slice(0, index + 1).join("/")}`;
            const isLastPath = pathNames.length === index + 1;
            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={href}>{linkName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!isLastPath && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Path;
