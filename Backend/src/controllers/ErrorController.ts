import { Error } from '../models/Error';

export class ErrorController {
    private errors: any;
    private errorList: Array<Error>;

    constructor(errors: any) {
        this.errors = errors;
        this.errorList = [];

        this.updateList();
    }

    public updateList(): void {
        this.errors['error'].forEach((element: any) => {
            this.errorList.push(new Error(element['idError'], element['type'],
                element['row'], element['column'], element['description']));
        });
    }

    public getErrorList(): string {
        let errorListData: string = '';

        this.errorList.forEach(element => {
            errorListData += '<tr>';
            errorListData += '<th>' + element.getIDError() + '</th>';
            errorListData += '<th>' + element.getType() + '</th>';
            errorListData += '<th>' + element.getDescription() + '</th>';
            errorListData += '<th>' + element.getRow() + '</th>';
            errorListData += '<th>' + element.getColumn() + '</th>';
            errorListData += '</tr>';
        });
        return errorListData;
    }
};
