import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import Filter from './components/Filter.js'
import Notify from './components/Notify.js'
import phoneService from './services/phoneService.js'

const App = () => {

    const [ persons, setPersons ] = useState([]) 
    const [ search, setSearch ] = useState('')
    const [ refresh, setRefresh ] = useState(false)
    const [ inputObj, setInputObj ] = useState(
        {
            name: '',
            number: ''
        }
    )
    // console.log('init-inputObj', inputObj)
    const [ notifyStatus, setNotifyStatus ] = useState(
        {
            status: '',
            message: '',
            show: false
        }
    )
    // console.log('init-persons', persons) 

    useEffect(() => {
        phoneService
            .getAll()
            .then(initial => {
                setPersons(initial)
            })
            .catch(error => {
                console.log('get-error', error)
            })
        // console.log('页面已刷新')
    }, [refresh])

    const addNewName = (event) => {

        event.preventDefault()
        // console.log('inputObj', inputObj)
        const exsistNewName = persons.find(person => 
            ( person.name.toLowerCase() === inputObj.name )
        )
        // console.log('exsistNewName', exsistNewName)

        if (exsistNewName) {

            const confirmText = 'is already added to phonebook,replace the old number with a new one?'
            const isReplace = window.confirm(`${inputObj.name} ${confirmText}`)

            const id = exsistNewName.id
            const changeObj = {...inputObj, number: inputObj.number}

            if ( isReplace ) {

                phoneService
                    .replace(id, changeObj)
                    .then(replace => {
                        setPersons(persons.map(person => person.id !== id ? person : replace))
                        // console.log('替换成功')

                        setInputObj({
                            number: '',
                            name: ''
                        })

                        setNotifyStatus({
                            status: 'success',
                            message:  `Success replaced ${inputObj.name}`,
                            show: true
                        })
                    
                        setTimeout(() => {
                            setNotifyStatus({
                                status: '',
                                message: '',
                                show: false
                            })
                        }, 5000)

                    })
                    .catch(error => {
                        // console.log('替换失败')
                        // console.log('put-error', error.response.data.error)

                        setNotifyStatus({
                            status: 'error',
                            message: `${error.response.data.error}`,
                            show: true
                        })

                        setTimeout(() => {
                            setNotifyStatus({
                                status: '',
                                message: '',
                                show: false
                            })
                        }, 5000)

                        setPersons(persons.filter(person => person.id !== id))
                     
                    })
            }  
        }else {

            phoneService
            .create(inputObj)
            .then(addNew => {

                setPersons(persons.concat(addNew))
                // console.log('添加成功')

                setInputObj({
                    number: '',
                    name: ''
                })

                setNotifyStatus({
                    status: 'success',
                    message: `Success added ${inputObj.name}`,
                    show: true
                })
            
                setTimeout(() => {
                    setNotifyStatus({
                        status: '',
                        message: '',
                        show: false
                    })
                }, 5000)

            })
            .catch(error => {
                
                // console.log('添加失败')
                // console.log('post-error', error.response.data.error)

                setNotifyStatus({
                    status: 'error',
                    message:  `${error.response.data.error}`,
                    show: true
                })
            
                setTimeout(() => {
                    setNotifyStatus({
                        status: '',
                        message: '',
                        show: false
                    })
                }, 7000)
                
            })

        }
        
    }

    const handleNameChange = (event) => {

        setInputObj({
            ...inputObj,
            name: event.target.value
        })
        // console.log('namechange', inputObj.name)

        const newNameArr = persons.find(person => 
            ( person.name.toLowerCase() === inputObj.name.toLowerCase() )
        )
        // console.log('newNameArr', newNameArr)

        if (newNameArr) {
            alert (`${inputObj.name} is already added to phonebook`) 
        }

    }
    const handleNumberChange = (event) => {

        setInputObj({
            ...inputObj,
            number: event.target.value
        })
        // console.log('numberchange', inputObj.number)
        
        if (toString(inputObj.number).length < 8) {
            alert ('number can not less than 8 length')
        }

        const newNumberArr = persons.find(person => person.number === inputObj.number)
        // console.log('newNumberArr', newNumberArr)
       
        if (newNumberArr) {
            alert(`${inputObj.number} is already added to phonebook`)
        }

    }
    const handleSearchChange = (event) => {

        setSearch(event.target.value)
        // console.log('search', search)

        if (search.length > 1) {
            const exsist = (search) => {
                return persons.filter( person => person.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
            }

            const result = exsist(search)
            // console.log('result', result)
            // console.log('search-length', search.length)
            setPersons(result)
        } 
        
        if (search.length === 0) {
            setRefresh(!refresh)
        }

    }

    const handleDeleteClick = (id) => {

        // console.log('id', id)
        const deleteObj = persons.find(person => person.id === id)
        // console.log('deleteObj', deleteObj)
        const clearPerson = window.confirm(`Delete ${deleteObj.name} ?`)
        if ( clearPerson ) {
            excuteDelete(id, deleteObj)
        }

    }

    const excuteDelete = (id, deleteObj) => {

        phoneService
            .clear(id)
            .then(clearPersons => {
                
                setPersons(persons.filter(person => person.id !== id))
                // console.log('删除成功', clearPersons)

                setNotifyStatus({
                    status: 'success',
                    message: `Success deleted ${deleteObj.name} was already from server`,
                    show: true
                })

                setTimeout(() => {
                    setNotifyStatus({
                        status: '',
                        message: '',
                        show: false
                    })
                }, 5000)
            
            })
            .catch(error => console.log('delete-error', error.response.data)) 
    }

    const titleStyle = {
        color: 'green'
    }

    return (
        <div>
            <div>
                <h1 style={titleStyle}>Phonebook</h1>
                <Notify notifyStatus={notifyStatus} />
                <Filter search={search} onChange={handleSearchChange} />
            </div>
            <div>
                <h2 style={titleStyle}>add a new</h2>
                <PersonForm onSubmit={addNewName} 
                            name={inputObj.name} 
                            number={inputObj.number}
                            nameChange={handleNameChange}
                            numberChange={handleNumberChange}
                />
            </div>
            <div>
                <h2 style={titleStyle}>Numbers</h2>
                <Persons persons={persons} onClick={handleDeleteClick} />
            </div>
        </div>
    )
}

export default App