import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { PathProvider } from './utils/PathContext'
import Launcher from './components/Launcher'
import './styles/base.scss'
  
ReactDOM.render((
		<BrowserRouter>
			<PathProvider>
				<Launcher />
			</PathProvider>
		</BrowserRouter>
	), document.getElementById('root')
)
