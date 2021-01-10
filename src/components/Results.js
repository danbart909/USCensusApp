import React, { Component } from 'react'

export default class Results extends Component {

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  splitArray = (x, y) => {
    let results = []
    while (x.length) {
      return results.push(x.splice(0, y));
    }
    return results;
  }

  renderResults = () => {
    let x = {...this.props.state}
    let races = x.snapRacesNames
    let sizes = x.snapSizesNames
    let agesm = x.snapAgesMNames
    let agesf = x.snapAgesFNames
    let num1 = races.length
    let num2 = num1 + sizes.length
    let num3 = num2 + agesm.length
    let num4 = num3 + agesf.length
    let numD = x.responseData.length
    let numS = x.snapStates.length
    let data = [], final = [], racesArr = [], sizesArr = [], agesmArr = [], agesfArr = [], titles = [], race1 = [], race2 = [], race3 = [], size1 = [], size2 = [], size3 = [], agesm1 = [], agesm2 = [], agesm3 = [], agesf1 = [], agesf2 = [], agesf3 = [], all = [], all2 = [], table = []

    for (let i = 1; i < numD; i++) {
      data.push(x.responseData[i].slice(0, -1))
    }

    data.forEach(x => {
      race1.push(x.slice(0, num1))
      size1.push(x.slice(num1, num2))
      agesm1.push(x.slice(num2, num3))
      agesf1.push(x.slice(num3, num4))
    })

    race1.map(x => {
      return x.map(y => {
        race2.push(<td className='td-race'>{this.numberWithCommas(y)}</td>)
        return race2
      })
    })

    for (let i = 0, j = 1; i < numS; i++, j++) {
      race3.push(race2.slice((num1 * i), (num1 * j)))
    }

    size1.map(x => {
      return x.map(y => {
        size2.push(<td className='td-size'>{this.numberWithCommas(y)}</td>)
        return size2
      })
    })

    for (let i = 0, j = 1; i < numS; i++, j++) {
      size3.push(size2.slice((sizes.length * i), (sizes.length * j)))
    }

    agesm1.map(x => {
      return x.map(y => {
        agesm2.push(<td className='td-agesm'>{this.numberWithCommas(y)}</td>)
        return agesm2
      })
    })

    for (let i = 0, j = 1; i < numS; i++, j++) {
      agesm3.push(agesm2.slice((agesm.length * i), (agesm.length * j)))
    }

    agesf1.map(x => {
      return x.map(y => {
        agesf2.push(<td className='td-agesf'>{this.numberWithCommas(y)}</td>)
        return agesf2
      })
    })

    for (let i = 0, j = 1; i < numS; i++, j++) {
      agesf3.push(agesf2.slice((agesf.length * i), (agesf.length * j)))
    }

    let ruler = 0
    if (num3 === 0) {
      ruler = agesf2.length
    } else if (num2 === 0) {
      ruler = agesm2.length
    } else if (num1 === 0) {
      ruler = size2.length
    } else {
      ruler = race2.length
    }


    for (let i = 0; i < ruler; i++) {
      all.push(<>{race3[i]}{size3[i]}{agesm3[i]}{agesf3[i]}</>)     
    }

    for (let i = 0; i < numS; i++) {
      all2.push(<tr><td className='td-state'>{x.snapStates[i]}</td>{all[i]}</tr>)
    }



    for (let i = 0; i < races.length; i++) {
      racesArr.push(<td className='th-race'>{races[i]}</td>)
    }

    for (let i = 0; i < sizes.length; i++) {
      sizesArr.push(<td className='th-size'>{sizes[i]}</td>)
    }

    for (let i = 0; i < agesm.length; i++) {
      agesmArr.push(<td className='th-agesm'>{agesm[i]}</td>)
    }

    for (let i = 0; i < agesf.length; i++) {
      agesfArr.push(<td className='th-agesf'>{agesf[i]}</td>)
    }

    // titles.push(<tr><td className='th-star' onClick={this.props.cLog}>*</td>{racesArr}{sizesArr}{agesmArr}{agesfArr}</tr>)

    titles.push(<tr><td className='th-star'>*</td>{racesArr}{sizesArr}{agesmArr}{agesfArr}</tr>)

    table.push(<table><tbody>{titles}{all2}</tbody></table>)

    this.props.state.responseData.length > 0 ? final = table : final = null

    return final

  }

  render() {

    let cClass = this.props.state.responseData.length > 0 ? 'r-container-active' : 'r-container-inactive'

    return (
      <div className={cClass}>
        <div className='r-data'>
          {this.renderResults()}
        </div>
      </div>
    )
  }
}