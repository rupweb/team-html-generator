// Configuration options for HTMLTidy2
const tidyOptions = {
    doctype: 'html5',
    hideComments: false, // Set to true to strip out comments
    indent: true,
    wrap: 0,
    hideEndTags: false,
    clean: false, // Set to true to perform additional cleaning
    forceOutput: true
};

export { tidyOptions }; // Export to Jest