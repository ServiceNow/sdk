import ghpages from "gh-pages";

console.log("Deploying to GitHub Pages...");

ghpages.publish(
  "dist",
  {
    branch: "gh-pages",
    nojekyll: true,
  },
  () => {
    console.log("Deploy Complete!");
    process.exit(0);
  }
);
