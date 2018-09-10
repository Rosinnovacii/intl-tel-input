var input,
  iti,
  totalCountries = 243,
  totalDialCodes = 228,
  defaultPreferredCountries = 2;

var intlSetup = function(utilsScript) {
  // by default put us in desktop mode
  window.innerWidth = 1024;

  // this should only run the first time
  if (!window.intlTelInputUtilsBackup) {
    window.intlTelInputUtilsBackup = window.intlTelInputUtils;
  }
  if (utilsScript) {
    window.intlTelInputUtils = window.intlTelInputUtilsBackup;
  } else {
    window.intlTelInputUtils = null;
  }
};

var intlTeardown = function() {
  $("script.iti-load-utils").remove();
  window.intlTelInputGlobals.startedLoadingUtilsScript = false;
  window.intlTelInputGlobals.windowLoaded = false;
  window.intlTelInputGlobals.autoCountry = null;
  window.intlTelInputGlobals.startedLoadingAutoCountry = false;
  // just make sure before we change the ref
  if (!window.intlTelInputUtilsBackup) {
    window.intlTelInputUtilsBackup = window.intlTelInputUtils;
  }
  window.intlTelInputUtils = null;
  if (iti) iti.destroy();
  if (input) input.remove();
  input = iti = null;
};

var getInputVal = function(i) {
  i = i || input;
  return i.val();
};

var getParentElement = function(i) {
  i = i || input;
  return i.parent();
};

var getListElement = function(i) {
  i = i || input;
  return i.parent().find(".country-list");
};

var getListLength = function(i) {
  i = i || input;
  return getListElement(i).find("li.country").length;
};

var getActiveListItem = function(i) {
  i = i || input;
  return getListElement(i).find("li.active");
};

var getPreferredCountriesLength = function(i) {
  i = i || input;
  return getListElement(i).find("li.preferred").length;
};

var getSelectedFlagContainer = function(i) {
  i = i || input;
  return i.parent().find(".selected-flag");
};

var getSelectedFlagElement = function(i) {
  i = i || input;
  return getSelectedFlagContainer(i).find(".iti-flag");
};

var getSelectedDialCodeElement = function(i) {
  i = i || input;
  return getSelectedFlagContainer(i).find(".selected-dial-code");
};

var getFlagsContainerElement = function(i) {
  i = i || input;
  return i.parent().find(".flag-container");
};

var selectFlag = function(countryCode, i) {
  i = i || input;
  getSelectedFlagContainer(i)[0].click();
  getListElement(i).find("li[data-country-code='" + countryCode + "']")[0].click();
};

var openCountryDropDown = function() {
    getSelectedFlagContainer()[0].click();
};

var putCursorAtEnd = function() {
  var len = input.val().length;
  selectInputChars(len, len);
};

var selectInputChars = function(start, end) {
  input[0].setSelectionRange(start, end);
};

var triggerKey = function(el, type, key) {
  var event = new KeyboardEvent(type, { key: key });
  el.dispatchEvent(event);
  return event;
};

// var triggerClick = function(el) {
//   var event = new KeyboardEvent(type, { key: key });
//   el.dispatchEvent(event);
//   return event;
// };

// trigger keydown, then keypress, then add the key, then keyup
var triggerKeyOnInput = function(key) {
  triggerKey(input[0], 'keydown', key);
  var e = triggerKey(input[0], 'keypress', key);
  // insert char
  if (!e.defaultPrevented) {
    var val = input.val(),
      before = val.substr(0, input[0].selectionStart),
      after = val.substring(input[0].selectionEnd, val.length);
    input.val(before + key + after);
  }
  triggerKey(input[0], 'keyup', key);
};

var triggerKeyOnBody = function(key) {
  triggerKey(document, 'keydown', key);
  triggerKey(document, 'keypress', key);
  triggerKey(document, 'keyup', key);
};

var triggerKeyOnFlagsContainerElement = function(key) {
  triggerKey(getFlagsContainerElement()[0], 'keydown', key);
};
