import "react-app-polyfill/ie11";
import "url-search-params-polyfill";
// import "nodep-date-input-polyfill";

if (!HTMLFormElement.prototype.reportValidity) {
    HTMLFormElement.prototype.reportValidity = function () {
        if (this.checkValidity()) return true;
        var btn = document.createElement('button');
        this.appendChild(btn);
        btn.click();
        this.removeChild(btn);
        return false;
    };
}

if (!HTMLInputElement.prototype.reportValidity) {
    HTMLInputElement.prototype.reportValidity = function () {
        if (this.checkValidity()) return true
        var tmpForm;
        if (!this.form) {
            tmpForm = document.createElement('form');
            tmpForm.style.display = 'inline';
            this.before(tmpForm);
            tmpForm.append(this);
        }
        var siblings = Array.from(this.form.elements).filter(function (input) {
            return input !== this && !!input.checkValidity && !input.disabled;
        }, this);
        siblings.forEach(function (input) {
            input.disabled = true;
        });
        this.form.reportValidity();
        siblings.forEach(function (input) {
            input.disabled = false;
        });
        if (tmpForm) {
            tmpForm.before(this);
            tmpForm.remove();
        }
        this.focus();
        this.selectionStart = 0;
        return false;
    };
}

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}