// See https://observablehq.com/framework/config for documentation.
export default {
  // The app's title; used in the sidebar and webpage titles.
  title: "Fairness im maschinellen Lernen",

  // The pages and sections in the sidebar. If you don't specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {
      name: "English",
      pages: [
        {name: "Introduction", path: "/en_index"},
        {name: "Credit Lending", path: "/en_02_vierfelder"},
        {name: "Histogram", path: "/en_03_histogram"},
        {name: "Dataset", path: "/en_04_einfuehrung_datensatz"},
        {name: "Fixed Decision Boundary", path: "/en_05_feste_entscheidungsgrenze"},
        {name: "Variable Decision Boundary", path: "/en_06_variable_entscheidungsgrenze"},
        {name: "Split Dataset", path: "/en_07_einfuehrung_datensatz_aufgeteilt"},
        {name: "Two Populations", path: "/en_08_variable_entscheidungsgrenze_2_populationen"}
      ]
    },
    {
      name: "Deutsch",
      pages: [
        {name: "Einführung", path: "/index"},
        {name: "Kreditvergabe", path: "/02_vierfelder"},
        {name: "Histogramm", path: "/03_histogram"},
        {name: "Datensatz", path: "/04_einfuehrung_datensatz"},
        {name: "Feste Entscheidungsgrenze", path: "/05_feste_entscheidungsgrenze"},
        {name: "Variable Entscheidungsgrenze", path: "/06_variable_entscheidungsgrenze"},
        {name: "Aufgeteilter Datensatz", path: "/07_einfuehrung_datensatz_aufgeteilt"},
        {name: "Zwei Populationsgruppen", path: "/08_variable_entscheidungsgrenze_2_populationen"}
      ]
    }
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  // head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  theme: "default", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  footer: "Copyright © 2024, Sarah Schönbrodt, Steffen Schneider, Thomas Camminady",
  sidebar: true, // whether to show the sidebar
  toc: true, // whether to show the table of contents
  pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  search: true, // activate search
  linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // preserveExtension: false, // drop .html from URLs
  // preserveIndex: false, // drop /index from URLs
};
