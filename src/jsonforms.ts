
import 'angular';
import form from './components/form/form';
import capitalize from './components/ng-services/capitalize/capitalize.filter';
import pathResolver from './components/ng-services/pathresolver/pathresolver-service';

require('angular-ui-validate');

export default angular.module('jsonforms', [
    'ui.validate',
    form,
    capitalize,
    pathResolver
]).name;



import IScope = angular.IScope;
export interface IRule {
    effect: RuleEffect;
    condition: ICondition;
}
export enum RuleEffect {
    HIDE = <any>'HIDE',
    SHOW = <any>'SHOW',
    ENABLE = <any>'ENABLE',
    DISABLE = <any>'DISABLE'
}
export interface ICondition {
    type: string; // nice to have
}
export interface ILeafCondition extends ICondition {
    scope: {
        $ref: string;
    };
    expectedValue: any;
}

export interface IWithLabel {
    label?: string | boolean | ILabelObject;
}

export interface ILabelObject {
    text?: string;
    show?: boolean;
}

export interface IUISchemaElement extends IWithLabel {
    type: string;
    rule?: IRule;
}

// Layouts
export interface ILayout extends IUISchemaElement {
    type: string;
    elements: IUISchemaElement[];
}
export interface IVerticalLayout extends ILayout { }
export interface IHorizontalLayout extends ILayout { }
export interface IGroup extends ILayout { }

// Control
export interface IControlObject extends IUISchemaElement {
    scope: {
        $ref: string;
    };
    readOnly?: boolean;
}

// Array
export interface IArrayControlObject extends IControlObject {
    columns?: IColumnControlObject[];
    options?: any;

}

export interface IColumnControlObject extends IControlObject {

}
export interface JsonFormsScope extends IScope {
    data: any;
    schema: any;
    uiSchema: any;
}

export interface SchemaElement{
    type?: string;
    enum?: SchemaElement[]
}

export interface SchemaObject extends SchemaElement{
    //TODO: specify properties
    properties?: any;
    additionalProperties?: any;
    required?: StringArray;
}

export interface SchemaArray extends SchemaElement{
    //TODO: specify items
    items?: any;
}

export interface SchemaString extends SchemaElement {
    format?: string
}

// Array type
export interface StringArray{
    [index: number]: string;
}
export {AbstractControl, ControlRendererTester} from './components/renderers/controls/abstract-control'
export {IPathResolver} from './components/services/pathresolver/jsonforms-pathresolver';