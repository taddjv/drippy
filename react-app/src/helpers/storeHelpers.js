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

export const searchConv = (search) => {
  return search
    .split(" ")
    .map((ele) => ele[0].toUpperCase() + ele.split("").slice(1).join(""))
    .join(" ");
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

export const reviewDataCalc = (reviews) => {
  let count = 0;
  let total = 0;

  for (let review in reviews) {
    count++;
    total += reviews[review].stars;
  }
  return { count: count, total: total / count };
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
    case "Alberta":
      tax = 5;
      break;
    case "British Columbia":
      tax = 12;
      break;
    case "Manitoba":
      tax = 12;
      break;
    case "New Brunswick":
      tax = 15;
      break;
    case "Newfoundland and Labrador":
      tax = 15;
      break;
    case "Northwest Territories":
      tax = 5;
      break;
    case "Nova Scotia":
      tax = 15;
      break;
    case "Nunavut":
      tax = 5;
      break;
    case "Ontario":
      tax = 13;
      break;
    case "Prince Edward Island":
      tax = 14.975;
      break;
    case "Quebec":
      tax = 11;
      break;
    case "Saskatchewan":
      tax = 5;
      break;
    case "Yukon":
      tax = 5;
      break;
    default:
      tax = 0;
  }
  let final = price * (tax / 1000);

  return final;
};

export const optionState = (country) => {
  if (country === "United States") {
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
  }
  if (country === "Canada") {
    return (
      <>
        <option value={null}></option>
        <option value="Alberta">Alberta</option>
        <option value="British Columbia">British Columbia</option>
        <option value="Manitoba">Manitoba</option>
        <option value="New Brunswick">New Brunswick</option>
        <option value="Newfoundland and Labrador">
          Newfoundland and Labrador
        </option>
        <option value="Northwest Territories">Northwest Territories</option>
        <option value="Nova Scotia">Nova Scotia</option>
        <option value="Nunavut">Nunavut</option>
        <option value="Ontario">Ontario</option>
        <option value="Prince Edward Island">Prince Edward Island</option>
        <option value="Quebec">Quebec</option>
      </>
    );
  }
};

export const similarShoesCalc = (shoesObj, goodShoe, selectedShoes = []) => {
  const shoes = [];

  // console.log(shoesObj);
  // console.log(goodShoe);
};

export const cardErrors = (number, date, security) => {
  if (number) {
    if (number.length !== 16) {
      return ["Not a valid credit card"];
    }
    if (!["4", "2", "3", "5"].includes(number[0])) {
      return ["Credit card numbers start with 3, 2, 5 or 4"];
    }
  }
  if (date) {
    if (`${date}`.length !== 4) {
      return ["Not a valid date"];
    }
    if (
      Number(`${date}`.slice(0, 2)) < 1 ||
      Number(`${date}`.slice(0, 2)) > 12
    ) {
      return ["Not a valid date"];
    }
    if (Number(`${date}`.slice(2)) < 1 || Number(`${date}`.slice(2)) > 31) {
      return ["Not a valid date"];
    }
  }
  if (security) {
    if (`${security}`.length !== 3) {
      return ["Not a valid CVV"];
    }
    if (security < 1) {
      return ["Not a valid CVV"];
    }
  }
};

export const shippingErrors = (
  name,
  country,
  street,
  city,
  state,
  post,
  phone
) => {
  if (name.includes("*")) {
    return ["Please add a name"];
  }
  if (name.split(" ").length < 2) {
    return ["Not a valid name"];
  }
  if (country.includes("*")) {
    return ["Please add a country"];
  }
  if (street.includes("*")) {
    return ["Please add a street"];
  }
  if (street.split(" ")[0] != Number(street.split(" ")[0])) {
    return ["Not a valid street"];
  }
  if (city.includes("*")) {
    return ["Please add a city"];
  }
  if (state.includes("*")) {
    return ["Please add a state"];
  }
  if (post.includes("*")) {
    return ["Please add a postal code"];
  }
  if (country === "United States") {
    if (post.length !== 5) {
      return ["Not a valid postal code"];
    }
    if (post != Number(post)) {
      return ["Not a valid postal code"];
    }
  }
  if (phone.includes("*")) {
    return ["Please add a phone number"];
  }
  if (phone.length !== 10) {
    return ["Not a valid phone number"];
  }
  if (phone != Number(phone)) {
    return ["Not a valid phone number"];
  }
};
