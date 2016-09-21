interface OverwolfStatic {
    utils: OverwolfUtils;
    profile: OverwolfProfile;
    extensions: OverwolfExtensions;
    games: OverwolfGames;
    media: OverwolfMedia;
    settings: OverwolfSettings;
    streaming: OverwolfStreaming;
    windows: OverwolfWindows;

    version: string;
}

///////
/// overwolf
//////
/** An Overwolf event. */
interface OverwolfEventArgs {
    /** @type {string} A status for the given event - either "success" or "failure". */
    status: string;
}

/** Denotes a listenable that just accepts an empty action. */
interface OverwolfParameterlessListenable {
    addListener(callback:() => void) : void;
}

/** Denotes a generic listenable. This differs from an OverwolfEventDispatcher in that
 its publications do not have a status. */
interface OverwolfListenable<TArgType> {
    addListener(callback:(arg:TArgType) => void) : void;
}

/** Denotes a generic event dispatcher. The type specified in the generic
 constraint is used as the argument type of the resulting listener callback. */
interface OverwolfEventDispatcher<TEventListenerArgs extends OverwolfEventArgs> {
    /**
     * Add a listener to this event.
     * @param {TEventListenerArgs) => void} callback Invoked when the event is called.
     */
    addListener(callback:(args:TEventListenerArgs) => void) : void;
}

///////
/// overwolf.streaming
//////
interface OverwolfStreaming {
    start(settings:StreamSettings, callback:(args:StartStreamEventArgs) => void) : void;
}

interface StreamSettings {
    provider: StreamingProvider;
    settings: StreamParams;
}

interface StreamParams {
    stream_info: StreamInfo;
    auth: StreamAuthParams;
    video: StreamVideoOptions;
    audio: StreamAudioOptions;
    peripherals: StreamPeripheralsCaptureOptions;
    ingest_server: StreamIngestServer;
}

interface StreamInfo {
    url: string;
    title: string;
}

interface StreamAuthParams {
    client_id: string;
    token: string;
}

interface StreamVideoOptions {
    auto_calc_kbps: boolean;
    fps: number;
    width: number;
    height: number;
    max_kbps: number;
    encoder: StreamingVideoEncoderSettings;
    capture_desktop: StreamDesktopCaptureOptions;
}

interface StreamDesktopCaptureOptions {
    enable: boolean;
    monitor_id: number;
    force_capture: boolean;
}

interface StreamingVideoEncoderSettings {
    encoder: StreamEncoder;
    config: any;
}

interface StreamingVideoEncoderNVIDIA_NVECSettings {
    preset: StreamEncoderPreset_NVIDIA;
    rate_control: StreamEncoderRateControl_NVIDIA;
    keyframe_interval: number;
}

declare enum StreamEncoderPreset_NVIDIA {
    AUTOMATIC,
    DEFAULT,
    HIGH_QUALITY,
    HIGH_PERFORMANCE,
    BLURAY_DISK,
    LOW_LATENCY,
    HIGH_PERFORMANCE_LOW_LATENCY,
    HIGH_QUALITY_LOW_LATENCY,
    LOSSLESS,
    HIGH_PERFORMANCE_LOSSLESS
}

declare enum StreamEncoderRateControl_NVIDIA {
    RC_CBR,
    RC_CQP,
    RC_VBR,
    RC_VBR_MINQP,
    RC_2_PASS_QUALITY
}

interface StreamingVideoEncoderIntelSettings {
    // Unknown? Docs are empty.
    // http://developers.overwolf.com/api?id=StreamingVideoEncoderIntelSettings
}

interface StreamingVideoEncoderx264Settings {
    keyframe_interval: number;
    rate_control: StreamEncoderRateControl_x264;
    preset: StreamEncoderPreset_x264;
}

declare enum StreamEncoderPreset_x264 {
    ULTRAFAST,
    SUPERFAST,
    VERYFAST,
    FAST,
    MEDIUM,
    SLOW,
    SLOWER,
    VERYSLOW,
    PLACEBO
}

declare enum StreamEncoderRateControl_x264 {
    RC_CBR,
    RC_CQP,
    RC_VBR,
    RC_VBR_MINQP,
    RC_2_PASS_QUALITY
}

declare enum StreamEncoder {
    INTEL,
    X264,
    NVIDIA_NVEC
}

declare enum StreamingProvider {
    Twitch
}

interface StreamAudioOptions {
    mic: StreamDeviceVolume;
    game: StreamDeviceVolume;
}

interface StreamDeviceVolume {
    enable: boolean;
    volume: number;
    device_id: string;
}

interface StreamPeripheralsCaptureOptions {
    capture_mouse_cursor: StreamMouseCursor;
}

declare enum StreamMouseCursor {
    both,
    gameOnly,
    desktopOnly
}

interface StreamIngestServer {
    name: string;
    template_url: string;
}


interface StartStreamEventArgs extends OverwolfEventArgs {
    stream_id?: number;
    error?: string;
}

