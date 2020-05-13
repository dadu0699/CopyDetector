/* Component initialization */
var principalEditor = CodeMirror.fromTextArea(document.getElementById('principalEditor'), {
    theme: 'dracula',
    mode: "text/x-java",
    lineNumbers: true,
    lineWrapping: false,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true
});

var comparatorEditor = CodeMirror.fromTextArea(document.getElementById('comparatorEditor'), {
    theme: 'dracula',
    mode: "text/x-java",
    lineNumbers: true,
    lineWrapping: false,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true
});

var consoleEditor = CodeMirror.fromTextArea(document.getElementById('consoleEditor'), {
    theme: 'dracula',
    lineWrapping: false,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    readOnly: true
});

/* END -- Component initialization */

/* Upload and read file */
document.getElementById('input-principalFile').addEventListener('change', getPrincipalFile);
document.getElementById('input-secondaryFile').addEventListener('change', getSecondaryFile);

function getPrincipalFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        placeFileContent(
            principalEditor, // Editor
            input.files[0]);
    }
}

function getSecondaryFile(event) {
    const input = event.target
    if ('files' in input && input.files.length > 0) {
        placeFileContent(
            comparatorEditor, // Editor
            input.files[0]);
    }
}

function placeFileContent(target, file) {
    readFileContent(file).then(content => {
        target.getDoc().setValue(content);
    }).catch(error => console.log(error))
}

function readFileContent(file) {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    })
}
/* END -- Upload and read file */

/* AST */
var astData = '<ul><li>Root node <ul><li>Child node 1</li><li>Child node 2</li><li>Child node 3</li><li>Child node 4</li></ul></li></ul>'
document.getElementById('astButton').onclick = function () {
    $('#astDiv').html('');
    $('#astDiv').prepend('<div class="astPanel" id="AST">' + astData + '</div>');
    $('#AST').jstree({
        'core': {
            'themes': {
                'name': 'proton',
                'responsive': true
            }
        },
        "plugins": ["contextmenu"]
    });
};
/* END -- AST */


/*
var treeEditor = CodeMirror.fromTextArea(document.getElementById('treeEditor'), {
    theme: 'dracula',
    lineWrapping: false,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    readOnly: true
});

let treeify = window.jsonTreeify;
let testData = {
    a: 1,
    b: {
        c: "hello world"
    }
};
treeEditor.getDoc().setValue(treeify(testData));
*/
