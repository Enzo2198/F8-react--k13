import {useState, useEffect} from 'react';
import {EmployeeDialog, FTable} from '../../components'
import {Header, Employee} from '../../utils'
import {Button} from "@mui/material"
import api from '../../plugins/api'

const headers: Header[] = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'age', text: 'Tuoi'},
  {name: 'address', text: 'Dia Chi'},
  {name: 'salary', text: 'Luong'},
  {name: 'position', text: 'Vi tri'},
  {name: 'status', text: 'Status'},
  {name: 'action', text: ''}
]

export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [curEmployee, setCurEmployee] = useState<Employee>({
    id: null,
    name: '',
    age: 0,
    salary: 0,
    address: '',
    position: '',
    status: ''
  })

  const [employees, setEmployees] = useState<Employee[]>([])

  const onAdd = () => {
    setIsOpenDialog(true)
  }

  const onUpdate = (id: number) => {
    // @ts-ignore
    setCurEmployee({...employees.find(e => e.id === id)})
    setIsOpenDialog(true)
  }

  const onDelete = (id: number) => {
    const removed = employees.filter(e => e.id !== id)
    setEmployees(removed)
  }

  const onSave = () => {
    setEmployees([...employees, curEmployee])
    setIsOpenDialog(false)
    // todo: call api and save
  }

  const getData = async () => {
    try {
      const {data} = await api.get('/employees/')

      setEmployees([...data])

    } catch (e) {
      console.log(e)
    }
  }

  // onmounted
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <h1>Employee</h1>
      <Button variant="outlined" onClick={onAdd}>Add</Button>
      <FTable
        width={800}
        tableName={'employee hihi'}
        headers={headers}
        rows={employees}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
      <EmployeeDialog
        employee={curEmployee}
        setEmployee={setCurEmployee}
        onSave={onSave}
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
      />
    </>
  )
}