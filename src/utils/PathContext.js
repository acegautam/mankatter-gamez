import React,{ useState } from 'react'

// Create and export context (and provider) here
const PathContext = React.createContext(['', () => {}])

const PathProvider = (props) => {
    const [pathName, setPathName] = useState('/')

    return (
        <PathContext.Provider value={[pathName, setPathName]}>
            { props.children }
        </PathContext.Provider>
    )
}

export { PathContext, PathProvider }
