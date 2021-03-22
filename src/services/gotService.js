

export default class GotService {
  constructor() {
    this._apiBase = "https://anapioficeandfire.com/api";
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  }
  //#region getting characters

  getAllCharacters = async () => {
    const result = await this.getResource(`/characters`);
    return result.map(this._transformCharacter);
  };

  getCharacterById = async (id) => {
    const result = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(result);
  };

  getCharactersByPage = async (page, items) => {
    const result = await this.getResource(`/characters?page=${page}&pageSize=${items}`);
    return result.map(this._transformCharacter);
  };

  //#endregion

  //#region getting books

  getAllBooks = async () => {
    const result = await this.getResource(`/books`);
    return result.map(this._transformBook);
  };

  getBookById = async (id) => {
    const result = await this.getResource(`/books/${id}`);
    return this._transformBook(result);
  };

  getBooksByPage = async (page, items) => {
    const result = await this.getResource(`/books?page=${page}&pageSize=${items}`);
    return result.map(this._transformBook);
  };

  //#endregion

  //#region getting houses

  getAllHouses = async () => {
    const result = await this.getResource(`/houses`);
    return result.map(this._transformHouse);
  };

  getHouseById = async (id) => {
    const result = await this.getResource(`/houses/${id}`);
    return this._transformHouse(result);
  };

  getHousesByPage = async (page, items) => {
    const result = await this.getResource(`/houses?page=${page}&pageSize=${items}`);
    return result.map(this._transformHouse);
  };

  //#endregion

  fulfillData(data) {
    for (let prop in data) {
      if (data[prop] === "") data[prop] = "Unknown";
    }
    return data;
  }

  extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  }

  //#region transforming data
  _transformCharacter = (char) => {
    this.fulfillData(char);
    return {
      id: this.extractId(char),
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    };
  };
  _transformHouse = (house) => {
    this.fulfillData(house);
    return {
      id: this.extractId(house),
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    };
  };
  _transformBook = (book) => {
    this.fulfillData(book);
    return {
      id: this.extractId(book),
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released
    };
  };
  //#endregion
}