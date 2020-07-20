import React from 'react'


const Header = ({course}) => (<h1>{course.name}</h1>)
const Part = ({part}) => (<p>{part.name} {part.exercises}</p>)

const Content = ({course}) => {
    return (
        <div>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}
const Total = ({course}) => {
    const partMap = course.parts.map((part) => part.exercises)
    const total = partMap.reduce( (acu,cur) => acu + cur)
    return (
        <h3>total of {total} exercises</h3>
    )
}

const Courses = ({courses}) => {
    return (
        <div>
            {courses.map((course) => 
                <div key={course.id}>
                    <Header course={course} />
                    <Content course={course} />
                    <Total course={course} />
                </div>
            )}  
        </div>   
    )  
}

export default Courses