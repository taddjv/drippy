export const renderStars = (stars) => {
  let finalStars = [];
  for (let i = 0; i < Math.floor(stars); i++) {
    finalStars.push(<i className="fa fa-star s-c-s-logo " size="m" />);
  }
  if (stars - Math.floor(stars) >= 0.5 && stars - Math.floor(stars) < 0.75) {
    finalStars.push(<i className="fa fa-star-half s-c-s-logo"></i>);
  }
  if (stars - Math.floor(stars) >= 0.75) {
    finalStars.push(<i className="fa fa-star s-c-s-logo " size="m" />);
  }

  return finalStars;
};

export const storeShoesRender = (obj) => {
  const final = [];
  for (let shoe in obj) {
    final.push(obj[shoe]);
  }
  return final;
};
