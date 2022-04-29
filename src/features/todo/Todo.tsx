import { useState, useEffect, memo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { list, create, update, destroy } from './actions';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../app/store';

export default memo(() => {
    const todos = useSelector((state: ReduxState) => state.todos)
    const [taskName, setTaskName] = useState("");
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(list())
    }, [])


    const handleChangeText = (event: any) => {
        setTaskName(event.target.value)
    }

    const handleChange = (id:number, event: any) => {
        (async () => {
            await dispatch(update(id, {completed: event.target.checked}))
        })()
    }

    const handleEnter = (event: any) => {
        if (event.key === 'Enter') {
            handleSubmit(event)
        }
    }
    const handleSubmit = (event: any) => {
        (async () => {
            await dispatch(create({name: taskName}))
            setTaskName('')
        })()
    }

    const handleDeleteTask = (id: number) => {
        (async () => {
            await dispatch(destroy(id))
        })()
    }

    const completedTasks = todos.list.filter(todo => todo.completed).length

    return (
        <div className='container-sm'>
            <h1 className="text-center">THINGS TO DO:</h1>
            <hr />
            <div className="list-group">
                {todos.list.map(todo => 
                    <div key={todo.id} className="list-group-item border-0 d-flex justify-content-between align-items-center" >
                        <div className="d-flex justify-content-between align-items-center">
                            <input checked={todo.completed} onChange={e => handleChange(todo.id, e)} type="checkbox" id={`todo-${todo.id}`} className="mx-2" />
                            <label htmlFor={`todo-${todo.id}`} className={todo.completed ? `text-decoration-line-through` : ``}>{todo.name}</label>
                        </div>
                        <span className="pull-right">
                            <span onClick={e => handleDeleteTask(todo.id)} className="btn btn-xs" >
                                <i className="bi bi-x-square-fill text-primary"></i>
                            </span>
                        </span>
                    </div>   
                )}
            </div>
            <hr />
            <p className={`text-center ${!completedTasks ? 'd-none': ''}`}>
                Done ({completedTasks})
            </p>
            <div className="input-group mb-3">
                <input value={taskName} onKeyDown={handleEnter} onChange={handleChangeText}  type="text" className="form-control" placeholder="Enter new task" aria-label="Enter new task" aria-describedby="button-addon" />
                <button onClick={handleSubmit} className="btn btn-primary" type="button" id="button-addon">ADD TASK</button>
            </div>
        </div>
    );
})
