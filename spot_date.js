/**
 * MAHG GoGreen – Educational Version
 * -------------------------------------------------------
 * Author (fork & documentation): Manuel Alejandro Hernández Giuliani
 * Based on original concept by Akshay Saini
 *
 * Purpose:
 * This script programmatically generates Git commits
 * with custom timestamps in the past in order to
 * populate the GitHub contribution graph.
 *
 * ⚠️ Educational / experimental use only.
 */

import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

/**
 * -------------------------------------------------------
 * CONFIGURATION SECTION
 * -------------------------------------------------------
 */

// File that will be modified on each commit.
// Changing its content forces Git to detect a change.
const FILE_PATH = "./data.json";

// How many years in the past we want to start from.
const YEARS_TO_SUBTRACT = 2;

// Small offset to avoid edge cases around "today".
const DAYS_TO_ADD = 1;


/**
 * -------------------------------------------------------
 * FUNCTION: generateCommitDate
 * -------------------------------------------------------
 * Generates a date in the past based on:
 *  - A base year offset
 *  - A random week offset
 *  - A random day offset
 *
 * Parameters:
 *   weekOffset (number): weeks added to base date
 *   dayOffset  (number): days added to base date
 *
 * Returns:
 *   ISO formatted date string
 */
const generateCommitDate = (weekOffset, dayOffset) => {
  return moment()
    .subtract(YEARS_TO_SUBTRACT, "years")
    .add(DAYS_TO_ADD, "days")
    .add(weekOffset, "weeks")
    .add(dayOffset, "days")
    .format();
};


/**
 * -------------------------------------------------------
 * FUNCTION: createCommit
 * -------------------------------------------------------
 * Writes a JSON file with a timestamp and commits it
 * using a custom Git commit date.
 *
 * Parameters:
 *   commitDate (string): ISO formatted date
 *
 * Process:
 *   1. Write date to JSON file
 *   2. Stage file
 *   3. Commit with --date override
 */
const createCommit = (commitDate) => {
  const data = { date: commitDate };

  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(commitDate, { "--date": commitDate });
  });
};


/**
 * -------------------------------------------------------
 * FUNCTION: makeCommits
 * -------------------------------------------------------
 * Recursive function that generates multiple commits.
 *
 * Parameters:
 *   n (number): number of commits to generate
 *
 * Logic:
 *   - If n === 0 → push remaining commits and stop
 *   - Otherwise:
 *       1. Generate random week/day offsets
 *       2. Generate commit date
 *       3. Write + commit
 *       4. Call itself with n - 1
 */
const makeCommits = (n) => {

  // Base condition: stop recursion
  if (n === 0) {
    return simpleGit().push();
  }

  // Random contribution position (GitHub graph layout: 54 weeks × 7 days)
  const randomWeek = random.int(0, 54);
  const randomDay = random.int(0, 6);

  const commitDate = generateCommitDate(randomWeek, randomDay);

  console.log(`Creating commit for: ${commitDate}`);

  const data = { date: commitDate };

  jsonfile.writeFile(FILE_PATH, data, () => {
    simpleGit()
      .add([FILE_PATH])
      .commit(commitDate, { "--date": commitDate }, () => {
        makeCommits(n - 1);
      });
  });
};


/**
 * -------------------------------------------------------
 * SCRIPT ENTRY POINT
 * -------------------------------------------------------
 *
 * Generates between 50 and 250 commits randomly.
 * This affects the density of the contribution graph.
 */

const totalCommits = random.int(50, 250);

console.log(`Starting commit generation: ${totalCommits} commits`);

makeCommits(totalCommits);