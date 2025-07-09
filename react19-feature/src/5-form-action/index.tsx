import { uuid } from "@/utils";
import { useRef, useState } from "react";
import Modal from "./modal";


const def = {
  id: uuid(),
  name: 'Logo redesign',
  desc: 'New logo and digital asset playbook.',
  hours: 20.0,
  rate: 100.00
}

export default function Table() {

  const modal = useRef<any>(null)
  const [revenues, setRevenues] = useState([def])

  function __onChange(data: typeof def) {
    setRevenues([...revenues, data])
  }

  const subtotal = revenues.reduce((pre, cur) => {
    return pre + cur.hours + cur.rate
  }, 0)

  return <>
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col'>
        <h1 className='text-base font-semibold leading-6 text-gray-900 dark:text-gray-100'>Invoice</h1>
        <p>
          For work completed from <time dateTime="2022-08-01">August 1, 2022</time> to{' '}
          <time dateTime="2022-08-31">August 31, 2022</time>.
        </p>
      </div>
      <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
        <button className='button primary' onClick={() => modal.current.show()}>Add</button>
      </div>
    </div>
    <Modal ref={modal} onChange={__onChange} />
    <div className='-mx-4 mt-8 flow-root sm:mx-0'>
      <table className='min-w-full bg-gray-100'>
        <colgroup>
          <col className='w-full sm:w-1/2' />
          <col className='sm:w-1/6' />
          <col className='sm:w-1/6' />
          <col className='sm:w-1/6' />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className='sm:pl-0'>
              Project
            </th>
            <th scope="col" className='sm:table-cell'>
              Hours
            </th>
            <th scope="col" className='sm:table-cell'>
              Rate
            </th>
            <th scope="col" className='sm:pr-0'>
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {revenues.map((project) => (
            <tr key={project.id}>
              <td className='max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0'>
                <div className='font-medium text-gray-900 dark:text-gray-100'>{project.name}</div>
                <div className='mt-1 truncate text-gray-500 dark:text-gray-400'>{project.desc}</div>
              </td>
              <td className='sm:table-cell'>{project.hours}</td>
              <td className='sm:table-cell'>{project.rate}</td>
              <td className='sm:pr-0'>{project.hours * project.rate}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th
            scope="row"
            colSpan={3}
            className="sm:table-cell"
            >
              Subtotal
            </th>
            <th scope="row" className="sm:hidden">
              Subtotal
            </th>
            <td className="sm:pr-0">${subtotal}</td>
          </tr>
          <tr>
            <th
            scope="row"
            colSpan={3}
            className="sm:table-cell"
            >
              Tax
            </th>
            <th
            scope="row"
            className="sm:hidden"
            >
              Tax
            </th>
            <td className="sm:pr-0">$1760.00</td>
          </tr>
          <tr>
            <th
            scope="row"
            colSpan={3}
            className="sm:table-cell"
            >
              Total
            </th>
            <th
            scope="row"
            className="sm:hidden"
            >
              Total
            </th>
            <td className="sm:pr-0">${subtotal - 1760}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </>

}