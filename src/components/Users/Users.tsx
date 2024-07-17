import React, { useEffect, useState } from 'react'
import { getUsers, setCurrentPage } from '../../state/usersReducer'
import UsersSearchForm from './UsersSearchForm'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../state/store'
import User from './User/User'
import { useLocation, useSearchParams } from 'react-router-dom'

type UsersPropsType = {
}

const Users: React.FC<UsersPropsType> = (props) => {

    const location = useLocation()

   
    
    const [searchParams, setSearchParams] = useSearchParams(location.search)

    let parsed = Object.fromEntries([...searchParams])
   
    
    
    const dispatch = useDispatch<any>()
    const { totalUsersCount, currentPage, pageSize, users, followingInProgres, isFettching } = useSelector((state: AppStateType) => state.usersPage)
    let { term } = useSelector((state: AppStateType) => state.usersPage.filter)

    useEffect(() => {
        setSearchParams({
            term : term,
            page : '' + currentPage
        })
    }, [term, currentPage])

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, ''))
    }, [])

    const onPageChnaged = (page: number): void => {
        dispatch(getUsers(page, pageSize, term))
        dispatch(setCurrentPage(page))
    }

    let portionSize = 10
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return (
        <div>
            <div>
                <UsersSearchForm />
            </div>
            <div>
                {
                    portionNumber > 1 &&
                    <button onClick={() => { setPortionNumber(portionNumber - 1) }}>prev</button>
                }
                {
                    pages
                        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                        .map((p: number) => {
                            return <button
                                key={p}
                                onClick={() => onPageChnaged(p)}
                                className={p === currentPage ? 'activeBTN' : ''}>{p}</button>
                        })
                }
                {
                    pagesCount > portionNumber &&
                    <button onClick={() => { setPortionNumber(portionNumber + 1) }}>next</button>
                }
            </div>
            {
                isFettching ? <h1>loading...</h1> :
                    users.map((user: any) => {
                        return <User
                            followingInProgres={followingInProgres}
                            user={user}
                            key={user.id} />
                    })
            }
        </div>
    )
}

export default Users