///////
/// overwolf.windows
//////
interface OverwolfWindows {
    /**
     * Calls the given function with the current window object as a parameter.
     * @param {ODKWindow) => void} callback A callback function which will be called with the current window object as a parameter.
     */
    getCurrentWindow(callback:(window:ODKWindow) => void): void;
    /**
     * Creates or returns a window by the window name that was declared in the manifest.
     * @param {string}        windowName The name of the window that was declared in the data.windows section in the manifest.
     * @param {ODKWindow) => void}        callback A callback function which will be called with the requested window as a parameter.
     */
    obtainDeclaredWindow(windowName:string, callback:(WindowResultData) => void) : void;
    /**
     * Start dragging a window.
     * @param {string} windowId The ID of the window to drag.
     */
    dragMove(windowId:string) : void;
    /**
     * Start resizing the window from a specific edge or corner.
     * @param {string}         windowId The ID of the window to resize.
     * @param {WindowDragEdge} edge     The edge or corner from which to resize the window.
     */
    dragResize(windowId:string, edge:WindowDragEdge) : void;
    /**
     * Change the window size to the new width and height in pixels.
     * @param {string} windowId the ID of the window to change size.
     * @param {number} width    The new window width in pixels
     * @param {number} height   The new window height in pixels
     * @param {()  =>       void} callback A callback which is called when the size change is completed.
     */
    changeSize(windowId:string, width:number, height:number, callback?:() => void) : void;
    /**
     * Change the window position in pixels from the top left corner.
     * @param {string} windowId the ID of the window to change size.
     * @param {number} width    The new window position on the X axis.
     * @param {number} height   The new window position on the Y Axis.
     * @param {()  =>       void} callback A callback which is called when the position change is completed.
     */
    changePosition(windowId:string, left:number, top:number, callback?:() => void) : void;
    /**
     * Closes the window.
     * @param {string} windowId The ID of the window to close.
     * @param {()  =>       void}        callback Called after the window is closed.
     */
    close(windowId:string, callback?:() => void) : void;
    /**
     * Minimizes the window.
     * @param {string} windowId The ID of the window to minimize.
     * @param {()  =>       void}        callback Called after the window is minimized.
     */
    minimize(windowId:string, callback?:() => void) : void;
    /**
     * Maximizes the window.
     * @param {string} windowId The ID of the window to maximize.
     * @param {()  =>       void}        callback Called after the window is maximized.
     */
    maximize(windowId:string, callback?:() => void) : void;
    /**
     * Restores the window.
     * @param {string} windowId The ID of the window to restore.
     * @param {()  =>       void}        callback Called after the window is restored.
     */
    restore(windowId:string, callback?:() => void) : void;

    /**
     * Fired when the main window is restored.
     * @event
     * @since 0.85.0
     */
    onMainWindowRestored : OverwolfListenable<void>; // TODO
    /**
     * Fired when the state of a window is changed.     *
     * @event
     * @since 0.85.0
     */
    onStateChanged : OverwolfListenable<WindowStateChangeData>;

}

declare enum WindowDragEdge {
    None,
    Left,
    Right,
    Top,
    Bottom,
    TopLeft,
    TopRight,
    BottomLeft,
    BottomRight
}

interface WindowResultData {
    /** success if data is received */
    status: string;
    window: ODKWindow;
}

interface WindowStateChangeData {
    windowId: string;
    /** can be "closed", "opened", "minimized".*/
    window_state: string;
    /** can be "closed", "opened", "minimized".*/
    previous_window_state: string;
}

/** @interface ODKWindow*/
interface ODKWindow {
    /** @lends {ODKWindow} */
    /**@property*/
    id: string;
    /**Gets the window name as declared in the manifest.
     * @type {string}*/
    name: string;
    /** in pixels*/
    width: number;
    /** in pixels*/
    height: number;
    /**Gets the window Y coordinate in pixels from the top of the screen.*/
    top: number;
    /**Gets the window X coordinate in pixels from the top of the screen.*/
    left: number;
    /**Indicates if the window is currently visible or minimized.*/
    isVisible: boolean;
}

///////
/// overwolf.settings
//////
interface OverwolfSettings {
    /**
     * Returns the hotkey assigned to a givenf eature id by calling the callback.
     * @param {string}                 featureId The feature id for which to get the set hotkey.
     * @param {GetHotkeyEventArgs) => void} callback A function called with the result of the request which contains the hotkey if success.
     */
    getHotKey(featureId:string, callback:(args:GetHotkeyEventArgs) => void) : void;

    /**
     * Registers a callback for a given hotkey action. If the registration has failed, the callback is invoked immediately with the "error" status. Otherwise, the callback will be invoked each time the Hotkey is pressed.
     * @param {string}                 actionId The action to be hotkeyed.
     * @param {HotkeyRegistrationEvent) =>        void}        callback The callback to be invoked upon success or failure.
     */
    registerHotKey(featureId:string, callback:(args:HotkeyRegistrationEvent) => void) : void;
}

interface GetHotkeyEventArgs extends OverwolfEventArgs {
    hotkey: string;
}

interface HotkeyRegistrationEvent extends OverwolfEventArgs {
    error?: string;
}

