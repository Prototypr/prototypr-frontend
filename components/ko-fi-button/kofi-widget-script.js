const kofiWidgetOverlayConfig = {
    "floating-chat.core.pageId": "",
    "floating-chat.core.closer": '<svg height="20px" width="15px"><line x1="2" y1="8" x2="13" y2="18" style="stroke:#000; stroke-width:3" /><line x1="13" y1="8" x2="2" y2="18" style="stroke:#000; stroke-width:3" /></svg>',
    "floating-chat.core.position.bottom-left": "position: fixed; bottom: 50px; left: 10px; width: 160px; height: 65px;",
    "floating-chat.cssId": "",
    "floating-chat.notice.text": "ko-fi.com/%HANDLE%",
    "floating-chat.donatebutton.image": "https://storage.ko-fi.com/cdn/cup-border.png",
    "floating-chat.donateButton.background-color": "#00b9fe",
    "floating-chat.donateButton.text": "Support me",
    "floating-chat.donateButton.text-color": "#fff",
    "floating-chat.stylesheets": '["https://fonts.googleapis.com/css?family=Nunito:400,700,800&display=swap"]',
};
var kofiWidgetOverlayFloatingChatBuilder =
    kofiWidgetOverlayFloatingChatBuilder ||
    function (config, _utils) {
        const _configManager = _utils.getConfigManager(config);
        const _myType = "floating-chat";
        const _topContainerWrapClass = "floatingchat-container-wrap";
        const _topMobiContainerWrapClass = "floatingchat-container-wrap-mobi";
        var widgetPageLoadInitiatedStates = [];
        var closeButtonActionBlocked = false;
        function getButtonId() {
            return `${_configManager.getValue(_myType, "cssId")}-donate-button`;
        }
        function getContainerFrameId() {
            return "kofi-wo-container" + _configManager.getValue(_myType, "cssId");
        }
        function getMobiContainerFrameId() {
            return "kofi-wo-container-mobi" + _configManager.getValue(_myType, "cssId");
        }
        function getButtonImageId() {
            return `${_configManager.getValue(_myType, "cssId")}-donate-button-image`;
        }
        function createButtonContainerIframe(iframeId, mainStyleSheetFile) {
            var htmlBody = getHtml();
            var buttonBody = "<html>" + "<head>" + `<link href="${mainStyleSheetFile}" rel="stylesheet" type="text/css" />` + `</head>` + `<body style="margin: 0; position: absolute; bottom: 0;">${htmlBody}</body>` + "</html>";
            var iframeContainerElement = document.getElementById(iframeId).contentDocument;
            var iframe = document.getElementById(iframeId);
            var _timer = setInterval(function () {
                var doc = iframe.contentDocument || iframe.contentWindow;
                if (doc && doc.readyState == "complete") {
                    clearInterval(_timer);
                    var parentWrapper = document.getElementsByClassName(_topContainerWrapClass)[0];
                    var mobiParentWrapper = document.getElementsByClassName(_topMobiContainerWrapClass)[0];
                    parentWrapper.style = "z-index:10000;";
                    mobiParentWrapper.style = "z-index:10000;";
                    iframe.style = "";
                }
            }, 300);
            iframeContainerElement.write(buttonBody);
            iframeContainerElement.close();
            return iframeContainerElement;
        }
        function attachDonateButton(iframeContainerElement, iframeId, selectors, heightLimits) {
            const donateButton = iframeContainerElement.getElementById(`${getButtonId()}`);
            donateButton.addEventListener("click", function () {
                if (donateButton.classList.contains("closed")) {
                    activateKofiIframe(iframeId, selectors, heightLimits);
                } else if (!closeButtonActionBlocked) {
                    var popupId = _configManager.getValue(_myType, "cssId") + `-${selectors.popupId}`;
                    var popup = document.getElementById(popupId);
                    closePopup(popup, donateButton);
                }
            });
            return donateButton;
        }
        var write = function (parentElementId) {
            var docHead = document.head;
            if (!docHead) {
                docHead = document.createElement("head");
                document.prepend(docHead);
            }
            var iframeId = getContainerFrameId();
            var mobiIframeId = getMobiContainerFrameId();
            var iframeHtml =
                `<div class="${_topContainerWrapClass}" style="height: 0px; transition: all 0.3s ease 0s; opacity:0;">` +
                `<iframe class="floatingchat-container" style="height: 0px; transition: all 0.3s ease 0s; opacity:0;" id="${iframeId}"></iframe>` +
                "</div>" +
                `<div class="${_topMobiContainerWrapClass}" style="height: 0px; transition: all 0.3s ease 0s; opacity:0;">` +
                `<iframe class="floatingchat-container-mobi" style="height: 0px; transition: all 0.3s ease 0s; opacity:0;" id="${mobiIframeId}"></iframe>` +
                "</div>";
            var existingPlaceHolder = document.getElementById(parentElementId);
            existingPlaceHolder.innerHTML = iframeHtml;
            var iframeContainerElement = createButtonContainerIframe(iframeId, "https://storage.ko-fi.com/cdn/scripts/floating-chat-main.css");
            var mobiIframeContainerElement = createButtonContainerIframe(mobiIframeId, "https://storage.ko-fi.com/cdn/scripts/floating-chat-main.css");
            _utils.loadStyleSheet("https://storage.ko-fi.com/cdn/scripts/floating-chat-wrapper.css", document);
            var styleSheetsValue = _configManager.getValue(_myType, "stylesheets");
            if ("" !== styleSheetsValue) {
                styleSheets = JSON.parse(styleSheetsValue);
                styleSheets.forEach((stylesheetRef) => {
                    _utils.loadStyleSheet(stylesheetRef, document);
                    _utils.loadStyleSheet(stylesheetRef, iframeContainerElement);
                    _utils.loadStyleSheet(stylesheetRef, mobiIframeContainerElement);
                });
            }
            var desktopDonateButton = attachDonateButton(iframeContainerElement, iframeId, { popupId: "kofi-popup-iframe", popupIframeContainerIdSuffix: "popup-iframe-container" }, { maxHeight: 690, minHeight: 400 });
            widgetPageLoadInitiatedStates.push([desktopDonateButton, false]);
            var mobileDonateButton = attachDonateButton(mobiIframeContainerElement, mobiIframeId, { popupId: "kofi-popup-iframe-mobi", popupIframeContainerIdSuffix: "popup-iframe-container-mobi" }, { maxHeight: 690, minHeight: 350 });
            widgetPageLoadInitiatedStates.push([mobileDonateButton, false]);
            insertPopupHtmlIntoBody(
                desktopDonateButton,
                {
                    popupId: "kofi-popup-iframe",
                    popupClass: "floating-chat-kofi-popup-iframe",
                    noticeClass: "floating-chat-kofi-popup-iframe-notice",
                    closerClass: "floating-chat-kofi-popup-iframe-closer",
                    popupIframeContainerClass: "floating-chat-kofi-popup-iframe-container",
                    popupIframeContainerIdSuffix: "popup-iframe-container",
                    popuupKofiIframeHeightOffset: 42,
                },
                parentElementId
            );
            insertPopupHtmlIntoBody(
                mobileDonateButton,
                {
                    popupId: "kofi-popup-iframe-mobi",
                    popupClass: "floating-chat-kofi-popup-iframe-mobi",
                    noticeClass: "floating-chat-kofi-popup-iframe-notice-mobi",
                    closerClass: "floating-chat-kofi-popup-iframe-closer-mobi",
                    popupIframeContainerClass: "floating-chat-kofi-popup-iframe-container-mobi",
                    popupIframeContainerIdSuffix: "popup-iframe-container-mobi",
                    popuupKofiIframeHeightOffset: 100,
                },
                parentElementId
            );
        };
        function activateKofiIframe(iframeId, selectors, heightLimits) {
            var iframeContainerElement = document.getElementById(iframeId).contentDocument;
            const donateButton = iframeContainerElement.getElementById(`${getButtonId()}`);
            const kofiIframeState = donateButton.classList.contains("closed") ? "open" : "close";
            toggleKofiIframe(iframeId, kofiIframeState, donateButton, selectors, heightLimits);
        }
        function updateClass(element, oldClass, newClass) {
            if (oldClass !== "") {
                element.classList.remove(oldClass);
            }
            if (newClass !== "") {
                element.classList.add(newClass);
            }
        }
        function slidePopupOpen(popup, finalHeight) {
            popup.style = `z-index:10000;height: ${finalHeight}px!important; transition: all 0.3s ease 0s; opacity:1;`;
        }
        function closePopup(popup, donateButton) {
            popup.style = "height: 0px; transition: all 0.3s ease 0s; opacity:0;";
            updateClass(donateButton, "open", "closed");
        }
        function insertPopupHtmlIntoBody(donateButton, selectors, parentElementId) {
            var popupId = _configManager.getValue(_myType, "cssId") + `-${selectors.popupId}`;
            var popup = document.createElement("div");
            popup.id = popupId;
            popup.classList = selectors.popupClass;
            popup.style = `z-index:10000;height: 0px; opacity: 0; transition: all 0.3s ease 0s;`;
            if (parentElementId) {
                document.getElementById(parentElementId).appendChild(popup);
            } else {
                document.body.appendChild(popup);
            }
            var notice = document.createElement("div");
            notice.classList = selectors.noticeClass;
            var noticeText = _configManager.getValue(_myType, "notice.text");
            var pageId = _configManager.getValue(_myType, "pageId", true);
            noticeText = noticeText.replace("%HANDLE%", pageId);
            handleLink = document.createElement("a");
            handleLink.setAttribute("href", "https://" + noticeText);
            handleLink.setAttribute("target", "_blank");
            handleLink.setAttribute("class", "kfds-text-is-link-dark");
            linkText = document.createTextNode(noticeText);
            handleLink.appendChild(linkText);
            notice.appendChild(handleLink);
            popup.appendChild(notice);
            var closer = document.createElement("div");
            var closerContent = document.createElement("span");
            closerContent.innerHTML = _configManager.getValue(_myType, "closer", true);
            closer.appendChild(closerContent);
            closer.classList = selectors.closerClass;
            closer.addEventListener("click", function (event) {
                closePopup(popup, donateButton);
            });
            popup.appendChild(closer);
            var popupIFrameContainer = document.createElement("div");
            popupIFrameContainer.classList = selectors.popupIframeContainerClass;
            popupIFrameContainer.style = "height:100%";
            popupIFrameContainer.id = popupId + selectors.popupIframeContainerIdSuffix;
            popup.appendChild(popupIFrameContainer);
        }
        function toggleKofiIframe(iframeId, state, donateButton, selectors, heightLimits) {
            var popupId = _configManager.getValue(_myType, "cssId") + `-${selectors.popupId}`;
            var existingPopup = document.getElementById(popupId);
            if (state === "open") {
                var iframeContainerParent = document.getElementById(iframeId).parentElement;
                var finalHeight = window.innerHeight - (window.innerHeight - iframeContainerParent.offsetTop) - 60;
                if (finalHeight > heightLimits.maxHeight) {
                    finalHeight = heightLimits.maxHeight;
                } else if (finalHeight < heightLimits.minHeight) {
                    finalHeight = heightLimits.minHeight;
                }
                var widgetPageLoadStateIndex = widgetPageLoadInitiatedStates.findIndex(function (s) {
                    return s[0] == donateButton;
                });
                var widgetPageLoadInitiated = widgetPageLoadInitiatedStates[widgetPageLoadStateIndex][1];
                if (!widgetPageLoadInitiated) {
                    var popupIFrameContainerId = popupId + selectors.popupIframeContainerIdSuffix;
                    _utils.loadKofiIframe(_configManager.getValue(_myType, "pageId", true), popupIFrameContainerId, "width: 100%; height: 98%;");
                    widgetPageLoadInitiatedStates[widgetPageLoadStateIndex] = [donateButton, true];
                }
                slidePopupOpen(existingPopup, finalHeight);
                updateClass(donateButton, "closed", "open");
                closeButtonActionBlocked = true;
                setTimeout(function () {
                    closeButtonActionBlocked = false;
                }, 1000);
            }
        }
        var getHtml = function () {
            var donateButtonImage = _configManager.getValue(_myType, "donatebutton.image");
            var donateButtonBackgroundColor = _configManager.getValue(_myType, "donateButton.background-color");
            var donateButtonCTAText = _configManager.getValue(_myType, "donateButton.text");
            var donateButtonTextColor = _configManager.getValue(_myType, "donateButton.text-color");
            var body =
                "<style> .hiddenUntilReady { display: none; } </style>" +
                `<div id="${getButtonId()}" class="hiddenUntilReady closed floatingchat-donate-button" style="z-index:10000; background-color: ${donateButtonBackgroundColor};">` +
                `<img id="${getButtonImageId()}" src="${donateButtonImage}" class="kofiimg" data-rotation="0" />` +
                `<span style="margin-left: 8px; color:${donateButtonTextColor}">${donateButtonCTAText}</span>`;
            ("</div>");
            return body;
        };
        return { getHtml: getHtml, write: write };
    };
