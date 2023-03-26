import { Component } from "react";

export default class CardItem extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { character } = this.props;
    return (
      <div
        onClick={() => this.props.func(this.props.character.id)}
        className="col-lg-3 col-md-4 col-sm-6"
      >
        <div className="card bg-white mb-4">
          <img
            className="card-img-top"
            src={character.image}
            alt={character.name}
          />
          <div className="card-body">
            <h5 className="card-title">{character.name}</h5>
          </div>
        </div>
      </div>
    );
  }
}
