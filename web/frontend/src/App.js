import axios from 'axios';
import {useState} from 'react';

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import { Stack, Button, ButtonGroup } from '@mui/material'


require("highcharts/modules/accessibility")(Highcharts);

function App() {
  const [mystate,setMystate] = useState([]);
  async function addVal() {
    await axios({
      method: 'get',
      url: 'http://localhost:5000/addVal',
    })

  }
  
  async function cleanVal() {
    await axios({
      method: 'get',
      url: 'http://localhost:5000/cleanVal',
    })
  }
  
  function getVal(){
    axios({
      method: 'get',
      url: 'http://localhost:5000/getVal',
    })
      .then(function (response) {
        setMystate(response.data)
      });
  }
  return (
    <Stack alignItems="center">
      <Stack direction='row'>
          <ButtonGroup variant='contained'>
              <Button  onClick={addVal}>Add values</Button>
              <Button  onClick={ (e) =>{
                e.preventDefault();
                cleanVal()
              }}>
                Clear values
              </Button>
              <Button onClick={ (e) =>{
                e.preventDefault();
                getVal()
              }}>
                Show Values
              </Button>
          </ButtonGroup>
      </Stack>
      <Stack sx={{width:1}}>
        <HighchartsReact highcharts={Highcharts} options={
          {
            chart:{
              zoomType: 'xy',
              type:'spline'
            },
            xAxis: {
              categories: [...mystate.map((e) =>  {
                return e.time
              })]
            },
            series: [
              {
                name: "data",
                data:[...mystate.map((e) =>  {
                  return parseInt(e.val)
                })],
                color: "red"
              }
            ]
          }
        } />
      </Stack>
    </Stack>
  );
}

export default App;
