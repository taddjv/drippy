export const renderStars = (stars, cl) => {
  let finalStars = [];
  for (let i = 0; i < Math.floor(stars); i++) {
    finalStars.push(<i className={`fa fa-star ${cl}`} size="m" />);
  }
  if (stars - Math.floor(stars) >= 0.5 && stars - Math.floor(stars) < 0.75) {
    finalStars.push(<i className={`fa fa-star-half fa fa-star ${cl}`}></i>);
  }
  if (stars - Math.floor(stars) >= 0.75) {
    finalStars.push(<i className={`fa fa-star ${cl}`} size="m" />);
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

export const storeReviewRender = (obj) => {
  const final = [];
  for (let review in obj) {
    final.push(obj[review]);
  }
  return final;
};

export const capFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const renderShoeSize = (Value, func) => {
  const final = [];
  for (let i = 4; i <= 15; i++) {
    final.push(
      <>
        <input
          className="s-r-s-radio-input"
          type="radio"
          name="shoe-radio"
          id={`radio${i}`}
          value={`size ${i}`}
          checked={Value === `size ${i}`}
          onChange={func}
        />

        <label
          className={`s-r-s-radio-label ${
            Value.slice(5) == i ? "s-r-s-radio-label-edit" : null
          }`}
          for={`radio${i}`}
        >
          {i}
        </label>
      </>
    );
    final.push(
      <>
        <input
          className="s-r-s-radio-input"
          type="radio"
          name="shoe-radio"
          id={`radio${i + 0.5}`}
          value={`size ${i + 0.5}`}
          checked={Value === `size ${i + 0.5}`}
          onChange={func}
        />
        <label
          className={`s-r-s-radio-label ${
            Value.slice(5) == i + 0.5 ? "s-r-s-radio-label-edit" : null
          }`}
          for={`radio${i + 0.5}`}
        >
          {i + 0.5}
        </label>
      </>
    );
  }
  return final;
};
