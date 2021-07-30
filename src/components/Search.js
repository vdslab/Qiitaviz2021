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
            style={{ height: "5vh" }}
          />
        </div>
        <div className="control">
          <a className="button is-success" style={{ height: "5vh" }}>
            <i className="fa fa-search"></i>検索
          </a>
        </div>
      </div>
    </div>
  );
}

export default Search;
