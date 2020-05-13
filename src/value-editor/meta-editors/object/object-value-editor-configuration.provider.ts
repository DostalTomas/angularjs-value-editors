import {DefaultOptions} from '../../typings';
import AbstractValueEditorConfigurationProvider, {AbstractValueEditorConfigurationService} from '../../common/abstract-value-editor-configuration.provider';
import {ValueEditorBindings, ValueEditorOptions} from '../../kp-value-editor/kp-value-editor.component';

/**
 * @ngdoc type
 * @name ObjectValueEditorFieldsSettings
 * @module angularjs-value-editor.object
 *
 * @requires ValueEditorBindings
 *
 * @description
 * Definition of {@link objectValueEditor} fields.
 *
 * ```
 *      type ObjectValueEditorFieldsSettings = ValueEditorBindings & {label: string};
 * ```
 */
export type ObjectValueEditorFieldsSettings = ValueEditorBindings & {label: string};

/**
 * @ngdoc type
 * @name ObjectValueEditorLabelsWidth
 * @module angularjs-value-editor.object
 *
 * @description
 * Possible values of width of labels of {@link objectValueEditor}.
 *
 * ```
 *      type ObjectValueEditorLabelsWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
 * ```
 *
 */
export type ObjectValueEditorLabelsWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * @ngdoc type
 * @name ObjectValueEditorOptions
 * @module angularjs-value-editor.object
 *
 * @property {ObjectValueEditorFieldsSettings} fields Definition of editor fields
 * @property {function(ValueEditorBindings): ValueEditorBindings} attributesTransformation Function that transforms ValueEditorBindings.
 * It is useful for situation when You have `name` from backend and You want to have `id` of value editor to be same as `name`.
 *
 * Example:
 * ```
 *      function(attrs) { attrs.editorId = attrs.editorName; return attrs;}
 * ```
 *
 * @property {ObjectValueEditorLabelsWidth} labelsWidth Width of labels of {@link objectValueEditor} in [Bootstrap](https://getbootstrap.com/docs/3.4/css/#grid-options) `col`s.
 *
 * @description
 * Extends {@link type:ValueEditorOptions}
 *
 * Default value: {@link objectValueEditorDefaultOptions}
 */
export interface ObjectValueEditorOptions extends ValueEditorOptions {
    fields?: ObjectValueEditorFieldsSettings[];
    attributesTransformation?: (attributes: ValueEditorBindings) => ValueEditorBindings;
    labelsWidth?: ObjectValueEditorLabelsWidth;
}

/**
 * @ngdoc constant
 * @name objectValueEditorDefaultOptions
 * @module angularjs-value-editor.object
 *
 * @description
 * For description see {@link ObjectValueEditorOptions}
 *
 * ```javascript
 * {
 *      fields: [],
 *      attributesTransformation: undefined,
 *      labelsWidth: 2
 * }
 * ```
 */
export const OBJECT_VALUE_EDITOR_DEFAULT_OPTIONS: DefaultOptions<ObjectValueEditorOptions> = {
    fields: [],
    attributesTransformation: undefined,
    labelsWidth: 2
};

/**
 * @ngdoc provider
 * @name objectValueEditorConfigurationServiceProvider
 * @module angularjs-value-editor.object
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link objectValueEditorDefaultOptions}
 */
export default class ObjectValueEditorConfigurationProvider extends AbstractValueEditorConfigurationProvider<ObjectValueEditorOptions> {
    public static readonly providerName = 'objectValueEditorConfigurationService';

    /*@ngInject*/
    constructor(aliasesServiceProvider, objectValueEditorDefaultOptions: DefaultOptions<ObjectValueEditorOptions>) {
        super(aliasesServiceProvider, objectValueEditorDefaultOptions);
    }
}

/**
 * @ngdoc service
 * @name objectValueEditorConfigurationService
 * @module angularjs-value-editor.object
 *
 * @description
 *
 * See {@link AbstractValueEditorConfigurationProvider}
 *
 * Default options: {@link objectValueEditorDefaultOptions}
 */
export interface ObjectValueEditorConfigurationService extends AbstractValueEditorConfigurationService<ObjectValueEditorOptions> {
}
