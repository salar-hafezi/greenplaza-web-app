import React from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
} from 'reactstrap';

const CustomPagination = (props) => {
    const { activePage,
        lastPage,
        pageChangeHandler,
        movementHandler,
        pageRange
    } = props;

    return (
        <div className="text-center pagination-container">
            <Pagination
                aria-label="pagination">
                <PaginationItem
                    disabled={activePage === 1}
                    onClick={() => movementHandler('first')}
                >
                    <PaginationLink first />
                </PaginationItem>
                <PaginationItem
                    disabled={activePage === 1}
                    onClick={() => movementHandler('prev')}
                >
                    <PaginationLink previous />
                </PaginationItem>
                {pageRange.map((page, index) => (
                    <PaginationItem
                        key={page}
                        active={activePage === page}
                        onClick={() => pageChangeHandler(page)}
                    >
                        <PaginationLink>{page}</PaginationLink>
                    </PaginationItem>
                )
                )}
                <PaginationItem
                    disabled={activePage === lastPage}
                    onClick={() => movementHandler('next')}>
                    <PaginationLink next />
                </PaginationItem>
                <PaginationItem
                    disabled={activePage === lastPage}
                    onClick={() => movementHandler('last')}>
                    <PaginationLink last />
                </PaginationItem>
            </Pagination>
        </div>
    );
};

export default CustomPagination;
