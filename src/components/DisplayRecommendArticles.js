const DisplayRecommendArticles = ({ displayArticle }) => {
  return (
    <div>
      <div>
        <p>おすすめの記事</p>
        {displayArticle.map((item, i) => {
          console.log(item);
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
