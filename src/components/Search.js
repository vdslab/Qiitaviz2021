import "bulma/css/bulma.css";

function Search() {
  return (
    <div className="column is-4">
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            type="text"
            name="search"
            placeholder="タグを検索"
          />
        </div>
        <div className="control">
          <a className="button is-success">
            <i className="fa fa-search"></i>検索
          </a>
        </div>
      </div>
    </div>
  );
}

export default Search;
