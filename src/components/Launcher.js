import React, { useEffect, useContext } from 'react'
import Playground from './common/Playground'

import Header from './common/Header'
import { PathContext } from '../utils/PathContext'

const Launcher = () => {
    // eslint-disable-next-line no-unused-vars
    const [ pathName, setPathName ] = useContext(PathContext)
    const screenNames = {
        'tictactoe': 'Tic Tac Toe',
        'rockpaper': 'Rock Paper Scissors'
    }
    const screenName = screenNames[pathName.substring(1)] || ''
    const isRoot = pathName === '/'
    const baseTitle = 'Mankatter Gamez'

    useEffect(() => {
        document.title = baseTitle
        if (screenName) {
            document.title += ` | ${ screenName }`
        }
    }, [screenName])
    return (
        <div className='launcher'>
            <Header isRoot={isRoot} />
            <Playground />

            {/* Icon license attribution */}
            <div className='attrib'>
                Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
        </div>
    )
}

export default Launcher
