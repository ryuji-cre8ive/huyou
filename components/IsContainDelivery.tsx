import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

const IsContainDelivery = (props: any) => {
  const [value, setValue] = React.useState("")
  props.setIsDeliveryContain(value)
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">送料</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={e => setValue(e.target.value)}
      >
        <FormControlLabel value="true" control={<Radio />} label="送料込み" />
        <FormControlLabel value="false" control={<Radio />} label="送料は相手負担" />
      </RadioGroup>
    </FormControl>
  )
}

export default IsContainDelivery