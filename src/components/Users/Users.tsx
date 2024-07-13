import React, { useEffect, useState } from 'react'
import { getUsers } from '../../state/usersReducer'
import UsersSearchForm from './UsersSearchForm'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../state/store'
import User from './User/User'
import { useLocation,  useSearchParams } from 'react-router-dom'



// Импортируем ХУК из либы react-router-dom
// import { useLocation,  useSearchParams } from "react-router-dom";

// useSearchParams - это ХУК который позволяет читать адресную строку. Соотвественно, если это ХУК мы должны проинициализировать начальным значением. В качестве начального выступает текущее значение адресной строки

// const location = useLocation()

// const [searchParams] = useSearchParams(location.search)

// Нам важно вернуть объект из трех свойств. Для этого можно использоваться Object.fromEntries, который вернет объект на базе массива состоящий из ключ-значение

// let parsed = Object.fromEntries([...searchParams])


type UsersPropsType = {
}

const Users: React.FC<UsersPropsType> = (props) => {

// const location = useLocation()

// const [searchParams] = useSearchParams(location.search)
    
//     let parsed = Object.fromEntries([...searchParams])
//     console.log(parsed);
    const dispatch = useDispatch<any>()
    const { totalUsersCount, currentPage, pageSize, users, followingInProgres, isFettching } = useSelector((state: AppStateType) => state.usersPage)
    const { term } = useSelector((state: AppStateType) => state.usersPage.filter)

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, ''))
    }, [])

    const onPageChnaged = (page: number): void => {
        dispatch(getUsers(page, pageSize, term))
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