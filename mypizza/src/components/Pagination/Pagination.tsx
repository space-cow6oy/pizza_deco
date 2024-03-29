import { FC, SetStateAction } from 'react';
import s from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
};

export const Pagination: FC<PaginationProps> = ({ setCurrentPage }) => {
  return (
    <>
      <ReactPaginate
        className={s.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setCurrentPage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={2}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
