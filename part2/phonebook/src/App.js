import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import Filter from './components/Filter.js'
import Notify from './components/Notify.js'
import phoneService from './services/phoneService.js'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ search, setSearch ] = useState('')
    const [ notifyStatus, setNotifyStatus ] = useState(
        {
            status: '',
            message: '',
            show: false
        }
    )
    console.log('clear-persons', persons) 

    useEffect(() => {
        phoneService
            .getAll()
            .then(initial => {
                setPersons(initial)
            })
            .catch(error => {
                console.log('get-error', error)
            })
        console.log('页面已刷新')
    }, [])

    const addNewName = (event) => {
        const nameObj = {
            name: newName,
            number: newNumber
        }
        phoneService
            .create(nameObj)
            .then(addNew => {
                setPersons(persons.concat(addNew))
                setNewName('')
                setNewNumber('')
                console.log('添加成功')

                setNotifyStatus({
                    status: 'success',
                    message:  `Success added ${newName}`,
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
                console.log('post-error', error)
            })
    }
    const putNewName = (event) => {
        const nameObj = {
            name: newName,
            number: newNumber
        }
        const exsistNewName = persons.find(person => person.name.toLowerCase() === nameObj.name.toLowerCase())
        console.log('exsistNewName', exsistNewName)
        if (exsistNewName) {
            const isReplace = window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)
            const id = exsistNewName.id
            const changeObj = {...nameObj, number: newNumber}
            if (isReplace) {
                phoneService
                    .replace(id, changeObj)
                    .then(replace => {
                        setPersons(persons.map(person => person.id !== id ? person : replace))
                        console.log('替换成功')

                        setNotifyStatus({
                            status: 'success',
                            message:  `Success replaced ${newNumber}`,
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
                        console.log('put-error', error)

                        setNotifyStatus({
                            status: 'error',
                            message:   `Person ${newName} was already removed from server`,
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
                        console.log('put-error-persons', persons)
                    })
            }  
        }else {
            addNewName(event)
        }
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
        const newNameArr = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        console.log('newNameArr', newNameArr)

        if (newNameArr) {
            alert (`${newName} is already added to phonebook`)
        }
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
        const newNumberArr = persons.find(person => person.number === newNumber)
        console.log('newNumberArr', newNumberArr)
       
        if (newNumberArr) {
            alert(`${newNumber} is already added to phonebook`)
        }

    }
    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        console.log('search', search)
        const exsist = (search) => {
            return persons.filter( person => person.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
        }
        const result = exsist(search)
        setPersons(result)
    }

    const handleDeleteClick = (id) => {
        console.log('id', id)
        const deleteObj = persons.find(person => person.id === id)

        const clearPerson = window.confirm(`Delete ${deleteObj.name} ?`)
        console.log('deleteObj', deleteObj)

        if (clearPerson) {
            phoneService
                .clear(id)
                .then(clearPersons => {
                    const request = persons.map(person =>
                        person.id !== id ? person : clearPersons
                    )
                    console.log('删除后返回的数据', request)

                    const resData = request.filter(item => Object.keys(item).length !== 0)
                    console.log('清除{}后的数据', resData)

                    setPersons(resData)
                    console.log('删除成功', clearPersons)
                    
                    setNotifyStatus({
                        status: 'success',
                        message:    `Success deleted ${deleteObj.name} was already from server`,
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
                .catch(error => console.log('error', error)) 
        }
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
                            onClick={putNewName}
                            name={newName} 
                            number={newNumber}
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