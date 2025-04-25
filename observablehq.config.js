// See https://observablehq.com/framework/config for documentation.
export default {
    // The app's title; used in the sidebar and webpage titles.
    title: "Fairness in der Kreditvergabe",

    // The pages and sections in the sidebar. If you don't specify this option,
    // all pages will be listed in alphabetical order. Listing pages explicitly
    // lets you organize them into sections and have unlisted pages.
    pages: [
        {
            name: "Einleitung: Faire Kreditvergabe",
            path: "/index",
        },
        {
            name: "I. Kreditvergabe und Gesamtgewinn",
            path: "/02_vierfelder",
        },
        {
            name: "II. Die Daten verstehen",
            path: "/03_histogram",
        },
        {
            name: "III. Der Datensatz",
            path: "/04_einfuehrung_datensatz",
        },
        {
            name: "IV. Statistische Gütemaße",
            path: "/05_feste_entscheidungsgrenze",
        },
        {
            name: "V. Variable Entscheidungsgrenze",
            path: "/06_variable_entscheidungsgrenze",
        },
        {
            name: "VI. Zwei Personengruppen",
            path: "/07_einfuehrung_datensatz_aufgeteilt",
        },
        {
            name: "VII. Faire Entscheidungsgrenzen!?",
            path: "/08_variable_entscheidungsgrenze_2_populationen",
        },
        {
            name: "Introduction: Fair Credit Granting",
            path: "/en_index",
        },
        {
            name: "I. Credit granting and total profit",
            path: "/en_02_vierfelder",
        },
        {
            name: "II. Understanding the data",
            path: "/en_03_histogram",
        },
        {
            name: "III. The data set",
            path: "/en_04_einfuehrung_datensatz",
        },
        {
            name: "IV. Statistical quality measures",
            path: "/en_05_feste_entscheidungsgrenze",
        },
        {
            name: "V. Variable decision boundary",
            path: "/en_06_variable_entscheidungsgrenze",
        },
        {
            name: "VI. Two populations",
            path: "/en_07_einfuehrung_datensatz_aufgeteilt",
        },
        {
            name: "VII. Fair decision boundaries!?",
            path: "/en_08_variable_entscheidungsgrenze_2_populationen",
        },
    ],

    // Content to add to the head of the page, e.g. for a favicon:
    // head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',

    // The path to the source root.
    root: "src",

    // Some additional configuration options and their defaults:
    theme: "default", // try "light", "dark", "slate", etc.
    // header: "", // what to show in the header (HTML)
    footer: "Copyright © 2024-2025, Sarah Schönbrodt, Steffen Schneider, Thomas Camminady",
    sidebar: true, // whether to show the sidebar
    toc: true, // whether to show the table of contents
    pager: true, // whether to show previous & next links in the footer
    // output: "dist", // path to the output root for build
    search: false, // activate search
    linkify: true, // convert URLs in Markdown to links
    // typographer: false, // smart quotes and other typographic improvements
    // preserveExtension: false, // drop .html from URLs
    // preserveIndex: false, // drop /index from URLs
};
