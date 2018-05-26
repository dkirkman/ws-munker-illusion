import React, {Component} from 'react';
import chroma from 'chroma-js';

class MunkerIllusion extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.widthRef = React.createRef();
    this.lightnessRef = React.createRef();
    this.offsetRef = React.createRef();

    this.widthChange = this.widthChange.bind(this);
    this.lightnessChange = this.lightnessChange.bind(this);
    this.offsetChange = this.offsetChange.bind(this);

    let background = 'blue';
    if (this.props.background !== undefined) background = this.props.background;

    let bar = 'yellow';
    if (this.props.bar !== undefined) bar = this.props.bar;

    this.scaleBackground = 
      chroma.scale([background, 'white']).correctLightness();
    this.scaleBar = 
      chroma.scale([bar, 'white']).correctLightness();

    this.width=350;
    this.height=200;
  }

  componentDidMount() {
    this.go();
  }

  widthChange(event) {
    this.go();
  }
  
  lightnessChange(event) {
    this.go();
  }

  offsetChange(event) {
    this.go();
  }

  go() {
    let lightness = Number(this.lightnessRef.current.value);
    let width = Number(this.widthRef.current.value);
    let offset = Number(this.offsetRef.current.value);

    let backgroundColor = this.scaleBackground(lightness).hex();
    let barColor = this.scaleBar(lightness).hex();

    let objColor = 'red';
    if (this.props.grating !== undefined) objColor = this.props.grating;

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
        cline2.setAttribute('y1', y+width - offset*width);
        cline2.setAttribute('x2', 300);
        cline2.setAttribute('y2', y+width - offset*width);
        
        cline2.setAttribute('stroke', objColor);
        cline2.setAttribute('stroke-width', width);        
        
        let yy = y+width;
        svg.appendChild(cline2);        
      }

    }
  }

  labeled_slider(label_text, min, max, step, defaultValue, ref, callback) {
    return (
          <div style={{display: 'block', width: '350px'}}>
            <div style={{'display': 'table-cell', 'vertical-align': 'top',
                 'width': '350px'}}>
              <label style={{'font-size': '1.0rem', 'vertical-align': 'middle'}}>
                {label_text}</label>
              
              <div style={{'width': '150px', 'float':'right'}}>
                <input type="range" ref={ref} 
                       min={min} max={max} step={step} defaultValue={defaultValue}
                       onInput={callback}  onChange={callback}
                       style={{'vertical-align':'middle'}}/>
              </div>
            </div>
          </div>
    );
  }
  render() {
    return (
      <p>
        <div style={{display: 'inline'}}>

          {this.labeled_slider("Stripe Width", 1, 50, 1, 5, 
                               this.widthRef, this.widthChange)}

          {this.labeled_slider("Background Lightness", 0, 1, 0.01, 0, 
                               this.lightnessRef, this.lightnessChange)}

          {this.labeled_slider("Right Grating Offset", 0, 1, 0.05, 0,
                               this.offsetRef, this.offsetChange)}
          
        </div>

        <div style={{display: 'block', margin: 'auto'}}>
          <svg width={this.width} height={this.height} ref={this.myRef}
               style={{display: 'block', margin: 'auto'}}>
          </svg>
        </div>

      </p>
    );
  }
}

export default MunkerIllusion;
