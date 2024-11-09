
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs({tabs, onSwitch}) {
    return (
        <div className="block">
            <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab,i) => (
                    <a
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                        tab.current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                        'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={tab.current ? 'page': undefined}
                    onClick={(e) => {
                        e.preventDefault()
                        onSwitch(i)
                    }}
                    >
                        {tab.name}
                        {tab.count ? (
                            <span
                            className={classNames(
                                tab.current ? 'selected':'normal',
                                'ml-3 rounded-full px-2.5'
                            )}
                            >{tab.count}</span>
                        ):null}
                    </a>
                ))}
            </nav>
        </div>
    )
}