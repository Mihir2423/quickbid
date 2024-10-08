import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadCrumbProps {
  links: { name: string; path: string }[];
  page: string;
}

export const BreadCrumb = ({ links = [], page }: BreadCrumbProps) => {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList className="bg-gray-200 p-2 rounded-md w-fit text-base">
        {links.map((link, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={link.path}>{link.name}</BreadcrumbLink>
            </BreadcrumbItem>
            {index === links.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
        {page && (
          <BreadcrumbItem>
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
