import { customAttribute, inject } from 'aurelia-framework';

@customAttribute('blur-on-enter')
@inject(Element)
export class BlurOnEnter {

    constructor(private element) {
        this.element = element;
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    attached() {
        this.element.addEventListener('keyup', this.handleKeyUp);
    }

    detached() {
        this.element.removeEventListener('keyup', this.handleKeyUp);
    }

    handleKeyUp(e) {
        if (e.keyCode === 13) {
            this.element.blur();
        }
    }
}