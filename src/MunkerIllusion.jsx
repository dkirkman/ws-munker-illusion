import React, {Component} from 'react';
import chroma from 'chroma-js';

class MunkerIllusion extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.widthRef = React.createRef();
    this.lightnessRef = React.createRef();

    this.widthChange = this.widthChange.bind(this);
    this.lightnessChange = this.lightnessChange.bind(this);

    this.scaleBackground = chroma.scale(['blue', 'white']).correctLightness();
    this.scaleBar = chroma.scale(['yellow', 'white']).correctLightness();

    this.width=350;
    this.height=200;
  }

  componentDidMount() {
    this.go();
  }

  widthChange(event) {
    let value = this.widthRef.current.value;
    console.log('Boom Chuggg ... ' + value);
    this.go();
  }
  
  lightnessChange(event) {
    let value = this.lightnessRef.current.value;
    console.log('ligtness = ' + value);
    this.go();
  }

  go() {
    let lightness = Number(this.lightnessRef.current.value);
    let width = Number(this.widthRef.current.value);

    let backgroundColor = this.scaleBackground(lightness).hex();
    let barColor = this.scaleBar(lightness).hex();
    let objColor = 'red';

    let svg = this.myRef.current;
    svg.innerHTML = '';
    svg.style.background = backgroundColor;

    var y;


    for (y=width/2; y<=this.height+width; y+=width*2) {
      let line = document.createElementNS('http://www.w3.org/2000/svg',
                                          'line');
      
      line.setAttribute('x1', 0);
      line.setAttribute('y1', y);
      line.setAttribute('x2', this.width);
      line.setAttribute('y2', y);
      
      line.setAttribute('stroke', barColor);
      line.setAttribute('stroke-width', width);
      svg.appendChild(line);
      
      if (y > 50 && y < 150) {
        let cline1 = document.createElementNS('http://www.w3.org/2000/svg',
                                              'line');

        cline1.setAttribute('x1', 50);
        cline1.setAttribute('y1', y);
        cline1.setAttribute('x2', 150);
        cline1.setAttribute('y2', y);
        
        cline1.setAttribute('stroke', objColor);
        cline1.setAttribute('stroke-width', width);        
        
        svg.appendChild(cline1);        

        let cline2 = document.createElementNS('http://www.w3.org/2000/svg',
                                              'line');

        cline2.setAttribute('x1', 200);
        cline2.setAttribute('y1', y+width);
        cline2.setAttribute('x2', 300);
        cline2.setAttribute('y2', y+width);
        
        cline2.setAttribute('stroke', objColor);
        cline2.setAttribute('stroke-width', width);        
        
        let yy = y+width;
        svg.appendChild(cline2);        
      }

    }

    console.log('BOOM chugaluga');
  }

  render() {
    console.log('render render render');
    return (
      <div>
        <label>Grating Width</label>
        <input type="range" ref={this.widthRef} 
               min="1" max="50" defaultValue="6"
               onInput={this.widthChange}  onChange={this.widthChange}/>
        <br/>
        <label>Grating Lightness</label>
        <input type="range" ref={this.lightnessRef} 
               min="0" max="1" step="0.01" defaultValue="0"              
               onInput={this.lightnessChange} onChange={this.lightnessChange}/>

        
        <svg width={this.width} height={this.height} ref={this.myRef}
             style={{display: 'block', margin: 'auto'}}>
        </svg>
      </div>
    );
  }
}

export default MunkerIllusion;
