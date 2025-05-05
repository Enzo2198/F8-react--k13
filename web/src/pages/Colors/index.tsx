import {FTable, ColorDialog} from '../../components'
import {Color, Header} from '../../utils'
import {Button} from "@mui/material";
import {useState, useEffect} from "react";
import api from '../../plugins/api'

const headers: Header[] = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'action', text: ''}
]


export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [curColor, setCurColor] = useState<Color>({
    id: null,
    name: '',
  })

  const [colors, setColors] = useState<Color[]>([])
  // const [colors, setColors] = useState<Color[]>([])

  const onAdd = () => {
    setIsOpenDialog(true)
  }

  const onUpdate = (id: number) => {
    // @ts-ignore
    setCurColor({...colors.find(e => e.id === id)})
    setIsOpenDialog(true)
  }

  const onDelete = (id: number) => {
    const removed = colors.filter(e => e.id !== id)
    setColors(removed)
  }

  const onSave = async () => {
    try {
      const newColorId = {...curColor}

      if (!curColor.id) {
        const maxId = Math.max(...colors.map(color => color.id || 0))
        newColorId.id = maxId + 1
        setColors(prev => [...prev, newColorId])
      } else {
        setColors(prev => prev.map(c => c.id === newColorId.id ? newColorId : c))
      }

      setIsOpenDialog(false)
      setCurColor({id: null, name: ''})
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const {data} = await api.get('/colors/')

      setColors([...data])

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
      <h1>Color</h1>
      <Button variant="outlined" onClick={onAdd}>Add</Button>
      <FTable
        tableName={'color'}
        headers={headers}
        rows={colors}
        onUpdate={onUpdate}
        onDelete={onDelete}
        width={900}
      />
      <ColorDialog
        color={curColor}
        setColor={setCurColor}
        onSave={onSave}
        isOpen={isOpenDialog}
        onClose={() => setIsOpenDialog(false)}
      />
    </>
  )
}