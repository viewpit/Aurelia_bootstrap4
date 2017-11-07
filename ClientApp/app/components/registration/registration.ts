import { inject, NewInstance } from 'aurelia-framework';
import { ValidationController, ValidationRules } from 'aurelia-validation';

@inject(NewInstance.of(ValidationController))
export class registration {
    message = '';
    firstName = '';
    lastName = 'Doe';
    email = '';
    noErrorText = '';
    textareaValue = '';

    //controller = null;

    rules = ValidationRules
        .ensure('firstName')
        .required()
        .ensure('lastName')
       .minLength(4)
        .ensure('email')
        .required()
        .withMessage('We need your email')
        .email()
        .ensure('noErrorText')
        .required()
        .ensure('textareaValue').displayName('Some text')
        .required()
        .rules;

    constructor(private controller: ValidationController) {
        this.controller = controller;
        this.controller.addObject(this, this.rules);
    }

    validateModel() {
        this.controller.validate().then( (result) => {
            this.message = (result != null && result.valid) ? 'All is good!' : 'You have errors!';
        }).catch((error) => {
            console.error(error);
        });
    }

    onFocus() {
        console.log('focus');
    }
}