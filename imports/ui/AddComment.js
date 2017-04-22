import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }
  onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    Meteor.call('comments.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
  onChange(e) {
    this.setState({
      url: e.target.value
    });
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      url: '',
      error: ''
    });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Agrega Comentario</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Agregar Comentario"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Agregar</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input
                type="text"
                placeholder="Pon aqui tu comentario"
                ref="url"
                value={this.state.url}
                onChange={this.onChange.bind(this)}/>
              <button className="button">Aceptar</button>
              <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancelar</button>
          </form>
        </Modal>
      </div>
    );
  }
}
