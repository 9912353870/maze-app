import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import mario from './mario.jpeg';
import food from './mfood.jpeg';
import App from './App';

import * as serviceWorker from './serviceWorker';
class Maze extends React.Component{
  constructor(props){
    super(props);
    this.state = {width: 0,height: 0,score:0,random: []};
    this.rows = this.rows.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.movement = this.movement.bind(this);
  }

  componentDidMount(){
    var width = prompt('Please enter width.');
    var height = prompt('Please enter height');
    var random_places = [];
    var center = Math.floor(Math.ceil(width/2)-1)*width+width/2;
  
    for(let k = 1;k <= Number(width);k++){ 
      var pele = Math.floor(Math.random() * (Number(width) * Number(height)) );
      if(!random_places.includes(pele) && pele != center){ random_places.push(pele); }
    }
    this.setState({width: width,height: height,random: random_places}); 
    if(width != "" && height!=""){
      document.addEventListener("keydown", this.onKeyDown, false);
    }else{
      alert("Provide height and width");
      window.location.reload();
    }
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyDown, false);
  }
 movement(cid,nid){
    var nval = document.getElementById(nid).innerHTML;
    var score = Number(document.getElementById("score").value);
    var satisfied = Number(this.state.random.length);
    var img_src = mario;
    if(score == satisfied){ 
      alert("Total steps :"+score);
    }else{
      if(nval != ''){
       document.getElementById("score").value = Number(score)+1;
      }
     document.getElementById(nid).innerHTML = '<img class="mario" src="'+img_src+'" alt="1"/>';
     document.getElementById(cid).innerHTML = '';
     document.getElementById(cid).classList.remove("active");
     document.getElementById(nid).classList.add("active");
   }
 }
 rows(){
    var width = Number(this.state.width);
    var height = Number(this.state.height);
    let table = [];
    let random_places = this.state.random;
    var cw = Math.ceil(width/2);
    var ch = Math.ceil(height/2);
    var c = 1;

    for (let i = 1; i <= height; i++) {
      let children = []
      for (let j = 1; j <= width; j++) {
        if(i == cw && j== ch){
          children.push(<td id={"id_"+c} className="active">
                            <div onKeyPress={this.handleKeyPress}>
                              <img className="mario" src={mario} alt="1"/>
                            </div>
                        </td>);  

        }else if(random_places.includes(c)){
          children.push(<td id={"id_"+c}><img className="mario" src={food} alt="0"/></td>);
         }else{
          children.push(<td id={"id_"+c}></td>);
         }
        c++;
      }
      table.push(<tr id={"row_"+i} >{children}</tr>)
    }
    return table;
  } 
  onKeyDown(e) {
    var noc = document.getElementById('myTable').getElementsByTagName("td").length;
    var ele = document.querySelector('.active').id;
    var key =  ele.split("_");
    var rowid = document.getElementById(ele).parentNode.id.split("_");
    var width = Number(this.state.width);
    var height = Number(this.state.height);
    var stepfld = document.getElementById("steps");
    var steps = Number(stepfld.value);
    switch (e.which) {
        case 37: if((Number(key[1])-1) > (rowid[1]-1) * width ){
                 var nextid = "id_"+(Number(key[1])-1);
                 this.movement(ele,nextid);
                 stepfld.value = steps+1;
              }else{
                alert("Crossing boundaries.");
              }
                 break;

        case 38: if((Number(key[1])-width) > 0){    
                 var nextid = "id_"+(Number(key[1])-width);
                 this.movement(ele,nextid);
                 stepfld.value = steps+1;
                }else{
                  alert("Crossing boundaries.");
                }
                 break;

        case 39:if((Number(key[1])+1) <= (rowid[1] * width) ){
                var nextid = "id_"+(Number(key[1])+1);
                this.movement(ele,nextid);
                stepfld.value = steps+1;
              }else{
                alert("Crossing boundaries.");
              }
                break;

        case 40: if((Number(key[1])+width) <= (height*width)){
                var nextid = "id_"+(Number(key[1])+width);
                this.movement(ele,nextid);
                stepfld.value = steps+1;
               }else{
                alert("Crossing boundaries.");
               }
                break;

        default:
            break;

    }
  }   
  render(){

  return(<div > 
              <table border='1' id="myTable">
                 <tbody>
                   {this.rows()}
                 </tbody>
               </table>
              <div><label>Score:</label><input type="text" id="score" value="0" /></div>
              <div><label>Steps:</label><input type="text" id="steps" value="0" /></div>
              <div><input type="button" value="Restart" name="Restart" onClick={()=>{window.location.reload();}} /></div>
         </div>);
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Maze />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
