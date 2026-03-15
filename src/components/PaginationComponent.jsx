import { Pagination } from "flowbite-react";        

export default function PaginationComp({currentPage,onPageChange}) {

    return (
        <div className="flex overflow-x-auto sm:justify-center">
            <Pagination layout="pagination" currentPage={currentPage} totalPages={100} onPageChange={onPageChange} previousLabel="BACK" nextLabel="NEXT" showIcons />
        </div>
    );
}