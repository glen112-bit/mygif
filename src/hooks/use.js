import { useState, useEffect } from 'react'
import getGifs from 'services/getGifs'
//import GifsContext from 'context/GifsContext'

export function useGifs({ keyword } = { keyword: null }) {
    const [loading, setLoading] = useState(false)
    //const { gifs, setGifs } = useContext(GifsContext)
    const [gifs, setGifs] = useState([])

    useEffect(() => {
        setLoading(true)
        //se recupera la keyword desde localstorage
        const keywordToUse =
            keyword || localStorage.getItem('lastKeyword') || 'random'
        getGifs({ keyword: keywordToUse }).then((gifs) => {
            setGifs(gifs)
            setLoading(false)
            // se guarda la keyword en localstorage
            localStorage.setItem('lastKeyword', keyword)
        })
    }, [setGifs, keyword])
    return { loading, gifs }
}