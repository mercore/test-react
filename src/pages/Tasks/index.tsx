import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Input, Table } from "../../components"
import { HeaderProps } from '../../components/Table/types';
import { Task } from './types';

export const Tasks = () => {
  const [searchParams] = useSearchParams()
  const [sortByDate, setSortByDate] = useState(true)
  const [itemToEdit, setItemToEdit] = useState<Task | null>(null)
  const [search, setSearch] = useState('')
  const [data, setData] = useState<Array<Task> | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<Task>()

  const TABLE_HEADERS: Array<HeaderProps> = [
    { name: 'Name' },
    { name: 'Description' },
    { name: 'Create by' },
    { name: <span className='cursor-pointer' onClick={() => setSortByDate(prev => !prev)}>Date ⇅</span> }
  ]

  useEffect(() => {
    fetchTasks(1000)
  }, [])

  const filteredData = useMemo(() => {
    const sortedData = data?.sort((a, b) =>
      sortByDate
        ? new Date(a.date as string).getTime() < new Date(b.date as string).getTime() ? 1 : -1
        : new Date(a.date as string).getTime() > new Date(b.date as string).getTime() ? 1 : -1
    ) || []

    if (search) {
      return sortedData.filter(item => item.name.includes(search.toLowerCase()))
    }

    return sortedData
  }, [data, search, sortByDate])

  const onSubmit: SubmitHandler<Task> = ({ name, description }) => {
    const newTask = {
      name,
      description,
      createdBy: searchParams.get('email'),
      date: new Date().toUTCString()
    }
    
    if (itemToEdit) {
      const dupData = [...data!]
      const foundTaskIndex = data!.findIndex(task => task.name === itemToEdit.name)
      dupData[foundTaskIndex] = { ...dupData[foundTaskIndex], name, description }

      localStorage.setItem('tasks', JSON.stringify(dupData))
    } else {
      localStorage.setItem('tasks', JSON.stringify([...data!, newTask]))
    }

    reset()
    fetchTasks(0)
  }

  const handleDelete = (item: Task) => {
    localStorage.setItem('tasks', JSON.stringify(data!.filter(task => task.name !== item.name)))

    fetchTasks(0)
  }
  
  const handleEdit = (item: Task) => {
    setItemToEdit(item)

    setValue('name', item.name)
    setValue('description', item.description)
  }

  const fetchTasks = (wait: number) => {
    setItemToEdit(null)
    reset()
    const getTasks = new Promise((resolve, _reject) => {
      const tasks: Array<Task> = JSON.parse(localStorage.getItem('tasks') || '[]')

      setTimeout(() => {
        resolve(tasks)
      }, wait)
    })

    getTasks.then(response => {
      setData(response as Array<Task>)
    })
  }
  
	return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
      <div className="flex items-stretch mb-2">
        <Input
          placeholder="Task name"
          className="h-full"
          { ...register("name", {
            required: "This field is required!"
          }) }
        />
        <Input
          placeholder="Task description"
          containerClassName='ml-2'
          className="h-full"
          { ...register("description", {
            required: "This field is required!"
          }) }
        />
        <Button type='submit' className="w-fit ml-2">{ itemToEdit ? 'Update task' : 'Add Task' }</Button>
      </div>
      <Input
        containerClassName='mb-2'
        placeholder="Search"
        value={search}
        onChange={val => setSearch(val.target.value)}
      />
      <Table
        headers={TABLE_HEADERS}
        data={filteredData.map(item => ({
          ...item,
          actions: <div>
            <span className='text-green-800 cursor-pointer' onClick={() => handleEdit(item)}>Edit</span>
            <span className='text-red-800 cursor-pointer ml-2' onClick={() => handleDelete(item)}>Delete</span>
          </div>
        }))}
        loading={!data}
      />
    </form>
	);
};
