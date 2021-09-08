import React from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => { alert("haha") }}>Hello</Button>
        <Button disabled >Disabled Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small} >Small Danger</Button>
        <Button btnType={ButtonType.Link} href='http://www.baidu.com'>Baidu Link</Button>
        <Button btnType={ButtonType.Link} disabled href='http://www.baidu.com'>Baidu Link</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload
        </p>
      </header>
    </div>
  )
}


export default App
