import type { RGB } from '@tma.js/colors';
import type { IsNever, Not, UnionKeys } from '@tma.js/util-types';

import type { PopupParams } from './popup.js';
import type { AnyHapticFeedbackParams } from './haptic.js';
import type { RequestId } from '../shared.js';
import type { AnyInvokeCustomMethodParams } from './invoke-custom-method.js';

/**
 * Color key which could be used to update header color.
 */
export type HeaderColorKey = 'bg_color' | 'secondary_bg_color';

/**
 * Chat type which could be used when calling `web_app_switch_inline_query` method.
 */
export type SwitchInlineQueryChatType = 'users' | 'bots' | 'groups' | 'channels';

type CreateParams<P = never, SupportCheckKey extends UnionKeys<P> = never> = {
  params: P;
  supportCheckKey: SupportCheckKey;
};

/**
 * Describes list of events and their parameters that could be posted by Bridge.
 * @see https://docs.telegram-mini-apps.com/apps-communication/methods
 */
export interface MethodsParams {
  /**
   * Notifies parent iframe about the current frame is ready. This method is only used in the Web
   * version of Telegram. As a result, Mini App will receive `set_custom_style` event.
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#iframe-ready
   */
  iframe_ready: CreateParams;

  /**
   * Closes Mini App.
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-close
   */
  web_app_close: CreateParams;

  /**
   * Closes a QR scanner. The Telegram application creates `scan_qr_popup_closed` event.
   * @since v6.4
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-close-scan-qr-popup
   */
  web_app_close_scan_qr_popup: CreateParams;

  /**
   * Sends data to the bot. When this method is called, a service message is sent to the bot
   * containing the data of the length up to 4096 bytes. Then, Mini App will be closed.
   *
   * To get more information, take a look at `web_app_data` field in the
   * class [Message](https://core.telegram.org/bots/api#message).
   *
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-data-send
   */
  web_app_data_send: CreateParams<{
    /**
     * Data to send to a bot. Should not have size of more than 4096 bytes.
     */
    data: string;
  }>;

  /**
   * Expands the Mini App.
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-expand
   */
  web_app_expand: CreateParams;

  // TODO: 'getRequestedContact'. https://telegram.org/js/telegram-web-app.js
  /**
   * Invokes custom method.
   * @since v6.9
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-invoke-custom-method
   */
  web_app_invoke_custom_method: CreateParams<AnyInvokeCustomMethodParams>;

  /**
   * Opens an invoice by its specified slug. More information about invoices in
   * this [documentation](https://core.telegram.org/bots/payments).
   * @since v6.1
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-open-invoice
   */
  web_app_open_invoice: CreateParams<{
    /**
     * Invoice unique identifier.
     */
    slug: string;
  }>;

  /**
   * Opens link in the default browser. Mini App will not be closed.
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-open-link
   */
  web_app_open_link: CreateParams<{
    /**
     * URL to be opened by Telegram application. Should be a full path with `https` protocol.
     */
    url: string;

    /**
     * Link will be opened in Instant View mode if possible.
     * @since v6.4
     * @see https://instantview.telegram.org/
     */
    try_instant_view?: boolean;
  }, 'try_instant_view'>;

  /**
   * Opens a new popup. When user closes the popup, Telegram creates the `popup_closed` event.
   * @since v6.2
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-open-popup
   */
  web_app_open_popup: CreateParams<PopupParams>;

  /**
   * Opens a QR scanner. When the scanner was closed, the Telegram application creates
   * the `scan_qr_popup_closed` event. When the scanner reads QR, Telegram creates the
   * `qr_text_received` event.
   * @since v6.4
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-open-scan-qr-popup
   */
  web_app_open_scan_qr_popup: CreateParams<{
    /**
     * Text to be displayed in the QR scanner.
     */
    text?: string;
  }>;

  /**
   * Opens the Telegram link by its pathname and query parameters. The link will be opened in the
   * Telegram app, Mini App will be closed.
   * @since v6.1
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-open-tg-link
   */
  web_app_open_tg_link: CreateParams<{
    /**
     * Should be a value taken from the link of this format: `https://t.me/{path_full}`. Can
     * additionally contain query parameters.
     */
    path_full: string;
  }>;

  /**
   * Reads text from the clipboard. The method accepts a request identifier which is used to
   * appropriately retrieve the method execution result from the `clipboard_text_received` event.
   * @since v6.4
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-read-text-from-clipboard
   */
  web_app_read_text_from_clipboard: CreateParams<{
    /**
     * Unique request identifier. Should be any unique string to handle the generated event
     * appropriately.
     */
    req_id: RequestId;
  }>;

  /**
   * Notifies Telegram about current application is ready to be shown. This method will make
   * Telegram to remove application loader and display Mini App.
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-ready
   */
  web_app_ready: CreateParams;

