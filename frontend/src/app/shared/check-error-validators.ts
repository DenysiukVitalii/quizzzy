export class CheckErrorValidators {

    validationMessages = {
        "name": {
            "required": "Required field.",
            "minlength": "The value must be at least 3 characters.",
            "maxlength": "The value must not be more than 20 characters.",
            "pattern": "The value must be only letters and the first letter is large."
        },
        "topic": {
            "required": "Required field.",
            "minlength": "The value must be at least 3 characters.",
            "maxlength": "The value must not be more than 20 characters.",
            "pattern": "The value must be only letters and the first letter is large."
        },
        "selectedDiscipline": {
            "required": "Required field."
        },
        "question": {
            "required": "Required field.",
            "minlength": "The value must be at least 3 characters.",
            "maxlength": "The value must not be more than 20 characters."
        },
        "selectedTheme": {
            "required": "Required field."
        },
        "amount_tasks": {
            "required": "Required field.",
            "min": "Enter more number",
            "max": "Enter less number"
        },
        "timer": {
            "required": "Required field.",
            "min": "Enter more number",
            "max": "Enter less number"
        }
    };

    onValueChange(userForm, formErrors, data?: any) {
        if (!userForm) return;
        let form = userForm;
  
        for (let field in formErrors) {
            formErrors[field] = "";

            let control = form.get(field);
            
            if (control.invalid && (control.touched || control.dirty) ) {
                let message = this.validationMessages[field];
                for (let key in control.errors) {
                    console.log(key);
                    formErrors[field] += message[key] + " ";
                }
            }
        }
    }
}