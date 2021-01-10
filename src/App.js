import React, { Component } from 'react'
import Map from './components/Map.js'
import Checkboxes from './components/Checkboxes.js'
import Results from './components/Results.js'
import Checklist from './components/Checklist.js'
import axios from 'axios'
// import $ from 'jquery'

 let stateNames = [ 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming' ]

 let stateValues = ["01", "02", "04", "05", "06", "08", "09", "10", "12", "13", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "44", "45", "46", "47", "48", "49", "50", "51", "53", "54", "55", "56"]

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      responseData: {},
      resRaces: [],
      resSizes: [],
      resAgesM: [],
      resAgesF: [],
      selectedChecks: {},
      selectedStates: [],
      selectedStatesValues: [],
      selectedRaceNames: [],
      selectedRaceValues: [],
      selectedSizeNames: [],
      selectedSizeValues: [],
      selectedAgesMNames: [],
      selectedAgesMValues: [],
      selectedAgesFNames: [],
      selectedAgesFValues: [],
      snapRacesNames: [],
      snapSizesNames: [],
      snapAgesMNames: [],
      snapAgesFNames: [],
      snapStates: [],
      checkboxesView: false,
      resultsView: false,
      headers: {
        race: false,
        size: false,
        agesM: false,
        agesF: false,
        states: false,
        checkboxes: false
      },
      checkboxes: {
        race: {
          allraces: { id: 'allraces', name: 'All Races', value: 'P003001', className: 'race', checked: false},
          white: { id: 'white', name: 'White', value: 'P003002', className: 'race', checked: false},
          black: { id: 'black', name: 'Black', value: 'P003003', className: 'race', checked: false},
          native: { id: 'native', name: 'Native American', value: 'P003004', className: 'race', checked: false},
          asian: { id: 'asian', name: 'Asian', value: 'P003005', className: 'race', checked: false},
          islander: { id: 'islander', name: 'Pacific Islander', value: 'P003006', className: 'race', checked: false},
          other: { id: 'other', name: 'Other', value: 'P003007', className: 'race', checked: false},
          multi: { id: 'multi', name: '2+ Races', value: 'P003008', className: 'race', checked: false},
          latino: { id: 'latino', name: 'Latino', value: 'P004003', className: 'race', checked: false}
        },
        size: {
          allsizes: { id: 'allsizes', name: 'All Sizes', value: 'H013001', className: 'size', checked: false},
          one: { id: 'one', name: '1', value: 'H013002', className: 'size', checked: false},
          two: { id: 'two', name: '2', value: 'H013003', className: 'size', checked: false},
          three: { id: 'three', name: '3', value: 'H013004', className: 'size', checked: false},
          four: { id: 'four', name: '4', value: 'H013005', className: 'size', checked: false},
          five: { id: 'five', name: '5', value: 'H013006', className: 'size', checked: false},
          six: { id: 'six', name: '6', value: 'H013007', className: 'size', checked: false},
          seven: { id: 'seven', name: '7', value: 'H013008', className: 'size', checked: false}
        },
        agesM: {
          allM: { id: 'allM', name: 'All Ages (M)', value: 'P012002', className: 'agesM', checked: false},
          under5M: { id: 'under5M', name: 'Under 5', value: 'P012003', className: 'agesM', checked: false},
          M5: { id: 'M5', name: '5-9 M', value: 'P012004', className: 'agesM', checked: false},
          M10: { id: 'M10', name: '10-14 M', value: 'P012005', className: 'agesM', checked: false},
          M15: { id: 'M15', name: '15-17 M', value: 'P012006', className: 'agesM', checked: false},
          M18: { id: 'M18', name: '18-19 M', value: 'P012007', className: 'agesM', checked: false},
          M20: { id: 'M20', name: '20 M', value: 'P012008', className: 'agesM', checked: false},
          M21: { id: 'M21', name: '21 M', value: 'P012009', className: 'agesM', checked: false},
          M22: { id: 'M22', name: '22-24 M', value: 'P012010', className: 'agesM', checked: false},
          M25: { id: 'M25', name: '25-29 M', value: 'P012011', className: 'agesM', checked: false},
          M30: { id: 'M30', name: '30-34 M', value: 'P012012', className: 'agesM', checked: false},
          M35: { id: 'M35', name: '35-39 M', value: 'P012013', className: 'agesM', checked: false},
          M40: { id: 'M40', name: '40-44 M', value: 'P012014', className: 'agesM', checked: false},
          M45: { id: 'M45', name: '45-49 M', value: 'P012015', className: 'agesM', checked: false},
          M50: { id: 'M50', name: '50-54 M', value: 'P012016', className: 'agesM', checked: false},
          M55: { id: 'M55', name: '55-59 M', value: 'P012017', className: 'agesM', checked: false}
        },
        agesF: {
          allF: { id: 'allF', name: 'All Ages (F)', value: 'P012026', className: 'agesF', checked: false},
          under5F: { id: 'under5F', name: 'Under 5', value: 'P012027', className: 'agesF', checked: false},
          F5: { id: 'F5', name: '5-9 F', value: 'P012028', className: 'agesF', checked: false},
          F10: { id: 'F10', name: '10-14 F', value: 'P012029', className: 'agesF', checked: false},
          F15: { id: 'F15', name: '15-17 F', value: 'P012030', className: 'agesF', checked: false},
          F18: { id: 'F18', name: '18-19 F', value: 'P012031', className: 'agesF', checked: false},
          F20: { id: 'F20', name: '20 F', value: 'P012032', className: 'agesF', checked: false},
          F21: { id: 'F21', name: '21 F', value: 'P012033', className: 'agesF', checked: false},
          F22: { id: 'F22', name: '22-24 F', value: 'P012034', className: 'agesF', checked: false},
          F25: { id: 'F25', name: '25-29 F', value: 'P012035', className: 'agesF', checked: false},
          F30: { id: 'F30', name: '30-34 F', value: 'P012036', className: 'agesF', checked: false},
          F35: { id: 'F35', name: '35-39 F', value: 'P012037', className: 'agesF', checked: false},
          F40: { id: 'F40', name: '40-44 F', value: 'P012038', className: 'agesF', checked: false},
          F45: { id: 'F45', name: '45-49 F', value: 'P012039', className: 'agesF', checked: false},
          F50: { id: 'F50', name: '50-54 F', value: 'P012040', className: 'agesF', checked: false},
          F55: { id: 'F55', name: '55-59 F', value: 'P012041', className: 'agesF', checked: false}
        }
      }
    }
  }
  
  removeFromStates = (e) => {
    return this.state.selectedStates.filter(function(x) {
      return x !== e
    })
  }

  removeFromStatesValues = (e) => {
    return this.state.selectedStatesValues.filter(function(x) {
      return x !== e
    })
  }

  removeFromChecksNames = (e) => {
    return this.state.selectedChecksNames.filter(function(x) {
      return x !== e
    })
  }

  removeFromChecksValues = (e) => {
    this.state.selectedChecksValues.filter(function(x) {
      return x !== e
    })
  }

  toggleStates = (e) => {
    let x = {...this.state}

    if (e.target.id !== "") {
      if (x.selectedStates.includes(e.target.id)) {
        x.selectedStates = this.removeFromStates(e.target.id)
        x.selectedStatesValues = this.removeFromStatesValues(e.target.className.baseVal)
      } else {
        x.selectedStates = x.selectedStates.concat(e.target.id)
        x.selectedStatesValues = x.selectedStatesValues.concat(e.target.className.baseVal)
      }
    }

    if (x.selectedStates.length >= 50) {
      x.headers.states = true
    } else {
      x.headers.states = false
    }

    this.setState(x)
  }

  toggleCheck = (e) => {

    
    const { name, id, className, value } = e
    let x = {...this.state}

    if (x.checkboxes[className][id].checked === false) {
      x.checkboxes[className][id].checked = true
    } else {
      x.checkboxes[className][id].checked = false
    }

    if (className === 'race') {

      if (x.selectedRaceValues.includes(value)) {
        let idx = x.selectedRaceValues.indexOf(value)
        x.selectedRaceValues.splice(idx, 1)
      } else {
        x.selectedRaceValues.push(value)
      }

      if (x.selectedRaceNames.includes(name)) {
        let idx = x.selectedRaceNames.indexOf(name)
        x.selectedRaceNames.splice(idx, 1)
      } else {
        x.selectedRaceNames.push(name)
      }

      if (x.selectedRaceNames.length === 9) {
        x.headers.race = true
      } else {
        x.headers.race = false
      }

    } else if (className === 'size') {

      if (x.selectedSizeValues.includes(value)) {
        let idx = x.selectedSizeValues.indexOf(value)
        x.selectedSizeValues.splice(idx, 1)
      } else {
        x.selectedSizeValues.push(value)
      }

      if (x.selectedSizeNames.includes(name)) {
        let idx = x.selectedSizeNames.indexOf(name)
        x.selectedSizeNames.splice(idx, 1)
      } else {
        x.selectedSizeNames.push(name)
      }
      
      if (x.selectedSizeNames.length === 8) {
        x.headers.size = true
      } else {
        x.headers.size = false
      }

    } else if (className === 'agesM') {

      if (x.selectedAgesMValues.includes(value)) {
        let idx = x.selectedAgesMValues.indexOf(value)
        x.selectedAgesMValues.splice(idx, 1)
      } else {
        x.selectedAgesMValues.push(value)
      }

      if (x.selectedAgesMNames.includes(name)) {
        let idx = x.selectedAgesMNames.indexOf(name)
        x.selectedAgesMNames.splice(idx, 1)
      } else {
        x.selectedAgesMNames.push(name)
      }

      if (x.selectedAgesMNames.length === 16) {
        x.headers.agesM = true
      } else {
        x.headers.agesM = false
      }

    } else if (className === 'agesF') {

      if (x.selectedAgesFValues.includes(value)) {
        let idx = x.selectedAgesFValues.indexOf(value)
        x.selectedAgesFValues.splice(idx, 1)
      } else {
        x.selectedAgesFValues.push(value)
      }

      if (x.selectedAgesFNames.includes(name)) {
        let idx = x.selectedAgesFNames.indexOf(name)
        x.selectedAgesFNames.splice(idx, 1)
      } else {
        x.selectedAgesFNames.push(name)
      }

      if (x.selectedAgesFNames.length === 16) {
        x.headers.agesF = true
      } else {
        x.headers.agesF = false
      }

    }

    // let newobj = { [id]: { id: id, value: value } }

    // let k = Object.keys(x.selectedChecks)

    // for (let i = 0; i < x.selectedChecks.length; i++) {
    //   if (k[i] === id) {
    //     console.log(k[i])
    //     delete (x.selectedChecks).id
    //   } else {
    //     console.log(2)
    //     Object.assign(x.selectedChecks, newobj)
    //   }
    // }

    x.headers.race === true && x.headers.size === true && x.headers.agesM === true && x.headers.agesF === true ? x.headers.checkboxes = true : x.headers.checkboxes = false

    this.setState(x)
  }

  toggleAllStates = () => {
    let x = {...this.state}

    if (x.selectedStates.length >= 50) {
      x.selectedStates = []
      x.selectedStatesValues = []
      x.headers.states = false
    } else {
      x.selectedStates = stateNames
      x.selectedStatesValues = stateValues
      x.headers.states = true
    }

    this.setState(x)
  }

  howManyChecks = (e) => {
    let counter = 0;
    let x = {...this.state}
    let k = x.checkboxes[e]
    let keys = Object.keys(k)

    for (let i = 0; i < keys.length; i++) {
      let key = (keys[i]);
      if (k[key].checked === true) {
        counter++;
      }
    }

    return counter
  }

  toggleRace = () => {
    let x = {...this.state}
    let count = x.selectedRaceNames.length
    let keys = Object.keys(x.checkboxes.race)

    if (count < 9) {

      for (let i = 0; i < keys.length; i++) {
        let k = (keys[i]);
        x.checkboxes.race[k].checked = true;
        if (!x.selectedRaceNames.includes(x.checkboxes.race[k].name)) {
          x.selectedRaceNames.push(x.checkboxes.race[k].name)
          x.selectedRaceValues.push(x.checkboxes.race[k].value)
        }
        x.headers.race = true
      }
    } else {
      for (let i = 0; i < keys.length; i++) {
        let k = (keys[i]);
        x.checkboxes.race[k].checked = false;
        x.selectedRaceNames = []
        x.selectedRaceValues = []
      }
      x.headers.race = false

    }

    x.headers.race === true && x.headers.size === true && x.headers.agesM === true && x.headers.agesF === true ? x.headers.checkboxes = true : x.headers.checkboxes = false

    this.setState(x)
  }

  toggleSize = () => {
    let x = {...this.state}
    let count = x.selectedSizeNames.length
    let keys = Object.keys(x.checkboxes.size)
    
    if (count < 8) {

      for (let i = 0; i < keys.length; i++) {
        let k = (keys[i]);
        x.checkboxes.size[k].checked = true;
        if (!x.selectedSizeNames.includes(x.checkboxes.size[k].name)) {
          x.selectedSizeNames.push(x.checkboxes.size[k].name)
          x.selectedSizeValues.push(x.checkboxes.size[k].value)
        }
        x.headers.size = true
      }
    } else {
      for (let i = 0; i < keys.length; i++) {
        let k = (keys[i]);
        x.checkboxes.size[k].checked = false;
        x.selectedSizeNames = []
        x.selectedSizeValues = []
      }
      x.headers.size = false
      
    }

    x.headers.race === true && x.headers.size === true && x.headers.agesM === true && x.headers.agesF === true ? x.headers.checkboxes = true : x.headers.checkboxes = false
    
    this.setState(x)
  }

  toggleAgesM = () => {
    let x = {...this.state}
    let count = x.selectedAgesMNames.length
    let keys = Object.keys(x.checkboxes.agesM)
    
    if (count < 16) {
      
      for (let i = 0; i < keys.length; i++) {
        let k = (keys[i]);
        x.checkboxes.agesM[k].checked = true;
        if (!x.selectedAgesMNames.includes(x.checkboxes.agesM[k].name)) {
          x.selectedAgesMNames.push(x.checkboxes.agesM[k].name)
          x.selectedAgesMValues.push(x.checkboxes.agesM[k].value)
        }
        x.headers.agesM = true
      }
      
    } else {
      
      for (let i = 0; i < keys.length; i++) {
        let k = (keys[i]);
        x.checkboxes.agesM[k].checked = false;
        x.selectedAgesMNames = []
        x.selectedAgesMValues = []
      }
      x.headers.agesM = false
      
    }
    
    x.headers.race === true && x.headers.size === true && x.headers.agesM === true && x.headers.agesF === true ? x.headers.checkboxes = true : x.headers.checkboxes = false
    
    this.setState(x)
  }

  toggleAgesF = () => {
    let x = {...this.state}
    let count = x.selectedAgesFNames.length
    let keys = Object.keys(x.checkboxes.agesF)

    if (count < 16) {

      for (let i = 0; i < keys.length; i++) {
        let k = (keys[i]);
        x.checkboxes.agesF[k].checked = true;
        if (!x.selectedAgesFNames.includes(x.checkboxes.agesF[k].name)) {
          x.selectedAgesFNames.push(x.checkboxes.agesF[k].name)
          x.selectedAgesFValues.push(x.checkboxes.agesF[k].value)
        }
        x.headers.agesF = true
      }

    } else {

      for (let i = 0; i < keys.length; i++) {
        let k = (keys[i]);
        x.checkboxes.agesF[k].checked = false;
        x.selectedAgesFNames = []
        x.selectedAgesFValues = []
      }
      x.headers.agesF = false

    }

    x.headers.race === true && x.headers.size === true && x.headers.agesM === true && x.headers.agesF === true ? x.headers.checkboxes = true : x.headers.checkboxes = false

    this.setState(x)
  }

  toggleAllChecks = () => {
    let x = {...this.state}
    let numRaces = this.state.selectedRaceNames.length
    let numSizes = this.state.selectedSizeNames.length
    let numAgesM = this.state.selectedAgesMNames.length
    let numAgesF = this.state.selectedAgesFNames.length
    let num = numRaces + numSizes + numAgesM + numAgesF
    let raceKeys = Object.keys(x.checkboxes.race)
    let sizeKeys = Object.keys(x.checkboxes.size)
    let agesMKeys = Object.keys(x.checkboxes.agesM)
    let agesFKeys = Object.keys(x.checkboxes.agesF)

    if (numRaces !== 9) {
      this.toggleRace()
      x.headers.checkboxes = true
    } if (numSizes !== 8) {
      this.toggleSize()
      x.headers.checkboxes = true
    } if (numAgesM !== 16) {
      this.toggleAgesM()
      x.headers.checkboxes = true
    } if (numAgesF !== 16) {
      this.toggleAgesF()
      x.headers.checkboxes = true
    } if (num === 49) {

      for (let i = 0; i < raceKeys.length; i++) {
        let k = (raceKeys[i]);
        x.checkboxes.race[k].checked = false;
      }

      for (let i = 0; i < sizeKeys.length; i++) {
        let k = (sizeKeys[i]);
        x.checkboxes.size[k].checked = false;
      }

      for (let i = 0; i < agesMKeys.length; i++) {
        let k = (agesMKeys[i]);
        x.checkboxes.agesM[k].checked = false;
      }

      for (let i = 0; i < agesFKeys.length; i++) {
        let k = (agesFKeys[i]);
        x.checkboxes.agesF[k].checked = false;
      }

      x.selectedRaceNames.length = 0
      x.selectedRaceValues.length = 0
      x.selectedSizeNames.length = 0
      x.selectedSizeValues.length = 0
      x.selectedAgesMNames.length = 0
      x.selectedAgesMValues.length = 0
      x.selectedAgesFNames.length = 0
      x.selectedAgesFValues.length = 0
      x.headers.race = false
      x.headers.size = false
      x.headers.agesM = false
      x.headers.agesF = false
      x.headers.checkboxes = false

    }
    
    this.setState(x)
  }

  toggleCheckboxes = () => {
    this.setState({ checkboxesView: !this.state.checkboxesView })
  }

  searchpt2 = () => {
    let x = {...this.state}
    let data = x.responseData
    let numRaces = x.selectedRaceNames.length
    let numSizes = x.selectedSizeNames.length
    let numAM = x.selectedAgesMNames.length
    let numRacesSizes = numRaces + numSizes
    let numRacesSizesAM = numRacesSizes + numAM

    for (let i = 0; i < data.length; i++) {
      x.resRaces.push(data[i].slice(0, numRaces))
      x.resSizes.push(data[i].slice(numRaces, numRacesSizes))
      x.resAgesM.push(data[i].slice(numRacesSizes, numRacesSizesAM))
      x.resAgesF.push(data[i].slice(numRacesSizesAM, -1))
    }

    x.snapStates = [...x.selectedStates].sort()
    x.selectedRaceNames ? x.snapRacesNames = [...x.selectedRaceNames] : x.snapRacesNames = []
    x.selectedSizeNames ? x.snapSizesNames = [...x.selectedSizeNames] : x.snapSizesNames = []
    x.selectedAgesMNames ? x.snapAgesMNames = [...x.selectedAgesMNames] : x.snapAgesMNames = []
    x.selectedAgesFNames ? x.snapAgesFNames = [...x.selectedAgesFNames] : x.snapAgesFNames = []

    console.log(x)

    this.setState(x)
  }

  search = () => {
    let x = this.state
    let RV = x.selectedRaceValues
    let SV = x.selectedSizeValues
    let MV = x.selectedAgesMValues
    let FV = x.selectedAgesFValues
    let comma, comma2, comma3
    x.responseData.length = 0
    let raceID = RV.join(',')
    let sizeID = SV.join(',')
    let agesMID = MV.join(',')
    let agesFID = FV.join(',')
    let stateID = x.selectedStatesValues.join(',')
    let APIKey = "12ba7d01dfe85e9b84c731fceefc830022291a8f";
    let endpoint = "https://api.census.gov/data/2010/dec/sf1?";

    if (this.state.selectedStates.length === 0) {
      alert('Please Click on One or More States')
    } else if (RV.length === 0 && SV.length === 0 && MV.length === 0 && FV.length === 0) {
      alert('Please Click on One or More Checkboxes in the Checkbox Panel')
    } else {

      if (RV.length !== 0 && (SV.length !== 0 || MV.length !== 0 || FV.length !== 0)) {
        comma = ','
      } else { comma = '' }

      if (SV.length !== 0 && (MV.length !== 0 || FV.length !== 0)) {
        comma2 = ','
      } else { comma2 = '' }

      if (MV.length !== 0 && FV.length !== 0) {
        comma3 = ','
      } else { comma3 = '' }

      let url = `${endpoint}get=${raceID}${comma}${sizeID}${comma2}${agesMID}${comma3}${agesFID}&for=state:${stateID}&key=${APIKey}`

      console.log(url)

      axios.get(url)
        .then(y => {
          x.responseData = y.data
          this.setState(x, () => this.searchpt2())
        })
    }
  }

  cLog = () => {
    console.log(this.state)
  }

  render() {

    return (
      <div id='overlord'>
        <Map
          toggleStates={this.toggleStates}
          state={this.state}
        />
        <Checklist
          toggleAllStates={this.toggleAllStates}
          toggleAllChecks={this.toggleAllChecks}
          toggleCheckboxes={this.toggleCheckboxes}
          search={this.search}
          state={this.state}
        />
        { this.state.checkboxesView && <Checkboxes
          toggleCheck={this.toggleCheck}
          state={this.state}
          toggleRace={this.toggleRace}
          toggleSize={this.toggleSize}
          toggleAgesM={this.toggleAgesM}
          toggleAgesF={this.toggleAgesF}
        /> }
        <Results
          cLog={this.cLog}
          state={this.state}
        />
      </div>
    )
  }
}