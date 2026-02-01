"use client"
import DateRange from '@/components/DateRange'
import { PageCount } from '@/components/PageCount'
import Pagination from '@/components/Pagination'
import StatusDropdown from '@/components/StatusDropdown'
import { TableSheet } from '@/components/TableSheet'
import { WeekData } from '@/types/WeekData'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Page() {
  const {data : session, status} = useSession()
  const router = useRouter()

  const { data: weeks = [] } = useSWR<WeekData[]>("/api/week", fetcher)

  const [pageCount, setPageCount] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(weeks.length / pageCount)

  useEffect(() => {
    if(status === 'unauthenticated') {
      router.replace('/')
    }
  }, [status, router])

  if(status === 'loading') {
    return <div>Loading...</div>
  }

  if(!session) return null
  
  return (
    <div className='bg-white h-130 rounded-md px-8 py-4 flex flex-col gap-4'>
      <h1>Your Timesheets</h1>
      <div className='flex gap-4'>
        <DateRange />
        <StatusDropdown />
      </div>

      <TableSheet pageCount={pageCount} currentPage={currentPage}/>

      <div className='flex justify-between'>
        <PageCount pageCount={pageCount} setPageCount={setPageCount}/>
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
        )}
      </div>
    </div>
  )
}
