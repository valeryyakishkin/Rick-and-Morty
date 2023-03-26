import { Component } from "react";

export default class OpenedCard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { currentCharacter, firstEpisode } = this.props;
    return (
      <div className="card position-fixed mt-5">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={currentCharacter?.image}
              className="img-fluid rounded-start opacity-75"
              alt={currentCharacter?.name}
            />
          </div>
          <div className="col-md-8 d-flex">
            <div className="card-body">
              <h5 className="card-title text-success">Name:</h5>
              <p className="card-text">{currentCharacter?.name}</p>
              <h5 className="card-title text-success">Gender:</h5>
              <p className="card-text">{currentCharacter?.gender}</p>
              <h5 className="card-title text-success">Status:</h5>
              <p className="card-text">{currentCharacter?.status}</p>
            </div>
            <div className="card-body">
              <h5 className="card-title text-success">Species:</h5>
              <p className="card-text">{currentCharacter?.species}</p>
              <h5 className="card-title text-success">Origin:</h5>
              <p className="card-text">
                {currentCharacter?.origin.name.toString()}
              </p>
              <h5 className="card-title text-success">First seen in:</h5>
              <p className="card-text">{firstEpisode}</p>
            </div>
            <button
              onClick={() => this.props.func()}
              type="button"
              className="btn-close m-3"
            ></button>
          </div>
        </div>
      </div>
    );
  }
}
