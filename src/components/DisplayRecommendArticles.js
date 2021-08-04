const DisplayRecommendArticles = ({ displayArticle }) => {
  return (
    <div>
      <div>
        {displayArticle.map((item, i) => {
          return item.url.map((url, j) => {
            return (
              <p key={j}>
                <a href={url} terget="_blank">
                  {item.title[j]}
                </a>
              </p>
            );
          });
        })}
      </div>
    </div>
  );
};

export default DisplayRecommendArticles;
