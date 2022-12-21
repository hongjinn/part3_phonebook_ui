const Search = ({ search_term, set_search_term }) => {
  return (
    <>
      <input
        style={{margin: '5px'}}
        value={search_term}
        onChange={(e) => set_search_term(e.target.value)}
      />

      <button
        onClick={() => set_search_term('')}
      >
        Clear
      </button>
    </>
  )
}

export default Search