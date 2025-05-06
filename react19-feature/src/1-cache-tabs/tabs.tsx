import { Tab } from "./config";

export default function Tabs({tabs, onSwitch}:{
  tabs: Tab[],
  onSwitch: (index:number) => unknown
}) {
  return (
    <div>
      <div className='hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab 
        </label>
        <select
        id='tabs'
        name='tabs'
        className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        defaultValue={tabs.find(tab => tab.current)!.name}
        onChange={e => onSwitch(e.target.selectedIndex)}
        >
          {tabs.map(tab => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className='block'>
        <nav>
          {tabs.map((tab,i) => (
            <a
            key={tab.name}
            href={tab.href}
            className={classNames(
              tab.current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
              'rounded-md px-3 py-2 text-sm font-medium'
            )}
            aria-current={tab.current ? 'page': undefined}
            onClick={e => {
              e.preventDefault()
              onSwitch(i)
            }}
            >{tab.name}</a>
          ))}
        </nav>
      </div>
    </div>
  )
}


function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}