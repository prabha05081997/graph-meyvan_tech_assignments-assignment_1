import React, { Component} from 'react';
import './App.css';

// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      resultObject: {}
    }
    this.calculateSum = this.calculateSum.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
    this.constructOptions = this.constructOptions.bind(this)
    this.constructGraphData = this.constructGraphData.bind(this)
  }

  componentDidMount() { 
    function getDataPointsFromCSV(csv) {
       var dataPoints = [], csvLines = [], points = [];
       csvLines = csv.split(/[\r?\n|\r|\n]+/);         
       
       let obj = {
         2011: [],
         2012: [],
         2013: [],
         2014: [],
         2015: [],
         pieChart1: {},
         pieChart2: {},
         pieChart3: {},
         pieChart4: {}
       }
       for (var i = 0; i < csvLines.length; i++)
           if (csvLines[i].length > 0) {
               points = csvLines[i].split(",");
               if(obj[points[3]]) {
                 obj[points[3]].push(points[6])
               }
               if(points[0]) {
                if(!(points[0] in obj.pieChart1)) {
                  console.log(points[0], obj.pieChart1)
                    obj.pieChart1[points[0]] = 1
                } else {
                  obj.pieChart1[points[0]] = obj.pieChart1[points[0]] + 1
                }
              }

              if(points[4]) {
                if(!(points[4] in obj.pieChart2)) {
                  console.log(points[4], obj.pieChart2)
                    obj.pieChart2[points[4]] = 1
                } else {
                  obj.pieChart2[points[4]] = obj.pieChart2[points[4]] + 1
                }
              }
              if(points[5]) {
                if(!(points[5] in obj.pieChart3)) {
                  console.log(points[5], obj.pieChart3)
                    obj.pieChart3[points[5]] = 1
                } else {
                  obj.pieChart3[points[5]] = obj.pieChart3[points[5]] + 1
                }
              }
              if(points[7]) {
                if(!(points[7] in obj.pieChart4)) {
                  console.log(points[7], obj.pieChart4)
                    obj.pieChart4[points[7]] = 1
                } else {
                  obj.pieChart4[points[7]] = obj.pieChart4[points[7]] + 1
                }
              }
           }
           return obj
   }

   var fileInput = document.getElementById("csv"),

    readFile = () => {
        var reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result)
            this.setState({
              resultObject: getDataPointsFromCSV(reader.result)
            })
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(fileInput.files[0]);
    };

    fileInput.addEventListener('change', readFile);
  }

  calculateSum(array) {
    if(!array) return null
    // Getting sum of numbers
    var sum = array.reduce(function(a, b){
      return Number(a) + Number(b);
    }, 0);

    return sum
  }

  isEmpty(input) {
    if (typeof input === 'array') {
      return input.length === 0;
    }
  
    return !input || Object.keys(input).length === 0;
  }

  constructGraphData(dataObject) {
    let labelData = [], data = []
    for(let obj in dataObject) {
      if(dataObject[obj] > 100) {
        labelData.push(obj)
        data.push(dataObject[obj])
      }
    }
    return {
      labelData,
      data
    }
  }

  constructOptions(titleText) {
    return {
      title: {
        display: true,
        text: titleText
      },
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100
            }
          }
        ]
      }
    };
  }
  render() {
    const { resultObject } = this.state
    const legend = {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#323130",
        fontSize: 14
      }
    };

  const sampledata = {
    labels: ["2011", "2012", "2013", "2014", "2015"],
    datasets: [
      {
        label: "First dataset",

        data: !this.isEmpty(resultObject) ? [(this.calculateSum(resultObject["2011"])/resultObject["2011"].length),
        (this.calculateSum(resultObject["2012"])/resultObject["2012"].length), 
        (this.calculateSum(resultObject["2013"])/resultObject["2013"].length), 
        (this.calculateSum(resultObject["2014"])/resultObject["2014"].length), 
        (this.calculateSum(resultObject["2015"])/resultObject["2015"].length)] : [0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  let pieChart1ResultData = !this.isEmpty(resultObject) ? this.constructGraphData(resultObject.pieChart1) : {}
  console.log('piechart 1 result data', pieChart1ResultData)
  const pieChart1Data = {
    labels: pieChart1ResultData.labelData,
    datasets: [
      {
        label: "First dataset",

        data: !this.isEmpty(pieChart1ResultData) ? pieChart1ResultData.data : [0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  }

  let pieChart2ResultData = !this.isEmpty(resultObject) ? this.constructGraphData(resultObject.pieChart2) : {}
  console.log('piechart 2 result data', pieChart2ResultData)
  const pieChart2Data = {
    labels: pieChart2ResultData.labelData,
    datasets: [
      {
        label: "First dataset",

        data: !this.isEmpty(pieChart2ResultData) ? pieChart2ResultData.data : [0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  }
  let pieChart3ResultData = !this.isEmpty(resultObject) ? this.constructGraphData(resultObject.pieChart3) : {}
  console.log('piechart 1 result data', pieChart3ResultData)
  const pieChart3Data = {
    labels: pieChart3ResultData.labelData,
    datasets: [
      {
        label: "First dataset",

        data: !this.isEmpty(pieChart3ResultData) ? pieChart3ResultData.data : [0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  }
  let pieChart4ResultData = !this.isEmpty(resultObject) ? this.constructGraphData(resultObject.pieChart4) : {}
  console.log('piechart 4 result data', pieChart4ResultData)
  const pieChart4Data = {
    labels: pieChart4ResultData.labelData,
    datasets: [
      {
        label: "First dataset",

        data: !this.isEmpty(pieChart4ResultData) ? pieChart4ResultData.data : [0, 0, 0, 0, 0],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  }
  console.log('sample data', sampledata)
    return (
      <div className="App">
        <h1>Charts go here</h1>
        <input id="csv" type="file"/>
        <div className="chart">
          { !this.isEmpty(resultObject) ? <div>
            <Line
              data = {sampledata}
              options={this.constructOptions('Value')}
              legend={legend}
            />
            <Pie
              data = {pieChart1Data}
              options={this.constructOptions('Indicator')}
              legend={legend}
            />
            <Pie
              data = {pieChart2Data}
              options={this.constructOptions('Gender')}
              legend={legend}
            />
            <Pie
              data = {pieChart3Data}
              options={this.constructOptions('Race/Ethnicity')}
              legend={legend}
            />
            <Pie
              data = {pieChart4Data}
              options={this.constructOptions('Place')}
              legend={legend}
            />
          </div>
          : null
        }
        </div>
      </div>
    );
  }
}

export default App;
