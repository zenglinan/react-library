import React from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button'
import Menu from './components/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Menu >
          <MenuItem >
            5555
          </MenuItem>
          <SubMenu title='hh'>
            <MenuItem >
              link1
            </MenuItem>
            <MenuItem >
              link2
            </MenuItem>
            <MenuItem >
              link3
            </MenuItem>
          </SubMenu>

          <MenuItem >
            hhhhh
          </MenuItem>
          <MenuItem >
            22222
          </MenuItem>
        </Menu>
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
