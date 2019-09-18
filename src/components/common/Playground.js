import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Portal } from '../common/Portal'
import { Game as TCT } from '../tictactoe/Game'
import { Game as RPS } from '../rockpaper/Game'

const Playground = () => (
    <main>
        <Switch>
            <Route exact path='/' component={ Portal } />
            <Route exact path='/tictactoe' component={ TCT } />
            <Route exact path='/rockpaper' component={ RPS } />
        </Switch>
    </main>
)

export default Playground
