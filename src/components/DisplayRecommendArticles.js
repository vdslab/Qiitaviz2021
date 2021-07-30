const DisplayRecommendArticles = ({ displayArticle }) => {
  return (
    <div>
      <div>
        {displayArticle.map((item, i) => {
          return (
            <p key={i}>
              <a href={item.url} target="_blank">
                {item.title}
              </a>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayRecommendArticles;