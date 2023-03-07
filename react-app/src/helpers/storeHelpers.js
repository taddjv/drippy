export const getShoesUrl = (sort, search, query) => {
  const final = [];

  let url = `/api/shoes/${sort}/search/${search}/`;
  if (query?.price) {
    final.push(`price=${query.price}`);
  }
  if (query?.color) {
    final.push(`color=${query.color}`);
  }
  if (query?.year) {
    final.push(`year=${query.year}`);
  }

  return url + "?" + final.join("&");
};

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

export const dataRender = (obj) => {
  const final = [];

  for (let data in obj) {
    if (Number(data) == data) {
      final.push(obj[data]);
    }
  }
  return final;
};
export const cartData = (cartObj) => {
  let final = { itemCount: 0, total: 0 };

  for (let item in cartObj) {
    if (item == Number(item)) {
      final["itemCount"]++;
      final["total"] += cartObj[item].shoe.price * cartObj[item].quantity;
    }
  }
  return final;
};

export const storeShoesRender = (obj) => {
  const final = [];
  for (let shoe in obj) {
    final.push(obj[shoe]);
  }
  return final;
};
export const storeBrandsRender = (obj) => {
  const final = [];
  for (let brand in obj) {
    final.push(obj[brand]);
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

export const renderBrandSlider = (brands) => {
  const final = [];
  for (let brand in brands) {
    final.push(
      <div className="h-b-slider-brand">
        {" "}
        <img src={brands[brand].url} />
      </div>
    );
    // final.push(brands[brand].url);
  }
  return final;
};

export const capFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const renderShoeSize = (Value, func, className) => {
  const final = [];
  for (let i = 4; i <= 15; i++) {
    final.push(
      <>
        <input
          className={`s-r-s-radio-input`}
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
          } ${className}`}
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
          } ${className}`}
          for={`radio${i + 0.5}`}
        >
          {i + 0.5}
        </label>
      </>
    );
  }
  return final;
};

export const taxCalculator = (price, state) => {
  let tax = null;

  switch (state) {
    case "Alabama":
      tax = 9.22;
      break;
    case "Alaska":
      tax = 1.76;
      break;
    case "Arizona":
      tax = 8.4;
      break;
    case "Arkansas":
      tax = 9.51;
      break;
    case "California":
      tax = 8.68;
      break;
    case "Colorado":
      tax = 7.72;
      break;
    case "Connecticut":
      tax = 6.35;
      break;
    case "Delaware":
      tax = 0.0;
      break;
    case "D.C.":
      tax = 6.0;
      break;
    case "Florida":
      tax = 7.08;
      break;
    case "Georgia":
      tax = 7.32;
      break;
    case "Hawaii":
      tax = 4.44;
      break;
    case "Idaho":
      tax = 6.03;
      break;
    case "Illinois":
      tax = 8.82;
      break;
    case "Indiana":
      tax = 7.0;
      break;
    case "Iowa":
      tax = 6.94;
      break;
    case "Kansas":
      tax = 8.69;
      break;
    case "Kentucky":
      tax = 6.0;
      break;
    case "Louisiana":
      tax = 9.52;
      break;
    case "Maine":
      tax = 5.5;
      break;
    case "Maryland":
      tax = 6.0;
      break;
    case "Massachusetts":
      tax = 6.25;
      break;
    case "Michigan":
      tax = 6.0;
      break;
    case "Minnesota":
      tax = 7.46;
      break;
    case "Mississippi":
      tax = 7.07;
      break;
    case "Missouri":
      tax = 8.25;
      break;
    case "Montana":
      tax = 0.0;
      break;
    case "Nebraska":
      tax = 6.94;
      break;
    case "Nevada":
      tax = 8.23;
      break;
    case "New Hampshire":
      tax = 0.0;
      break;
    case "New Jersey":
      tax = 6.6;
      break;
    case " New Mexico":
      tax = 7.83;
      break;
    case "New York":
      tax = 8.52;
      break;
    case "North Carolina":
      tax = 6.98;
      break;
    case "North Dakota":
      tax = 6.96;
      break;
    case "Ohio":
      tax = 7.23;
      break;
    case "Oklahoma":
      tax = 8.95;
      break;
    case "Oregon":
      tax = 0.0;
      break;
    case "Pennsylvania":
      tax = 6.34;
      break;
    case "Rhode Island":
      tax = 7.0;
      break;
    case "South Carolina":
      tax = 7.46;
      break;
    case "South Dakota":
      tax = 6.4;
      break;
    case "Tennessee":
      tax = 9.55;
      break;
    case "Texas":
      tax = 8.19;
      break;
    case "Utah":
      tax = 7.19;
      break;
    case "Vermont":
      tax = 6.24;
      break;
    case "Virginia":
      tax = 5.73;
      break;
    case "Washington":
      tax = 9.23;
      break;
    case "West Virginia":
      tax = 6.5;
      break;
    case "Wisconsin":
      tax = 5.43;
      break;
    case "Wyoming":
      tax = 5.33;
      break;
    default:
      tax = 0;
  }
  let final = price * (tax / 1000);

  return final;
};

export const optionState = () => {
  return (
    <>
      <option value={null}></option>
      <option value="Alabama">Alabama</option>
      <option value="Alaska">Alaska</option>
      <option value="Arizona">Arizona</option>
      <option value="Arkansas">Arkansas</option>
      <option value="California">California</option>
      <option value="Colorado">Colorado</option>
      <option value="Connecticut">Connecticut</option>
      <option value="Delaware">Delaware</option>
      <option value="D.C.">D.C.</option>
      <option value="Florida">Florida</option>
      <option value="Georgia">Georgia</option>
      <option value="Hawaii">Hawaii</option>
      <option value="Idaho">Idaho</option>
      <option value="Oregon">Oregon</option>
      <option value="Illinois">Illinois</option>
      <option value="Indiana">Indiana</option>
      <option value="Iowa">Iowa</option>
      <option value="Kansas">Kansas</option>
      <option value="Kentucky">Kentucky</option>
      <option value="New York">New York</option>
      <option value="Louisiana">Louisiana</option>
      <option value="New Mexico">New Mexico</option>
      <option value="Maine">Maine</option>
      <option value="New Jersey">New Jersey</option>
      <option value="Maryland">Maryland</option>
      <option value="New Hampshire">New Hampshire</option>
      <option value="Massachusetts">Massachusetts</option>
      <option value="Nevada">Nevada</option>
      <option value="Michigan">Michigan</option>
      <option value="Nebraska">Nebraska</option>
      <option value="Minnesota">Minnesota</option>
      <option value="Montana">Montana</option>
      <option value="Mississippi">Mississippi</option>
      <option value="Missouri">Missouri</option>
      <option value="North Carolina">North Carolina</option>
      <option value="North Dakota">North Dakota</option>
      <option value="Ohio">Ohio</option>
      <option value="Oklahoma">Oklahoma</option>
      <option value="Pennsylvania">Pennsylvania</option>
      <option value="Rhode Island">Rhode IslandRhode Island</option>
      <option value="South Carolina">South Carolina</option>
      <option value="South Dakota">South Dakota</option>
      <option value="Texas">Texas</option>
      <option value="Utah">Utah</option>
      <option value="Vermont">Vermont</option>
      <option value="Virginia">Virginia</option>
      <option value="Washington">Washington</option>
    </>
  );
};
