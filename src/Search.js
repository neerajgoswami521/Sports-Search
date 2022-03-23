import React, { useState, useEffect } from 'react'

const Search = () => {
    const [playerData, setPlayerData] = useState([])
    const [filter, setFilter] = useState('')
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        const fetchData = () => {
            return fetch("https://api.npoint.io/20c1afef1661881ddc9c")
                .then((response) => response.json())
                .then((data) => setPlayerData(data.playerList.reverse()))
        }
        fetchData();

    }, []);

    useEffect(() => {
        setSearchResult([])
        playerData.filter(val => {
            if (val.PFName.toLowerCase().includes(filter.toLowerCase())) {
                setSearchResult(searchResult => [...searchResult, val])
            } else if (val.TName.toLowerCase().includes(filter.toLowerCase())) {
                setSearchResult(searchResult => [...searchResult, val])
            }
        })
    }, [filter])
console.log('playerData', playerData)
    return (
        <section className='py-4 container'>
            <div className='row justify-content-center'>
                <div className='col-12 mb-5'>
                    <div className='mb-3 col-4 mx-auto text-center'>
                        <label className='form-lable h4'>Search Player Here</label>
                        <input type="text" placeholder='Search Player...' className="form-control" onChange={e => setFilter(e.target.value)} />
                    </div>
                </div>
                {
                    filter.length > 0 && searchResult.map((data) => {

                        return (
                            <div key={data.Id} className='col-11 col-md-6 col-lg-3 mx-0 mb-4'>
                                <div className='card p-0 overflow-hidden h-100 shadow'>
                                    <img className='card-img-top' key={data.Id} src={require(`./player-images/${data.Id}.jpg`)} alt="players" />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{data.PFName}</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">{data.SkillDesc}</li>
                                            <li className="list-group-item">value: {data.Value}</li>
                                            {
                                                data.UpComingMatchesList.map(dataUpComing => {
                                                    return (
                                                        <>
                                                        <li key={data.Id} className="list-group-item">UpComingMatch:      
                                                                    {dataUpComing.CCode} vs. { dataUpComing.VsCCode}                                                     
                                                        </li>
                                                        <span>
                                                            Match Time: {dataUpComing.MDate}
                                                        </span>
                                                        </>
                                                    )

                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    !filter.length && playerData.map(data => {
                        return (
                            <div key={data.Id} className='col-11 col-md-6 col-lg-3 mx-0 mb-4'>
                                <div className='card p-0 overflow-hidden h-100 shadow'>
                                    <img className='card-img-top' key={data.Id} src={require(`./player-images/${data.Id}.jpg`)} alt="players" />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{data.PFName}</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">{data.SkillDesc}</li>
                                            <li className="list-group-item">value: {data.Value}</li>
                                            {
                                                data.UpComingMatchesList.map(dataUpComing => {
                                                    return (
                                                        <>
                                                        <li key={data.Id} className="list-group-item">UpComingMatch:      
                                                                    {dataUpComing.CCode} vs. { dataUpComing.VsCCode}                                                     
                                                        </li>
                                                        <span>
                                                            Match Time: {dataUpComing.MDate}
                                                        </span>
                                                        </>
                                                    )

                                                })
                                            }


                                        </ul>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }

            </div>

        </section>
    )
}

export default Search