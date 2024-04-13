import moment from "moment";
import emquery from "emquery";
import _ from "lodash";

function mongoUpdate(data = this || {}) {
  const keys = Object.keys(data);

  const now = moment().toISOString();
  const update = {
    set: {}
  };
  update.set.last_modified = now;
  const {
    set
  } = update.set;

  keys.forEach(key => {
    const value = data[key];

    if (_.isArray(value)) {
      update.push = update.push || {};
      update.push[key] = value;
    } else if (_.isPlainObject(value)) {
      const temp = {};
      temp[key] = value;
      const obj = emquery(temp);
      const keys = Object.keys(obj);
      keys.forEach(item => {
        update.set[key] = obj[item];
      });
    } else {
      update.set[key] = value;
    }
  });
  return update;
}

export default mongoUpdate;