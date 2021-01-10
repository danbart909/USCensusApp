import React, { Component } from 'react'

export default class Checklist extends Component {

  renderRaceList = () => {
    return (this.props.state.selectedRaceNames.map(x =>
      (<div className='CL-list-item'>
        <span>{x}</span>
      </div>)
    ))
  }

  renderSizeList = () => {
    return (this.props.state.selectedSizeNames.map(x =>
      (<div className='CL-list-item'>
        <span>{x}</span>
      </div>)
    ))
  }

  renderAgesMList = () => {
    return (this.props.state.selectedAgesMNames.map(x =>
      (<div className='CL-list-item'>
        <span>{x}</span>
      </div>)
    ))
  }

  renderAgesFList = () => {
    return (this.props.state.selectedAgesFNames.map(x =>
      (<div className='CL-list-item'>
        <span>{x}</span>
      </div>)
    ))
  }

  render() {

    let toggleAllStatesClass = this.props.state.headers.states ? 'CL-toggle-all-states-button-active backpulse-R' : 'CL-toggle-all-states-button-inactive backpulse-B'
    let toggleAllChecksClass = this.props.state.headers.checkboxes ? 'CL-toggle-all-checkboxes-button-active backpulse-R' : 'CL-toggle-all-checkboxes-button-inactive backpulse-B'
    let toggleCheckboxPanelClass = this.props.state.checkboxesView ? 'CL-toggle-checkbox-panel-button-active' : 'CL-toggle-checkbox-panel-button-inactive'

    let raceTitle = this.props.state.selectedRaceNames.length === 9 ? 'CL-body-header-active' : 'CL-body-header-inactive'
    let sizeTitle = this.props.state.selectedSizeNames.length === 8 ? 'CL-body-header-active  CL-size-header-active' : 'CL-body-header-inactive CL-size-header-inactive'
    let agesMTitle = this.props.state.selectedAgesMNames.length === 16 ? 'CL-body-header-active  CL-agesm-header-active' : 'CL-body-header-inactive CL-agesm-header-inactive'
    let agesFTitle = this.props.state.selectedAgesFNames.length === 16 ? 'CL-body-header-active  CL-agesf-header-active' : 'CL-body-header-inactive CL-agesf-header-inactive'

    return (
      <div className='CL-container'>
  
        <div className='CL-body'>

          <div className='CL-race CL-section'>
            <div className={raceTitle}>
              <span>Race/Ethnicity</span>
            </div>
            <div className='CL-list'>
              {this.props.state.selectedRaceNames && this.renderRaceList()}
            </div>
          </div>
  
          <div className='CL-size CL-section'>
            <div className={sizeTitle}>
              <span>Household Size</span>
            </div>
            <div className='CL-list'>
              {this.props.state.selectedSizeNames && this.renderSizeList()}
            </div>
          </div>
  
          <div className='CL-agesM CL-section'>
            <div className={agesMTitle}>
              <span>Age (Male)</span>
            </div>
            <div className='CL-list'>
              {this.props.state.selectedAgesMNames && this.renderAgesMList()}
            </div>
          </div>
  
          <div className='CL-agesF CL-section'>
            <div className={agesFTitle}>
              <span>Age (Female)</span>
            </div>
            <div className='CL-list'>
              {this.props.state.selectedAgesFNames && this.renderAgesFList()}
            </div>
          </div>

        </div>

        <div className='CL-buttons'>

          <div className='CL-buttons-left wobble'>
            <div className={toggleCheckboxPanelClass} onClick={this.props.toggleCheckboxes}>
              { this.props.state.checkboxesView ? <i class="fas fa-arrow-circle-right CL-right"/> : <i class="fas fa-arrow-circle-left CL-left hvr-icon"/> }
              <span>Checkbox Panel</span>
            </div>
          </div>

          <div className='CL-buttons-middle'>
            <div className='CL-search-button radialout' onClick={this.props.search}>
              <span>Search</span>
            </div>
          </div>

          <div className='CL-buttons-right'>
            <div className='CL-buttons-right-top'>
              <span>Toggle All:</span>
            </div>
            <div className='CL-buttons-right-bot'>
              <div className={toggleAllStatesClass} onClick={this.props.toggleAllStates}>
                <span>States</span>
              </div>
              <div className={toggleAllChecksClass} onClick={this.props.toggleAllChecks}>
                <span>Checkboxes</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    )
  }
}