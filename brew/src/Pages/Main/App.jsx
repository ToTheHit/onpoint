import React, { Component } from 'react';

import './app.less';
import './main.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      N: 3,
      NF: 30,
      i: 0,
      x0: null,
      locked: false,
      w: null,
      ini: null,
      fin: null,
      rID: null,
      anf: null
    };
  }

  stopAni() {
    cancelAnimationFrame(this.state.rID);
    this.setState({ rID: null });
  };

  ani(cf = 0) {
    const { ini, fin, anf } = this.state;
    this.containerRef.current.style.setProperty('--i', ini + (fin - ini) * cf / anf);

    if (cf === anf) {
      this.stopAni();
      return
    }

    this.setState({ rID: requestAnimationFrame(this.ani.bind(this, ++cf)) });
  };

  unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e
  };

  lock(e) {
    this.setState({
      x0: this.unify(e).clientX,
      locked: true,
    })
  };

  drag(e) {
    e.preventDefault();
    const { locked, x0, w, i } = this.state;
    if (locked) {
      let dx = this.unify(e).clientX - x0, f = +(dx / w).toFixed(2);

      this.containerRef.current.style.setProperty('--i', i - f)
    }
  };

  move(e) {
    const { locked, x0, w, i, NF, N } = this.state;
    if(locked) {
      let copyI = i;
      let dx = this.unify(e).clientX - x0,
        s = Math.sign(dx),
        f = +(s*dx/w).toFixed(2);


      if((copyI > 0 || s < 0) && (copyI < N - 1 || s > 0) && f > .2) {
        copyI -= s;
        f = 1 - f
      }

      this.ani();

      this.setState({
        i: copyI,
        ini: copyI - s*f,
        fin: i,
        anf: Math.round(f*NF),
        x0: null,
        locked: false,
      })
    }
  };

  render() {
    const {} = this.state;
    return (
      <div className='App' ref={this.containerRef}>
        {/*<img src='https://images.unsplash.com/photo-1514117445516-2ecfc9c4ec90?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=0e0b58fcf67fa6e8a010322d617e39af' alt='Mountain massif, sunbathed, partly covered in show.'/>*/}
        {/*<img src='https://images.unsplash.com/photo-1510325805092-2951ab330b7d?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=017cf46443f4821a375c20e8c68e37f0' alt='Tiny bird with pale brown, orange and white feathers in an evergreen tree.'/>*/}
        {/*<img src='https://images.unsplash.com/photo-1514848567240-a81cb051807a?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=3a0e476ab712db0eb68ab121a21c54de' alt='Close-up of yellow rose opening up.'/>*/}
        {/*<img src='https://images.unsplash.com/photo-1465408522361-a6f502298219?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=7a6bd1244c42d1dbd3984a4c13981666' alt='Fast and foamy creek in the middle of the forest.'/>*/}
        {/*<img src='https://images.unsplash.com/photo-1503843778847-2b8bdce2ed3d?ixlib=rb-0.3.5&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ&amp;s=d547781176ce182eeeb7303bac05abf4' alt='Fluffy little tabby with blue eyes climbing up a tree.'/>*/}
        <div style={{ background: '#00bcd4' }}>1</div>
        <div style={{ background: '#6dc5a3' }}>2</div>
        <div style={{ background: '#91E59A' }}>3</div>
      </div>
    );
  }
}

export default App;
