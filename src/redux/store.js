import {createStore} from 'redux';

//const [profile, setProfile] = useState("Wilona");

//setprofile("Natasha")

const initialState = {
  loadding: false,
};

const reducer = (state = initialState, action) => {
  return state;
};

const store = createStore(reducer);

export default store;
