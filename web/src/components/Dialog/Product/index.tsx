import {DialogContainer} from "../../index.ts";
import {Autocomplete, Stack, TextField} from "@mui/material";
import {ProductDialogProp} from "../../../utils";
import api from '../../../plugins/api.ts'

export default ({isOpen, onClose, product, setProduct, onSave}: ProductDialogProp) => {

  const onChange = (event: any) => {
    setProduct({...product, [event.target.name]: event.target.value})
    console.log(product)
  }

  const getData = async () => {
    try {
      const {data} = await api.get('/colors/')
      const dataLog = data
      const list =dataLog.map(dataLog.name)
      console.log(list)

    } catch (e) {
      console.log(e)
    }
  }
  getData()

  // const positions: string[] = 'd'


  return (
    <DialogContainer
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
    >
      <Stack sx={{ width: 450 }} spacing={2}>
        <TextField
          fullWidth name={"code"} label="Code" variant="outlined" value={product.code} onChange={onChange}
        />
        <TextField
          fullWidth name={"name"} label="Name" variant="outlined" value={product.name} onChange={onChange}
        />
        <TextField
          fullWidth name={"shortName"} label="Short Name" variant="outlined" value={product.shortName} onChange={onChange}
        />
        <TextField
          fullWidth name={"expectedPrice"} label="Expected Price" variant="outlined" value={product.expectedPrice} onChange={onChange}
        />
        <TextField
          fullWidth name={"description"} label="description" variant="outlined" value={product.description} onChange={onChange}
        />
        <Autocomplete
          value={'Member'}
          fullWidth options={positions}
          renderInput={(params) => <TextField {...params} label="Position" />}
          onChange={(_, newValue) => {
            setProduct({...product, position: newValue});
          }}
        />

      </Stack>
    </DialogContainer>
  )
}