/**
 * Print out js as valid html
 *
 * Goal: css - agnostic
 */

import { JsHtml } from "../html/jsHtml.js";

let head = {
  head: {
    children: [
      {
        title: {
          attributes: { data: "Test" },
        },
      },
      {
        link: {
          attributes: {
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css",
            rel: "stylesheet",
            integrity:
              "sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx",
            crossorigin: "anonymous",
          },
        },
      },
      {
        script: {
          attributes: {
            src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js",
            integrity:
              "sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa",
            crossorigin: "anonymous",
          },
        },
      },
    ],
  },
};
let body = {
  body: {
    children: [
      // rows 1 and 2 determined at runtime?
      // point is, two rows worth of data
      {
        div: {
          attributes: {
            class: "container",
          },
          children: [
            {
              div: {
                expand: "data",
                attributes: {
                  class: "card",
                  id: "{{name}}",
                },
                // representations for each of the data objects
                children: [
                  {
                    div: {
                      attributes: {
                        class: "card-body",
                        style: "width: 18rem;",
                      },
                      data: "{{url}}",
                      children: [
                        {
                          h3: {
                            attributes: {
                              class: "card-title",
                            },
                          },
                          button: {
                            attributes: {
                              type: "button",
                              class: "btn btn-pri",
                            },
                            data: "{{ haders?.keys }}",
                          },
                          link: {
                            attributes: {
                              href: "{{url}}",
                            },
                          },
                          span: {
                            data: "Hello World{{ haders?.keys }}",
                          },
                          div: {
                            data: "{{name}}",
                          },
                        },
                      ],
                    },
                  },
                  {
                    div: {
                      data: "{{bobbert.bobsons}}",
                    },
                  },
                  {
                    div: {
                      data: "{{name}}",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};
let html = {
  html: {
    attributes: { lang: "en" },
    children: [head, body],
  },
};
let data = [
  {
    // table and circle rep
    name: "sylestia",
    url: "sylestia.com",
    // circle rep
    png: "link/to/png/or/png/raw/data",
  },
  {
    // only has circle info
    name: "Pixpet.net",
    url: "Pixpet.net",
    bobbert: {
      bobsons: "bert",
    },
  },
  {
    name: "Catalog",
    url: "Catalog.com",
  },
  {
    name: "Explore",
    url: "Explore.net",
  },
  {
    name: "YouTube",
    url: "YouTube.com",
  },
  {
    name: "Pandora",
    url: "Pandora.com",
  },
  {
    name: "Humble Bundle",
    url: "HumbleBundle.com",
  },
  {
    name: "Vudu",
    url: "Vudu.com",
  },
  {
    name: "My Hoopla",
    url: "myhoopla.com",
  },
  {
    name: "Add Shortcut",
    url: "Add Shortcut",
  },
];

var jsHtml = new JsHtml(html, data);
// console.log(jsHtml.getPage());
