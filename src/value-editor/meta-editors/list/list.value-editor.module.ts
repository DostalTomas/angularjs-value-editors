import './list.value-editor.less';
import register from '@kpsys/angularjs-register';
import ListValueEditorComponent from './list.value-editor.component';
import ListValueEditorConfigurationServiceProvider, {LIST_VALUE_EDITOR_DEFAULT_OPTIONS} from './list-value-editor-configuration.provider';
import ListValueEditorLocalizationsServiceProvider, {LIST_VALUE_EDITOR_DEFAULT_LOCALIZATIONS} from './list-value-editor-localization.provider';
import ListRequiredValidationComponent from './list-required-validation.component';

/**
 * @ngdoc module
 * @name angularjs-value-editor.list
 * @module angularjs-value-editor.list
 *
 * @description
 *
 */

export default register('angularjs-value-editor.list')
    .constant('listValueEditorDefaultOptions', LIST_VALUE_EDITOR_DEFAULT_OPTIONS)
    .constant('listValueEditorDefaultLocalizations', LIST_VALUE_EDITOR_DEFAULT_LOCALIZATIONS)
    .provider(ListValueEditorConfigurationServiceProvider.providerName, ListValueEditorConfigurationServiceProvider)
    .provider(ListValueEditorLocalizationsServiceProvider.providerName, ListValueEditorLocalizationsServiceProvider)
    .component(ListRequiredValidationComponent.componentName, ListRequiredValidationComponent)
    .component(ListValueEditorComponent.componentName, ListValueEditorComponent)
    .name();