import axios from "axios";
import { _userContentReactions, _reactions, _usersList } from "./constants";

const urls = {
  reactions: {
    url: "https://artful-iudex.herokuapp.com/reactions",
    fallback: _reactions,
  },
  user_content_reactions: {
    url: "https://artful-iudex.herokuapp.com/user_content_reactions",
    fallback: _userContentReactions,
  },
  users: {
    url: "https://artful-iudex.herokuapp.com/users",
    fallback: _usersList,
  },
};

const get = async ({ endPoint, params="" }) => {
  if (urls[endPoint]) {
    return await axios(`${urls[endPoint].url}?${params}`)
      .then((resp) => resp.data)
      .catch(() => {
        console.log(`falling back for ${endPoint}`);
        return urls[endPoint].fallback;
      });
  }
};


export {get}