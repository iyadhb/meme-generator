import React, { Component } from 'react';

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((res) => {
        const { memes } = res.data;
        this.setState({
          allMemeImgs: memes,
        });
      });
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // get random image from the array
  handleSubmit = (event) => {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg });
  };

  render() {
    return (
      <div>
        <form className='meme-form' onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='topText'
            value={this.state.topText}
            placeholder='Top Text'
            onChange={this.handleChange}
          />

          <input
            type='text'
            name='bottomText'
            value={this.bottomText}
            placeholder='bottom Text'
            onChange={this.handleChange}
          />

          <button>Gen</button>
        </form>
        <div className='meme'>
          <img src={this.state.randomImg} alt='' />
          <h2 className='top'>{this.state.topText}</h2>
          <h2 className='bottom'>{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
