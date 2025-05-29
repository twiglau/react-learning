
import Demo05 from './1-use-in-low-react-version'
import ContextDemo from './2-context'
import Demo10, { Demo11 } from './2-use-imperative-handle'
import Index3 from './3-use-Deferred-Value/index1'
import './App.css'

function App() {

  return (
    <>
      <div className='text-2xl text-blue-400'>
        测试
      </div>
      {/* <Demo01 /> */}
      {/* <Demo02 /> */}
      {/* <Demo03 /> */}
      {/* <Demo04 /> */}

      {/* <Page /> */}
      {/* <Page01 /> */}
      {/* <Page02 /> */}
      {/* <Page03 /> */}
      {/* <Page04 /> */}
      {/* <Page05 /> */}
      {/* <Page06 /> */}

      {/* <Index /> */}
      {/* <Index01 /> */}

      {/* <TabDemo01 /> */}
      {/* <TabDemo02 /> */}
      {/* <TabDemo03 /> */}
      {/* <Nest /> */}
      <Demo05 />
      <Demo10 />
      <Demo11 />
      <ContextDemo />
      <Index3 />
    </>
  )
}

export default App
