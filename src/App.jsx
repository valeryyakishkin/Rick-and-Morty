import { Component } from "react";
import { getCharacters, getEpisodes } from "rickmortyapi";
import Preloader from "./components/atoms/Preloader/Preloader";
import CardItem from "./components/molecules/CardItem/CardItem";
import OpenedCard from "./components/molecules/OpenedCard/OpenedCard";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      episodes: [],
      charactersPages: null,
      nextCharactersPage: null,
      nextEpisodesPage: null,
      currentCharacter: null,
      currentCharacterFirstSeen: null,
      showCard: false,
      isLoading: false,
    };
  }

  toggleIsLoading() {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  }

  toggleCard = () => {
    this.setState({
      showCard: !this.state.showCard,
    });
  };

  async getCharacters() {
    let result = await getCharacters()
      .then((response) => {
        this.toggleIsLoading();
        return response.data;
      })
      .then(({ info, results }) => {
        this.setState({
          characters: results,
          nextCharactersPage: info.next,
          charactersPages: info.pages,
        });
        return true;
      });
    if (result) {
      setTimeout(() => this.toggleIsLoading(), 1000);
    }
  }

  async addExtraCharacters(href) {
    if (href) {
      const page = href.split(`/`).pop().split("=").pop();
      await getCharacters({ page: page })
        .then((response) => {
          return response.data;
        })
        .then(({ info, results }) => {
          this.setState({
            characters: this.state.characters.concat(results),
            nextCharactersPage: info.next,
          });
        });
    }
  }

  async getAllEpisodes() {
    await getEpisodes()
      .then((response) => {
        return response.data;
      })
      .then(({ info, results }) => {
        this.setState({
          episodes: results,
          nextEpisodesPage: info.next,
        });
        for (let i = 2; i <= info.pages; i++) {
          getEpisodes({ page: i })
            .then((response) => {
              return response.data;
            })
            .then(({ info, results }) => {
              this.setState({
                episodes: this.state.episodes.concat(results),
                nextEpisodesPage: info.next,
              });
            });
        }
      });
  }

  toggleCharacter = (id) => {
    const currentCharacter = this.state.characters[id - 1];
    const firstEpisode = currentCharacter.episode[0].split("/").pop();
    this.setState({
      currentCharacter: currentCharacter,
      currentCharacterFirstSeen: this.state.episodes[firstEpisode - 1].name,
    });
    this.toggleCard();
  };

  componentDidMount() {
    this.getCharacters();
    this.getAllEpisodes();
  }

  render() {
    const {
      characters,
      currentCharacter,
      currentCharacterFirstSeen,
      showCard,
    } = this.state;
    return this.state.isLoading ? (
      <Preloader />
    ) : !this.state.showCard ? (
      <div className="">
        <div
          onWheel={() => this.addExtraCharacters(this.state.nextCharactersPage)}
          className="container-fluid py-5"
        >
          <div className="container pt-5 pb-3">
            <div className="row justify-content-center">
              {characters.map((character) => {
                return (
                  <CardItem
                    key={character.id}
                    func={this.toggleCharacter}
                    character={character}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <OpenedCard
        func={this.toggleCard}
        currentCharacter={currentCharacter}
        firstEpisode={currentCharacterFirstSeen}
        showCard={showCard}
      />
    );
  }
}