var kofiWidgetOverlayConstants = kofiWidgetOverlayConstants || {
    optionKeys: { root: "root", widgetType: "type", pageId: "pageId", ctaText: "ctaText", donateButtonStyle: "donateButtonStyle", ctaTextStyle: "ctaTextStyle", cssId: "cssid" },
    kofiRoot: "https://ko-fi.com/",
    paymentModalId: "paymentModal",
};
var kofiWidgetOverlayUtilities =
    kofiWidgetOverlayUtilities ||
    function () {
        const uuidv4 = function () {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
        };
        const debounce = function (debounceRef, callback) {
            if (debounceRef === null) {
                debounceRef = setTimeout(function () {
                    clearTimeout(debounceRef);
                    debounceRef = null;
                    callback();
                }, 100);
            }
        };
        const loadKofiIframe = function (pageId, parentElementId, iframeStyle) {
            var _iframeLoading = false;
            var _iframeDebounce = null;
            var _showFeed = false;
            const tryLoad = function () {
                if (!_iframeLoading) {
                    _iframeLoading = true;
                    let url = kofiWidgetOverlayConstants.kofiRoot + pageId + "/?hidefeed=true&widget=true&embed=true";
                    if (_showFeed) {
                        url = kofiWidgetOverlayConstants.kofiRoot + pageId + "/?widget=true&embed=true";
                    }
                    const iframe = document.createElement("iframe");
                    const parentElement = document.getElementById(parentElementId);
                    iframe.src = url;
                    iframe.style = iframeStyle;
                    parentElement.appendChild(iframe);
                } else {
                    debounce(_iframeDebounce, tryLoad);
                }
            };
            tryLoad();
        };
        const getWindowHeightRatio = function () {
            return window.outerHeight / 100;
        };
        const getWindowWidthRatio = function () {
            return window.outerWidth / 100;
        };
        const mergeOptions = function (optionSetA, optionSetB) {
            for (var property in optionSetA) {
                if (optionSetA.hasOwnProperty(property)) {
                    optionSetA[property] = optionSetB[property] !== undefined ? optionSetB[property] : optionSetA[property];
                }
            }
        };
        const getConfigManager = function (config) {
            return new (function () {
                var _tokens = [];
                const getValue = function (overlayType, key, isCore) {
                    const coreElement = isCore ? ".core" : "";
                    const configKey = `${overlayType}${coreElement}.${key}`;
                    if (config[configKey] !== undefined) {
                        var configdata = config[configKey];
                        if (_tokens.length > 0) {
                            _tokens.forEach((t) => {
                                configdata = configdata.replace(t.token, t.value);
                            });
                        }
                        return configdata;
                    }
                    return "";
                };
                const setToken = function (token, value) {
                    _tokens.push({ token: token, value: value });
                };
                const clearTokens = function () {
                    _tokens = [];
                };
                return { getValue: getValue, setToken: setToken, clearTokens: clearTokens };
            })();
        };
        const loadStyleSheet = function (styleSheetHref, targetDocument) {
            var docHead = targetDocument.head;
            if (!docHead) {
                docHead = targetDocument.createElement("head");
                targetDocument.prepend(docHead);
            }
            var styleSheet = targetDocument.querySelectorAll('[href="' + styleSheetHref + '"]');
            if (styleSheet.length === 0) {
                var sslink = targetDocument.createElement("link");
                sslink.href = styleSheetHref;
                sslink.rel = "stylesheet";
                sslink.type = "text/css";
                docHead.append(sslink);
            }
        };
        return {
            uuidv4: uuidv4,
            debounce: debounce,
            loadKofiIframe: loadKofiIframe,
            getWindowHeightRatio: getWindowHeightRatio,
            getWindowWidthRatio: getWindowWidthRatio,
            mergeOptions: mergeOptions,
            getConfigManager: getConfigManager,
            loadStyleSheet: loadStyleSheet,
        };
    };
