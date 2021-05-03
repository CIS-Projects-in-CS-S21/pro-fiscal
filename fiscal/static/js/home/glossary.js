/**
 * Function that displays a list of finance terms read from a file.
 * @returns {HTMLDivElement} - Rendered component of a list of glossary terms.
 */
function render_glossary() {
    const getGlossaryData = () => {
        let terms = "";

        fetch("/static/json/glossary.json")
            .then(response => {
                return response.json();
            })
            .then((data) => {
                terms = data;
            })
            .then(() => {
                // Do all the interface stuff here
                handleTerms(terms);
            })
    };

    const createContents = (item) => {
        let elem = document.createElement("div");
        elem.classList.add("glossary-content");

        let definition = document.createElement("p");
        definition.classList.add("padded_paragraph");
        definition.innerText = "Definition: " + item["definition"];

        elem.appendChild(definition);

        return elem;
    }

    const handleTerms = (glossary) => {
        for (let i = 0; i < glossary.length; i++) {
            let glossary_button = document.createElement("button");
            glossary_button.type = "button";
            glossary_button.classList.add("collapsible-term");

            let item = glossary[i];

            glossary_button.innerText = item["term"];

            let contents = createContents(item);

            glossaryDiv.appendChild(glossary_button);
            glossaryDiv.appendChild(contents);

            glossary_button.addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
    }

    let glossaryDiv = document.createElement("div");

    getGlossaryData();

    return glossaryDiv;
}