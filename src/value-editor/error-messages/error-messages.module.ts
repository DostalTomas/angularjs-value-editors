import register from '@kpsys/angularjs-register';
import ValueEditorErrorMessagesLocalizationsProvider, {VALUE_EDITOR_ERROR_MESSAGES_DEFAULT_LOCALIZATIONS} from './error-messages-localization.provider';
import ErrorMessagesDirective from './error-messages.directive';

/**
 * @ngdoc module
 * @name angularjs-value-editor.error-messages
 * @module angularjs-value-editor.error-messages
 *
 * @description
 *
 */

export default register('angularjs-value-editor.error-messages')
    .constant('valueEditorErrorMessagesDefaultLocalizations', VALUE_EDITOR_ERROR_MESSAGES_DEFAULT_LOCALIZATIONS)
    .provider(ValueEditorErrorMessagesLocalizationsProvider.providerName, ValueEditorErrorMessagesLocalizationsProvider)
    .directive(ErrorMessagesDirective.directiveName, ErrorMessagesDirective)
    .name();
