"use client"
import { Button } from './ui/button'
import { PaginationProps } from '@/types/PaginationProps'

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    
    // Always show first page
    pages.push(1)
    
    if (totalPages <= 7) {
      // Show all pages if total pages is 7 or less
      for (let i = 2; i <= totalPages - 1; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
      } else if (currentPage >= totalPages - 3) {
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages - 1; i++) {
          pages.push(i)
        }
      } else {
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
      }
    }
    
    // Always show last page if not already included
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages)
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()


  return (
    <div className="flex items-center justify-center border-1 border-white">
      <Button
        className='hover:bg-gray-300 cursor-pointer rounded-l-xl'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        Previous
      </Button>

      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span 
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-sm text-gray-500"
            >
              ...
            </span>
          )
        }
        
        return (
          <Button
            key={page}
            size="icon"
            className={`min-w-[40px] border-x-1 rounded-sm border-x-gray-300 ${
              currentPage === page 
                ? 'bg-gray-100 text-primary-foreground' 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onPageChange(page as number)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Button>
        )
      })}

      <Button
      className='rounded-r-xl hover:bg-gray-300 cursor-pointer'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        Next
      </Button>
    </div>
  )
}