///////
/// overwolf.media
///////
interface OverwolfMedia {
    /**
     * Takes a screenshot and calls the callback with the success status and screenshot Url.
     * @param {ScreenshotEventArgs) => void} callback A function called after the screenshot was taken.
     */
    takeScreenshot(callback:(args:ScreenshotEventArgs) => void) : void;

    /**
     * Opens the social network sharing console to allow the user to share a picture.
     * @param {string} imageUrl    The url of the image to share.
     * @param {string} description A description of the image.
     * @param {() => void}        callback An optional callback to invoke after sharing the image.
     */
    shareImage(imageUrl:string, description:string, callback?:() => void) : void;

    /**
     * Opens the social network sharing console to allow the user to share a picture.
     * @param {any}    image       The image object to be shared.
     * @param {string} description A description of the image.
     * @param {() => void}        callback An otpional callback to invoke after sharing the image.
     */
    shareImage(image:any, description:string, callback?:() => void) : void;

    /** @type {OverwolfParameterlessListenable} Fired when a screenshot was taken. */
    onScreenshotTaken : OverwolfParameterlessListenable;
}

interface ScreenshotEventArgs extends OverwolfEventArgs {
    url: string;
}

///////
/// overwolf.games
///////
interface OverwolfGames {
    /**
     * Returns an object with information about the currently running game, or null if no game is running.
     * @param {GameInfo) => void} callback Called with the currently running or active game info
     */
    getRunningGameInfo(callback:(information:GameInfo) => void) : void;

    /** Fired when the game ifno is updated, including game name, game running, game terminated, game changing focus, etc.
     * @event
     * @type {OverwolfListenable<GameInfoChangeEvent>} */
    onGameInfoUpdated : OverwolfListenable<GameInfoChangeData>;
    /** Fired when a game is launched.
     * @event
     * @type {OverworfListenable} */
    onGameLaunched : OverwolfParameterlessListenable;

    /** Fired when the rendering frame rate of the currently injected game changes dramatically.
     * @event
     * @type {OverwolfListenable<FramerateChange>} */
    onMajorFrameRateChange: OverwolfListenable<FramerateChange>;

    // TODO: inputTracking
}

interface FramerateChange {
    fps_status: string;
    fps: number;
}

interface GameInfoChangeData {
    gameInfo: GameInfo;
    resolutionChanged: boolean;
    focusChanged: boolean;
    runningChanged: boolean;
    gameChanged: boolean;
}

interface GameInfo {
    isInFocus: boolean;
    isRunning: boolean;
    allowsVideoCapture: boolean;
    title: string;
    id: number;
    width: number;
    height: number;
    renderers: string[];
}

///////
/// overwolf.extensions
///////
interface OverwolfExtensions {
    /**
     * Launch an extension by its unique id
     * @param {string} uid       The extension unique id
     * @param {any}    parameter A parameter to pass to the extension. The extension may or may not use this parameter.
     */
    launch(uid:string, parameter?:any) : void;

    /**
     * Retrieve a service obejct (which will usually provide external APIs) by an id.
     * @param {string} id       The service id.
     * @param {void}   callback A function called with the service, fi found, and a status indicating success or failure.
     */
    getService<TServiceType>(id:string, callback:(args:LocateServiceEvent<TServiceType>) => void) : void;

    /**
     * Returns an object with functions providing more information and utilities regarding the current extension.
     * @type {any}
     */
    current: any;
}

interface LocateServiceEvent<TServiceType> extends OverwolfEventArgs {
    /** @type {any} The located service. */
    service: TServiceType;
}

///////
/// overwolf.profile
//////
interface OverwolfProfile {
    /**
     * Get the current user.
     * @param {any) => void} callback A callback to invoke with the current user or an error.
     */
    getCurrentUser(callback:(user:any) => void) : void;

    /** Open the login dialog. */
    openLoginDialog() : void;

    /**
     * Fired when a user logged in or logged out.
     */
    onLoginStateChanged : OverwolfEventDispatcher<LoginStateChangedEvent>;
}

interface LoginStateChangedEvent extends OverwolfEventArgs {
    /** @type {string} The state of the connection - "Online", "Offline" or "Connecting" */
    connectionState: string;
    /** @type {string} The username of the logged in user if the status is not "Offline". */
    username?: string;
}

///////
/// overwolf.utils
//////
interface OverwolfUtils {
    /**
     * Place the given data on the clipboard.
     * Requires the Clipboard permission.
     * @param {string} data The data to place on the clipboard.
     */
    placeOnClipboard(data:string) : void;
    /**
     * Returns the data currently on the clipboard.
     * Requires the Clipboard permission.
     * @param {string) => void} callback Invoked with the data on the clipboard.
     */
    getFromClipboard(callback:(data:string) => void) : void;

    // TODO: Monitor interface
    /**
     * Get the list of monitors active. Requires the DesktopStreaming permission.
     * @param {Array<any>) => void} callback An array of monitors.
     */
    getMonitorsList(callback:(monitors:Array<any>) => void): void;

    /**
     * Send a key stroke to the game. Requires the GameControl permission.
     * @param {string} keyString The keystroke to send.
     */
    sendKeyStroke(keyString:string) : void;
}

declare var overwolf:OverwolfStatic;
