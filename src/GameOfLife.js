import React, { Component } from 'react';

class GameOfLife extends Component{
  constructor(props){
    super(props);
    this.state = {
      grid : []
    }
    this.gotoNextGen = this.gotoNextGen.bind(this);
    this.renderTableRow = this.renderTableRow.bind(this);
    this.cellClicked = this.cellClicked.bind(this);
    this.clone2DArray = this.clone2DArray.bind(this);
  }

  componentWillMount(){
    this.resetGrid();
    //Initialize the model
    let rows = [];
    for(let y=0;y<this.props.rowGridCount;y++){
      rows[y] = [];
      for(let x=0;x<this.props.colGridCount;x++){
        rows[y][x] = false;
      }
    }

    this.setState({
      grid : rows
    });

    console.log(this.state.grid.map(function (row) { return row.join(' '); }).join('\n'));
  }

  resetGrid(){
    this.setState({
        grid : []
    });
  }

  componentDidMount(){
    //Non-react way - Directly manipulating DOM
    // let gridDOM = document.getElementById('grid');
    // let fragment = document.createDocumentFragment();
    // let rows = [];
    // for(let y=0;y<this.props.rowGridCount;y++){
    //   let tr = document.createElement('tr');
    //   rows[y] = [];
    //   for(let x=0;x<this.props.colGridCount;x++){
    //     let td = document.createElement('td');
    //     td.style.border= '1px solid black';
    //     td.style.width = '20px';
    //     td.coords = [y, x];
    //     td.onclick = (function(evnt){
    //       let y = evnt.target.coords[0];
    //       let x = evnt.target.coords[1];
    //       if(!rows[y][x]){
    //         evnt.target.bgColor = "black";
    //         evnt.target.border= '1px solid black';
    //         rows[y][x] = true;//Closure on rows
    //       }
    //       else {
    //         evnt.target.bgColor = "white";
    //         evnt.target.border= '1px solid black';
    //         rows[y][x] = false;
    //       }
    //
    //       this.setState({
    //         grid: rows
    //       })
    //       //console.log(evnt,y,x,this.state.grid[y][x]);
    //       this.printGrid();
    //
    //       //this.state.grid[y][x] = true;
    //     }).bind(this);
    //     td.innerHTML = 0;
    //     rows[y][x] = false;
    //     tr.appendChild(td);
    //   }
    //   fragment.appendChild(tr);
    // }
    // gridDOM.appendChild(fragment);



  }

  getNeighbourCount(y,x){

    let prevRow = this.state.grid[y-1] || [];
		let nextRow = this.state.grid[y+1] || [];

    return [
			prevRow[x-1], prevRow[x], prevRow[x+1],
			this.state.grid[y][x-1], this.state.grid[y][x+1],
			nextRow[x-1], nextRow[x], nextRow[x+1]
		].reduce(function (prev, cur) {
			return prev + +!!cur;
		}, 0);

      //let neighbourCount = 0;
      // let n1 = prevRow[x]  || false;
      // let n2 = prevRow[x-1] || false;
      // let n3 = prevRow[x+1]  || false;
      // let n4 = nextRow[x]  || false;
      // let n5 = nextRow[x-1]  || false;
      // let n6 = nextRow[x+1]  || false;
      // let n7 = this.state.grid[y][x-1]  || false;
      // let n8 = this.state.grid[y][x+1]  || false;
      //
      // //console.log(y,x, n1,n2,n3,n4,n5,n6,n7,n8);
      // if(n1) neighbourCount++;
      // if(n2) neighbourCount++;
      // if(n3) neighbourCount++;
      // if(n4) neighbourCount++;
      // if(n5) neighbourCount++;
      // if(n6) neighbourCount++;
      // if(n7) neighbourCount++;
      // if(n8) neighbourCount++;
      //
      // return neighbourCount;
  }

  printGrid(){
    console.log(this.state.grid.map(function (row) { return row.join(' '); }).join('\n'));
    console.log('\n\n')
  }

  clone2DArray(array) {
	   return array.slice().map(function (row) { return row.slice(); });
  }

  gotoNextGen(evnt){
    let rows = this.clone2DArray(this.state.grid);
    for(let y=0;y<this.props.rowGridCount;y++){
      for(let x=0;x<this.props.colGridCount;x++){
        let neighbourCount = this.getNeighbourCount(y,x);
        //console.log(y,x,neighbourCount);
        if(rows[y][x] === true){

            if( neighbourCount < 2 || neighbourCount>3){//Any live cell with fewer than two live neighbours dies, as if caused by underpopulation. OR Any live cell with more than three live neighbours dies, as if by overpopulation.
              rows[y][x] = false;
            }else if(neighbourCount === 2 || neighbourCount === 3){//Any live cell with two or three live neighbours lives on to the next generation.
              rows[y][x] = true; //No OP - As its already true
            }
        }else {
          if( neighbourCount === 3){//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            rows[y][x] = true;
          }
        }
      }
    }
    //this.printGrid();
    this.setState({
      grid : rows
    });
  }

  cellClicked(coords){
    //console.log("cellClicked "+coords.xIndex,coords.yIndex);
    let y = coords.yIndex;
    let x = coords.xIndex;
    let tempGrid = this.state.grid;
    tempGrid[y][x] = !tempGrid[y][x];//Inverse it
    this.setState({
      grid: tempGrid
    });
  }

  renderTableRow(row,yIndex){
    let cells = row.map((function(cell,xIndex){
      let coords = {yIndex,xIndex};
      return (
        <td key={xIndex}style={{border:"1px solid black",backgroundColor:(cell?"black":"white")}} onClick={this.cellClicked.bind(null,coords)}></td>
      );
    }).bind(this));
    return (<tr key={yIndex}>{cells}</tr>);
  }


  render(){
    //console.log("RENDER");
    return(
      <div style={{width:"200px",height:"200px"}}>
        <button onClick={this.gotoNextGen}>NEXT</button>
        <table id="grid" style={{width:"100%",height:"100%"}}>
        <tbody>
          {
             this.state.grid.map(this.renderTableRow)
          }
        </tbody>
        </table>
      </div>
    );
  }
}

export default GameOfLife;
