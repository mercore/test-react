import { FC } from 'react'
import { TableProps } from './types'

export const Table: FC<TableProps> = ({ headers, data, loading }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope='col' className='px-6 py-3'>
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            (data?.length && data.map((item, index) => (
              <tr key={index} className='bg-white border-b'>
                {Object.keys(item).map(key => (
                  <td key={key} className='px-6 py-4 text-gray-900 whitespace-nowrap'>
                    {item[key]}
                  </td>
                ))}
              </tr>
            ))) || (
              <tr className='text-center font-medium'>
                <td className='p-2' colSpan={headers.length}>No data</td>
              </tr>
            )
          ) : (
            <tr className='text-center font-medium'>
              <td className='p-2' colSpan={headers.length}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}