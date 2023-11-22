import { useMemo } from 'react';
export interface usePaginationArgs {
  totalPageCount: number;
  siblingCount: number;
  currentPage: number;
}

export const usePagination = ({
  totalPageCount,
  siblingCount = 1,
  currentPage,
}: usePaginationArgs) => {
  const paginationRange = useMemo(() => {
    const LEFT_DOTS = 'LEFT_DOTS';
    const RIGHT_DOTS = 'RIGHT_DOTS';
    // Case 1:
    //   If the number of pages is less than the page numbers we want to show in our
    //   paginationComponent
    if (totalPageCount < 7) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Case 2: No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, RIGHT_DOTS, totalPageCount];
    }

    // 	Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, LEFT_DOTS, ...rightRange];
    }

    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        firstPageIndex,
        LEFT_DOTS,
        ...middleRange,
        RIGHT_DOTS,
        lastPageIndex,
      ];
    }
  }, [totalPageCount, siblingCount, currentPage]);

  return paginationRange;
};

function range(start: number, end: number) {
  const result = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