var kofiWidgetOverlay =
    kofiWidgetOverlay ||
    (function () {
        const _utils = new kofiWidgetOverlayUtilities();
        var isFirstRender = true;
        var parentButtonWrapperId = null;
        var _root = "";
        var _buildStrategy = {
            "floating-chat": {
                src: _root + "kofi-widget-overlay-floating-chat-builder.js",
                write: function (parentId, config, utils) {
                    return new kofiWidgetOverlayFloatingChatBuilder(config, utils).write(parentId);
                },
                getBody: function (config, utils) {
                    return new kofiWidgetOverlayFloatingChatBuilder(config, utils).getHtml();
                },
                id: "kofi-widget-overlay-ribbon-builder",
            },
        };
        function getBuilder(widgetType) {
            var buildStrategy = _buildStrategy[widgetType] === undefined ? "empty" : widgetType;
            var builder = _buildStrategy[buildStrategy];
            return builder;
        }
        const doWrite = function (builder, instanceId, config) {
            var finalConfig = JSON.parse(JSON.stringify(kofiWidgetOverlayConfig));
            _utils.mergeOptions(finalConfig, config);
            builder.write(instanceId, finalConfig, _utils);
        };
        const setConfigDefaults = function (config, widgetType, pId, instanceId) {
            config[widgetType + ".core.pageId"] = pId;
            config[widgetType + ".cssId"] = config[widgetType + ".cssId"] !== undefined && config[widgetType + ".cssId"] !== "" ? config[widgetType + ".cssId"] : instanceId;
            config[widgetType + ".stylesheets"] = config[widgetType + ".stylesheets"] !== undefined ? config[widgetType + ".stylesheets"] : '["https://fonts.googleapis.com/css?family=Nunito:400,700,800&display=swap"]';
            return config;
        };
        const draw = function (pId, config, containerId) {
            if (isFirstRender) {
                parentButtonWrapperId = "kofi-widget-overlay-" + _utils.uuidv4();
                if (containerId != null) {
                    document.getElementById(containerId).innerHTML += `<div id="${parentButtonWrapperId}"></div>`;
                } else {
                    var div = document.createElement("div");
                    div.setAttribute("id", parentButtonWrapperId);
                    document.body.appendChild(div);
                }
                isFirstRender = false;
            }
            var widgetType = config[kofiWidgetOverlayConstants.optionKeys.widgetType];
            config = setConfigDefaults(config, widgetType, pId, parentButtonWrapperId);
            var builder = getBuilder(widgetType);
            if (containerId != null) {
                doWrite(builder, containerId, config);
            } else {
                doWrite(builder, parentButtonWrapperId, config);
            }
        };
        return { draw: draw };
    })();
