/**
 * -------------------------------------------------------
 * MAHG GoGreen – Advanced Edition
 * -------------------------------------------------------
 * Author: Manuel Alejandro Hernández Giuliani
 * Based on original concept inspired by Akshay Saini
 *
 * Purpose:
 * Programmatically generate Git commits with custom
 * timestamps to populate the GitHub contribution graph.
 *
 * ⚠️ Educational / experimental use only.
 *
 * Improvements in this version:
 * - Async/Await
 * - CLI arguments
 * - Density control
 * - Pattern-ready architecture
 * - Clean separation of concerns
 * - Improved logging
 */

import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

// -------------------------------------------------------
// CONFIGURATION DEFAULTS
// -------------------------------------------------------

const DEFAULT_CONFIG = {
  filePath: "./data.json",
  yearsBack: 2,
  dayOffset: 1,
  minCommits: 50,
  maxCommits: 250,
  density: 1, // commits per selected day
  patternMode: false
};

// -------------------------------------------------------
// CLI ARGUMENT PARSER
// Example:
// node index.js --years=3 --commits=120 --density=3
// -------------------------------------------------------

const parseArgs = () => {
  const args = process.argv.slice(2);
  const config = { ...DEFAULT_CONFIG };

  args.forEach(arg => {
    if (arg.startsWith("--years="))
      config.yearsBack = parseInt(arg.split("=")[1]);
    if (arg.startsWith("--commits="))
      config.minCommits = config.maxCommits = parseInt(arg.split("=")[1]);
    if (arg.startsWith("--density="))
      config.density = parseInt(arg.split("=")[1]);
    if (arg === "--pattern")
      config.patternMode = true;
  });

  return config;
};

const CONFIG = parseArgs();
const git = simpleGit();

// -------------------------------------------------------
// DATE GENERATION
// -------------------------------------------------------

const generateCommitDate = (weekOffset, dayOffset) => {
  return moment()
    .subtract(CONFIG.yearsBack, "years")
    .add(CONFIG.dayOffset, "days")
    .add(weekOffset, "weeks")
    .add(dayOffset, "days")
    .format();
};

// -------------------------------------------------------
// FILE WRITE + COMMIT
// -------------------------------------------------------

const createCommit = async (date) => {
  const data = { date };

  await jsonfile.writeFile(CONFIG.filePath, data);

  await git.add([CONFIG.filePath]);

  await git.commit(date, { "--date": date });
};

// -------------------------------------------------------
// RANDOM MODE (Default)
// -------------------------------------------------------

const generateRandomCommits = async (totalCommits) => {

  console.log(`\nGenerating ${totalCommits} commits...`);

  for (let i = 0; i < totalCommits; i++) {

    const randomWeek = random.int(0, 54);
    const randomDay = random.int(0, 6);

    const commitDate = generateCommitDate(randomWeek, randomDay);

    for (let d = 0; d < CONFIG.density; d++) {
      await createCommit(commitDate);
    }

    console.log(`✔ Commit ${i + 1}/${totalCommits} → ${commitDate}`);
  }
};

// -------------------------------------------------------
// PATTERN MODE (Example: simple diagonal)
// This can later evolve into string-to-grid mapping
// -------------------------------------------------------

const generatePatternCommits = async () => {

  console.log("\nPattern mode enabled (Diagonal demo pattern)");

  for (let week = 0; week < 20; week++) {
    const day = week % 7;
    const commitDate = generateCommitDate(week, day);

    for (let d = 0; d < CONFIG.density; d++) {
      await createCommit(commitDate);
    }

    console.log(`✔ Pattern commit → ${commitDate}`);
  }
};

// -------------------------------------------------------
// MAIN EXECUTION FLOW
// -------------------------------------------------------

const run = async () => {

  try {

    const totalCommits =
      CONFIG.minCommits === CONFIG.maxCommits
        ? CONFIG.minCommits
        : random.int(CONFIG.minCommits, CONFIG.maxCommits);

    console.log("=====================================");
    console.log("MAHG GoGreen – Advanced Edition");
    console.log("=====================================");
    console.log("Years back:", CONFIG.yearsBack);
    console.log("Density:", CONFIG.density);
    console.log("Pattern mode:", CONFIG.patternMode);
    console.log("=====================================");

    if (CONFIG.patternMode) {
      await generatePatternCommits();
    } else {
      await generateRandomCommits(totalCommits);
    }

    await git.push();

    console.log("\n✅ All commits pushed successfully.");

  } catch (error) {
    console.error("\n❌ Error occurred:", error);
  }
};

// -------------------------------------------------------
// ENTRY POINT
// -------------------------------------------------------

run();