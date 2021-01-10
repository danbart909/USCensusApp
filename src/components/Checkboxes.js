import React, { Component } from 'react'
// import $ from 'jquery'

export default class Checkboxes extends Component {

  renderRaces = () => {
    let race = this.props.state.checkboxes.race
    let keys = Object.keys(race)
    let html = []
    for(let i = 0; i < keys.length; i++) { 
      let key = (keys[i]);
      html.push(<li className='race-checkbox' key={i}>
        <input type='checkbox' name={race[key].name} id={race[key].id} value={race[key].value} checked={this.props.state.checkboxes.race[key].checked} className={race[key].className} onChange={(e) => {this.props.toggleCheck(e.target)}}/>
        <label htmlFor={race[key].id}>{race[key].name}</label>
      </li>)
    }
    return html
  }

  renderSizes = () => {
    let size = this.props.state.checkboxes.size
    let keys = Object.keys(size)
    let html = []
    for(let i = 0; i < keys.length; i++) { 
      let key = (keys[i]);
      html.push(<li className='size-checkbox' key={i}>
        <input type='checkbox' name={size[key].name} id={size[key].id} value={size[key].value} checked={this.props.state.checkboxes.size[key].checked} className={size[key].className} onChange={(e) => {this.props.toggleCheck(e.target)}}/>
        <label htmlFor={size[key].id}>{size[key].name}</label>
      </li>)
    }
    return html
  }

  renderAgesM = () => {
    let agesM = this.props.state.checkboxes.agesM
    let keys = Object.keys(agesM)
    let html = []
    for(let i = 0; i < keys.length; i++) { 
      let key = (keys[i]);
      html.push(<li className='agesM-checkbox' key={i}>
        <input type='checkbox' name={agesM[key].name} id={agesM[key].id} value={agesM[key].value} checked={this.props.state.checkboxes.agesM[key].checked} className={agesM[key].className} onChange={(e) => {this.props.toggleCheck(e.target)}}/>
        <label htmlFor={agesM[key].id}>{agesM[key].name}</label>
      </li>)
    }
    return html
  }

  renderAgesF = () => {
    let agesF = this.props.state.checkboxes.agesF
    let keys = Object.keys(agesF)
    let html = []
    for(let i = 0; i < keys.length; i++) { 
      let key = (keys[i]);
      html.push(<li className='agesF-checkbox' key={i}>
        <input type='checkbox' name={agesF[key].name} id={agesF[key].id} value={agesF[key].value} checked={this.props.state.checkboxes.agesF[key].checked} className={agesF[key].className} onChange={(e) => {this.props.toggleCheck(e.target)}}/>
        <label htmlFor={agesF[key].id}>{agesF[key].name}</label>
      </li>)
    }
    return html
  }
  
  render() {

    let raceClass = this.props.state.headers.race ? 'cb-race-title-active backpulse-R' : 'cb-race-title-inactive backpulse-B'
    let sizeClass = this.props.state.headers.size ? 'cb-size-title-active backpulse-R' : 'cb-size-title-inactive backpulse-B'
    let agesMClass = this.props.state.headers.agesM ? 'cb-agesM-title-active backpulse-R' : 'cb-agesM-title-inactive backpulse-B'
    let agesFClass = this.props.state.headers.agesF ? 'cb-agesF-title-active backpulse-R' : 'cb-agesF-title-inactive backpulse-B'


    return (
      <div className='cb-container'>

        <div className='cb-top'>

          <div className='cb-race'>

            <div className={raceClass}>
              <div id='race' className='Race/Ethnicity' onClick={this.props.toggleRace}>Race/Ethnicity</div>
            </div>
            
            <div className='cb-race-boxes'>
              <ul>
                {this.renderRaces()}
              </ul>
            </div>
          </div>

          <div className='cb-size'>

            <div className={sizeClass}>
              <div id='size' className='Household Size' onClick={this.props.toggleSize}>Household Size</div>
            </div>

            <div className='cb-size-boxes'>
              <ul>
                {this.renderSizes()}
              </ul>
            </div>
          </div>

        </div>

        <div className='cb-bottom'>

          <div className='cb-agesM'>

            <div className={agesMClass}>
              <div id='agesM' className='By Age (M)' onClick={this.props.toggleAgesM}>By Age (M)</div>
            </div>

              <div className='cb-agesM-boxes'>
                <ul>
                  {this.renderAgesM()}
                </ul>
              </div>

          </div>

          <div className='cb-agesF'>

            <div className={agesFClass}>
              <div id='agesF' className='By Age (F)' onClick={this.props.toggleAgesF}>By Age (F)</div>
            </div>

              <div className='cb-agesF-boxes'>
                <ul>
                  {this.renderAgesF()}                
                </ul>
              </div>

          </div>

        </div>

      </div>
    )
  }
}