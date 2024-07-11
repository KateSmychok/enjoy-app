import React from 'react';
import { css, Theme } from '@emotion/react';
import ReactPaginate from 'react-paginate';

export interface PaginationProps {
  selectedPage: number;
  onSelect: (page: number) => void;
  totalPages: number;
}

export function Pagination({
  selectedPage,
  onSelect,
  totalPages,
}: PaginationProps) {
  return (
    <div css={(theme) => containerStyle(theme)}>
      <ReactPaginate
        forcePage={selectedPage - 1}
        containerClassName={'pagination'}
        previousLabel="<"
        nextLabel=">"
        onPageChange={(page: { selected: number }) =>
          onSelect(page.selected + 1)
        }
        pageRangeDisplayed={5}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

const containerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  margin-bottom: 50px;

  .pagination {
    display: flex;
  }
  .pagination > li {
    width: 40px;
    display: flex;
  }
  .pagination > li > a,
  .pagination > li > span {
    width: 100%;
    padding: 9px 0;
    text-align: center;
    text-decoration: none;
    background-color: #fff;
    ${theme.textStyles.bodyMiddle};
    ${theme.colours.textBlack};
  }
  .pagination > li.active > a {
    color: #000;
    background-color: #6cd575;
    cursor: pointer;
    border-radius: 4px;
  }
  .pagination > li.selected > a {
    color: #000;
    background-color: #6cd575;
    cursor: pointer;
    border-radius: 4px;
  }
  .pagination > li.disabled {
    opacity: 0.5;
  }
  .pagination > li > a:hover {
    background-color: #6cd575;
    color: white;
    cursor: pointer;
    border-radius: 4px;
  }
  .pagination .invisible {
    display: none;
  }
`;
