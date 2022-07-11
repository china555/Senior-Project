import React, { useEffect, useState } from "react";
import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { DOTS, usePagination } from "../../hooks/usePagination";
import classnames from "classnames";

interface IPagination {
  totalCount: number;
  currentPage: number;
  based_index?: number;
  pageSize: number;
  onPageChange: (currentPage: number) => void;
  siblingCount?: number;
  className: string;
}
export const HeartsPagination = (props: IPagination) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  // @ts-ignore
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  // @ts-ignore
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <UnorderedList
      my={5}
      marginInlineStart={0}
      className={classnames("pagination-container", { [className]: className })}
    >
      {/* Left navigation arrow */}
      <ListItem
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <Box className="arrow left" />
      </ListItem>
      {paginationRange?.map((pageNumber: any, index: number) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
        return (
          <ListItem
            key={`@!-${index}`}
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </ListItem>
        );
      })}
      <ListItem
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </ListItem>
    </UnorderedList>
  );
};