  // TODO: Check if it is right. It probably requests other user phone.
  /**
   * Requests access to current user's phone.
   * @since v6.9
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-request-phone
   */
  web_app_request_phone: CreateParams;

  /**
   * Requests current theme from Telegram. As a result, Telegram will create `theme_changed` event.
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-request-theme
   */
  web_app_request_theme: CreateParams;

  /**
   * Requests current viewport information from Telegram. As a result, Telegram will create
   * `viewport_changed` event.
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-request-viewport
   */
  web_app_request_viewport: CreateParams;

  /**
   * Requests write message access to current user.
   * @since v6.9
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-rqeuest-write-access
   */
  web_app_request_write_access: CreateParams;

  /**
   * Updates the Mini App background color.
   * @since v6.1
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-set-background-color
   */
  web_app_set_background_color: CreateParams<{
    /**
     * The Mini App background color in `#RRGGBB` format.
     */
    color: RGB;
  }>;

  /**
   * Updates the Mini App header color.
   * @since v6.1
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-set-header-color
   */
  web_app_set_header_color: CreateParams<
    | {
    /**
     * The Mini App header color key.
     */
    color_key: HeaderColorKey
  }
    | {
    /**
     * Color in RGB format.
     * @since v6.9
     */
    color: RGB;
  }, 'color'>;

  /**
   * Updates the Back Button settings.
   * @since v6.1
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-setup-back-button
   */
  web_app_setup_back_button: CreateParams<{
    /**
     * Should the Back Button be visible.
     */
    is_visible: boolean;
  }>;

  /**
   * Updates current closing behavior.
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-setup-closing-behavior
   */
  web_app_setup_closing_behavior: CreateParams<{
    /**
     * Will user be prompted in case, an application is going to be closed.
     */
    need_confirmation: boolean;
  }>;

  /**
   * Updates the Main Button settings.
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-setup-main-button
   */
  web_app_setup_main_button: CreateParams<{
    /**
     * Should the Main Button be displayed.
     */
    is_visible?: boolean;
    /**
     * Should the Main Button be enabled.
     */
    is_active?: boolean;
    /**
     * Should loader inside the Main Button be displayed. Use this property in case, some
     * operation takes time. This loader will make user notified about it.
     */
    is_progress_visible?: boolean;
    /**
     * Text inside the Main Button.
     */
    text?: string;
    /**
     * The Main Button background color in `#RRGGBB` format.
     */
    color?: string;
    /**
     * The Main Button text color in `#RRGGBB` format.
     */
    text_color?: string;
  }>;

  /**
   * Updates current state of Settings Button.
   * @since v6.10
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-setup-settings-button
   */
  web_app_setup_settings_button: CreateParams<{
    /**
     * Should the Settings Button be displayed.
     */
    is_visible: boolean;
  }>;

  /**
   * Inserts the bot's username and the specified inline query in the current chat's input field.
   * Query may be empty, in which case only the bot's username will be inserted. The client prompts
   * the user to choose a specific chat, then opens that chat and inserts the bot's username and
   * the specified inline query in the input field.
   * @since v6.7
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-switch-inline-query
   */
  web_app_switch_inline_query: CreateParams<{
    /**
     * Text which should be inserted in the input after the current bot name. Max length is
     * 256 symbols.
     */
    query: string;
    /**
     * List of chat types which could be chosen to send the message. Could be empty list.
     */
    chat_types: SwitchInlineQueryChatType[];
  }>;

  /**
   * Generates haptic feedback event.
   * @since v6.1
   * @see https://docs.telegram-mini-apps.com/apps-communication/methods#web-app-trigger-haptic-feedback
   */
  web_app_trigger_haptic_feedback: CreateParams<AnyHapticFeedbackParams>;
}

/**
 * Any post-available event name.
 */
export type MethodName = keyof MethodsParams;

/**
 * Returns parameters for specified post-available event.
 */
export type MethodParams<E extends MethodName> = MethodsParams[E]['params'];

/**
 * Returns true in case, method has parameters.
 */
export type MethodHasParams<M extends MethodName> = Not<IsNever<MethodParams<M>>>;

/**
 * Any post-available event name which does not require arguments.
 */
export type EmptyMethodName = {
  [E in MethodName]: IsNever<MethodParams<E>> extends true ? E : never;
}[MethodName];

/**
 * Any post-available event name which require arguments.
 */
export type NonEmptyMethodName = Exclude<MethodName, EmptyMethodName>;

/**
 * Method names which could be used in supportsParam method.
 */
export type HasCheckSupportMethodName = {
  [E in MethodName]: IsNever<MethodsParams[E]['supportCheckKey']> extends true ? never : E;
}[MethodName];

/**
 * Method parameter which can be checked via support method.
 */
export type HasCheckSupportMethodParam<M extends HasCheckSupportMethodName> = MethodsParams[M]['supportCheckKey'];
