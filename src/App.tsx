import React, { useState } from 'react'
import axios from 'axios'
import Button from './components/Button'
import Menu from './components/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
import Icon from './components/Icon'
import Test from './components/Test'
import Transition from './components/Transition'
import Input from './components/Input'
import SimpleComplete from './components/AutoComplete/test'
import Upload from './components/Upload'

const App: React.FC = () => {
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  return (
    <div className="App">

      <Test />
      <header className="App-header">
        <Icon icon='coffee' theme='danger' />
        <Menu  >
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
        <Button size='lg' onClick={() => { setShow(!show) }}>Toggle</Button>
        <Transition wrapper={false} in={show} timeout={300} animation='zoom-in-top'>
          <div>
            <Button disabled >Disabled Button</Button>
            <Button btnType='primary' size='lg'>Large Primary</Button>
            <Button btnType='danger' size='sm' >Small Danger</Button>
            <Button btnType='link' href='http://www.baidu.com'>Baidu Link</Button>
            <Button btnType='link' disabled href='http://www.baidu.com'>Baidu Link</Button>
            <p>
              Edit <code>src/App.tsx</code> and save to reload
            </p>
            <Button btnType='primary' size='lg'>Large Primary</Button>
          </div>
        </Transition>
        <Input placeholder='请输入内容' icon='search' defaultValue='google' prepend='http://' style={{ width: '300px', }}></Input>

        <SimpleComplete />
      </header>
    </div>
  )
}


export default App
