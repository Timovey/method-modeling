import React, { useState, useContext, useEffect} from 'react';
import {
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Scatter,
    ComposedChart
  } from "recharts";
import {Button, Select, MenuItem,FormControl,TextField,Stack, Box, Container } from '@mui/material';
import { useCallback } from 'react';


function App() {
  const anger = {name: 'anger', data: [
    {sumRating: 4, value: 0},
    {sumRating: 4, value: 1},
    {sumRating: 8, value: 0}
  ]}
  const joy = {name: 'joy', data: [
    {sumRating: 6, value: 0},
    {sumRating: 10, value: 1},
    {sumRating: 10, value: 0},
  ]}
  const calm = {name: 'calm', data: [
    {sumRating: 6, value: 0},
    {sumRating: 8, value: 1},
    {sumRating: 9, value: 0}
  ]}
  const worry = {name: 'worry', data: [
    {sumRating: 5, value: 0},
    {sumRating: 6, value: 1},
    {sumRating: 8, value: 0}
  ]}
  const variantRating = [2,3,4,5]
  const [prevRating, setPrevRating] = useState(4)
  const [rating, setRating] = useState(4)
  const [ratingInSelect,setRatingInSelect] = useState('')
  const [pointValue,setPointValue] = useState([{
    "sumRating": 8,
    "anger": 0,
    "joy": 0.5,
    "calm": 1,
    "worry": 0,
    "value": 1
}])
  const addRatingHandler = (e) => {
    e.preventDefault()
    setPrevRating(rating)
    setRating(ratingInSelect)
  }
  
  useEffect(() => {
      let vars = [anger, joy,  worry, calm]
      let t = rating+ prevRating
      let point = {sumRating: t}
      let max = 0
      vars.forEach(f => {
        let minTemp, avgTemp, maxTemp
        minTemp = f.data[0].sumRating
        avgTemp = f.data[1].sumRating
        maxTemp = f.data[2].sumRating 
        let val = 0
        if(t >= minTemp && t <= avgTemp) {
          if(f.name === 'anger') {
            val= (maxTemp - t)/ (maxTemp - avgTemp)
          }
          else {
            val = (t - minTemp)/(avgTemp - minTemp)    
          }
          
        }
        else if(t > f.data[1].sumRating && t < f.data[2].sumRating) {

          val = (maxTemp - t)/ (maxTemp - avgTemp)
        }
        else {
          val = 0
        }
        point[f.name] = val
        if(val > max) {
          max = val
        }
        
      })
      point.value = max
      setPointValue([point])

  }, [rating, prevRating])
  return (
     <>
      <div className="highlight-bar-charts" style={{ userSelect: 'none', width: '100%' }}>
    
      <Stack className='container__item'
        component="form"
        sx={{
          width: '100%',
          margin: '10px'
        }}
        spacing={2}
        noValidate
        autoComplete="off"
        onSubmit={addRatingHandler}
        direction="row"
      >
        <Stack direction="column">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ratingInSelect}
            label="Age"
            onChange={e => setRatingInSelect(e.target.value)}
            >
                {variantRating.map((element) => (
                    <MenuItem value={element} key={element}>{element}</MenuItem>
                ))}               
          </Select>
          <Button type='submit' variant="outlined" style={{margin: '5px'}}>Получить оценку</Button>
        </Stack>
        <Stack direction="column">
          <span>Прошлая оценка:{prevRating}</span>
          <span>Текущая оценка:{rating}</span>       
        </Stack>
      </Stack>
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart width={500} height={300}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sumRating" type="number" allowDuplicatedCategory={false} />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend />
          <Area dataKey="value" data={anger.data} name={"гнев"} key={anger.name} stroke="#c24936" fill="#c24936"/> 
          <Area dataKey="value" data={joy.data} name={"радость"} key={joy.name} stroke="#36c257" fill="#36c257"/> 
          <Area dataKey="value" data={worry.data} name={"волнение"} key={worry.name} stroke="#4f62b8" fill="#4f62b8"/> 
          <Area dataKey="value" data={calm.data} name={"спокойствие"} key={calm.name} stroke="#b8a539" fill="#b8a539"/> 


        <Scatter name="сумма оценок" data={pointValue} dataKey="value" stroke="#ff0000"  fill="#ff0000" />
        </ComposedChart>
        
      </ResponsiveContainer>
      </div>
      <Stack direction="column">
        <h3>Состояние отца:</h3>  
        <Box component="div" sx={{
        width: 30 + pointValue[0].anger * 270,
        backgroundColor: '#c24936',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 1
      }}><h1 className='probability'>{pointValue[0].anger}</h1></Box>
      <Box component="div" sx={{
        width: 30 + pointValue[0].joy * 270,
        backgroundColor: '#36c257',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 1
      }}><h1 className='probability'>{pointValue[0].joy}</h1></Box>
      <Box component="div" sx={{
        width: 30 + pointValue[0].worry * 270,
        backgroundColor: '#4f62b8',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 1
      }}><h1 className='probability'>{pointValue[0].worry}</h1></Box>
      <Box component="div" sx={{
        width: 30 + pointValue[0].calm * 270,
        backgroundColor: '#b8a539',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 1
      }}><h1 className='probability'>{pointValue[0].calm}</h1></Box>
      </Stack>
      </>
  );
}

export default App;
