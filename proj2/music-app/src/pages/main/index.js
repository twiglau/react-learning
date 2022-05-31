import React, { memo, Suspense } from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
import routes from '@/router'

import TWAppHeader from '@/components/app-header'
import TWAppFooter from '@/components/app-footer'
export default memo(function TWMain() {
  return (
    <HashRouter>
      <TWAppHeader />
        <Suspense fallback={<div>loading...</div>}>
        {renderRoutes(routes)}
        </Suspense>
      <TWAppFooter />
    </HashRouter>
  )
})
