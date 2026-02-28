import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const years_substract = 6;
const days_add = 1;

const markCommit = (x, y) => {
  const date = moment()
    .subtract(years_substract, "y")
    .add(days_add, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date, 
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if(n===0) return simpleGit().push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment().subtract(years_substract, "y").add(days_add, "d").add(x, "w").add(y, "d").format();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date },makeCommits.bind(this,--n));
  });
};

makeCommits(random.int(50, 250));
