/**
 * -------------------------------------------------------
 * MAHG GoGreen – Advanced Edition (CLI Controlled)
 * -------------------------------------------------------
 * Author: Manuel Alejandro Hernández Giuliani
 * Inspired by original concept by Akshay Saini
 *
 * PURPOSE
 * -------------------------------------------------------
 * Programmatically generate Git commits with custom
 * timestamps to populate the GitHub contribution graph.
 *
 * FEATURES
 * -------------------------------------------------------
 * ✔ Async/Await architecture
 * ✔ CLI parameter support
 * ✔ Random commit range (min/max)
 * ✔ Density control (multiple commits per day)
 * ✔ Pattern mode (structured contributions)
 * ✔ Clean separation of responsibilities
 *
 * ⚠️ Educational / experimental use only.
 */

import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();

/**
 * -------------------------------------------------------
 * DEFAULT CONFIGURATION
 * -------------------------------------------------------
 * These values are used if no CLI parameters are provided.
 */
const DEFAULT_CONFIG = {
  filePath: "./data.json",
  yearsBack: 2,
  minCommits: 50,
  maxCommits: 250,
  density: 1,
  patternMode: false
};

/**
 * -------------------------------------------------------
 * CLI ARGUMENT PARSER
 * -------------------------------------------------------
 * Accepts execution parameters:
 *
 * --yearsBack=2
 * --minCommits=50
 * --maxCommits=200
 * --density=3
 * --patternMode=true
 *
 * Example:
 * node spot_date_advanced.js --yearsBack=3 --minCommits=100 --maxCommits=150 --density=2
 */
const parseArguments = () => {

  const config = { ...DEFAULT_CONFIG };

  process.argv.slice(2).forEach(arg => {

    if (arg.startsWith("--yearsBack="))
      config.yearsBack = parseInt(arg.split("=")[1]);

    if (arg.startsWith("--minCommits="))
      config.minCommits = parseInt(arg.split("=")[1]);

    if (arg.startsWith("--maxCommits="))
      config.maxCommits = parseInt(arg.split("=")[1]);

    if (arg.startsWith("--density="))
      config.density = parseInt(arg.split("=")[1]);

    if (arg.startsWith("--patternMode="))
      config.patternMode = arg.split("=")[1] === "true";

  });

  return config;
};

const CONFIG = parseArguments();

/**
 * -------------------------------------------------------
 * DATE GENERATION
 * -------------------------------------------------------
 * Generates a commit date in the past.
 *
 * The GitHub contribution graph roughly spans:
 * - 54 weeks horizontally
 * - 7 days vertically
 *
 * We randomly select:
 * - Week offset (0–54)
 * - Day offset (0–6)
 */
const generateCommitDate = (weekOffset, dayOffset) => {

  return moment()
    .subtract(CONFIG.yearsBack, "years")
    .add(weekOffset, "weeks")
    .add(dayOffset, "days")
    .format();
};

/**
 * -------------------------------------------------------
 * FILE WRITE + GIT COMMIT
 * -------------------------------------------------------
 * Writes a timestamp into a JSON file and commits it
 * using a custom commit date.
 *
 * Why?
 * Git requires file changes to create a commit.
 * Updating a JSON file ensures a diff exists.
 */
const createCommit = async (date) => {

  const data = { date };

  await jsonfile.writeFile(CONFIG.filePath, data);

  await git.add([CONFIG.filePath]);

  await git.commit(date, { "--date": date });
};

/**
 * -------------------------------------------------------
 * RANDOM COMMIT GENERATION MODE
 * -------------------------------------------------------
 * Creates commits randomly distributed across
 * the contribution grid.
 *
 * Uses:
 * - Random week (0–54)
 * - Random day (0–6)
 * - Density multiplier
 */
const generateRandomCommits = async () => {

  const totalCommits =
    CONFIG.minCommits === CONFIG.maxCommits
      ? CONFIG.minCommits
      : random.int(CONFIG.minCommits, CONFIG.maxCommits);

  console.log(`\nGenerating ${totalCommits} random commits...`);

  for (let i = 0; i < totalCommits; i++) {

    const week = random.int(0, 54);
    const day = random.int(0, 6);

    const commitDate = generateCommitDate(week, day);

    for (let d = 0; d < CONFIG.density; d++) {
      await createCommit(commitDate);
    }

    console.log(`✔ Commit ${i + 1}/${totalCommits} → ${commitDate}`);
  }
};

/**
 * -------------------------------------------------------
 * PATTERN MODE
 * -------------------------------------------------------
 * Structured contribution pattern.
 *
 * Current example:
 * - Simple diagonal pattern
 *
 * This can evolve into:
 * - Text-to-grid mapping
 * - Shape rendering
 * - Custom designs
 */
const generatePatternCommits = async () => {

  console.log("\nPattern mode enabled...");

  for (let week = 0; week < 30; week++) {

    const day = week % 7;
    const commitDate = generateCommitDate(week, day);

    for (let d = 0; d < CONFIG.density; d++) {
      await createCommit(commitDate);
    }

    console.log(`✔ Pattern commit → ${commitDate}`);
  }
};

/**
 * -------------------------------------------------------
 * MAIN EXECUTION CONTROLLER
 * -------------------------------------------------------
 */
const run = async () => {

  try {

    console.log("======================================");
    console.log("MAHG GoGreen – Advanced Edition");
    console.log("======================================");
    console.log("Configuration:");
    console.log("Years Back:", CONFIG.yearsBack);
    console.log("Min Commits:", CONFIG.minCommits);
    console.log("Max Commits:", CONFIG.maxCommits);
    console.log("Density:", CONFIG.density);
    console.log("Pattern Mode:", CONFIG.patternMode);
    console.log("======================================");

    if (CONFIG.patternMode) {
      await generatePatternCommits();
    } else {
      await generateRandomCommits();
    }

    await git.push();

    console.log("\n✅ All commits successfully pushed.");

  } catch (error) {

    console.error("\n❌ Execution failed:", error);

  }
};

/**
 * -------------------------------------------------------
 * ENTRY POINT
 * -------------------------------------------------------
 */
run();