/* Global variables */
var astData = '<ul><li>Root node <ul><li>Child node 1</li><li>Child node 2</li><li>Child node 3</li><li>Child node 4</li></ul></li></ul>';
var fileContent;
var errorList;
/* END -- Global variables */



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
}
/* END -- AST */



/* Download files */
document.getElementById('saveFile').onclick = function () {
    var data = principalEditor.getDoc().getValue();
    writeContent(data, 'mainFile.java', 'text/java');
}

document.getElementById('saveFileCompare').onclick = function () {
    var data = comparatorEditor.getDoc().getValue();
    writeContent(data, 'comparedFile.java', 'text/java');
}

document.getElementById('errorReport').onclick = function () {
    generateErrorReport();
}
/* END -- Download files */



/* Create download file */
function writeContent(content, fileName, contentType) {
    var a = document.createElement('a');
    var file = new Blob([content], {
        type: contentType
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
};
/* END -- Create download file */


/* HTML report structure */
function header() {
    fileContent = '';
    fileContent += '<!doctype html>';
    fileContent += '<html lang=\"es\">';
    fileContent += '<head>';
    fileContent += '<meta charset=\"utf - 8\">';
    fileContent += '<meta name=\"viewport\" content=\"width = device - width, initial - scale = 1, shrink - to - fit = no\">';
    fileContent += '<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css\">';
    fileContent += '<link rel=\"stylesheet\" href=\"https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css\">';
}

function footer() {
    fileContent += '<script src=\"https://code.jquery.com/jquery-3.3.1.js\"></script>';
    fileContent += '<script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js\"></script>';
    fileContent += '<script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js\"></script>';
    fileContent += '<script src=\"https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js\"></script>';
    fileContent += '<script src=\"https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js\"></script>';
    fileContent += '<script> $(document).ready(function () {$(\'#example\').DataTable();});</script>';
    fileContent += '</body>';
    fileContent += '</html>';
}

function generateErrorReport() {
    header();
    fileContent += '<title>Errors</title>';
    fileContent += '</head>';
    fileContent += '<body>';
    fileContent += '<div class=\"container\"><br>';
    fileContent += '<h1>List of Errors</h1><hr>';
    fileContent += '<table id=\"example\" class=\"table table - striped table - bordered\" style=\"width: 100 % \">';
    fileContent += '<thead><tr><th>#</th><th>Type</th><th>Description</th><th>Row</th><th>Column</th></tr></thead>';
    fileContent += '<tbody>';

    fileContent += '</tbody>';
    fileContent += '</table>';
    fileContent += '</div>';
    footer();
    writeContent(fileContent, 'errorList.html', 'text/html');
}
/* END -- HTML report structure */


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
