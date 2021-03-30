/*
*	MultiLanguageJS
*	Updated On: 29/03/2021
*	By Fatih KAZANCI
*   Licenced By GNU General Public License v3.0
*   https://github.com/fatihkazanci/MultiLanguageJS/blob/main/LICENSE
*/
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, rawPos) {
            var pos = rawPos > 0 ? rawPos|0 : 0;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}

String.prototype.mlFormat = function () {
    var args = arguments;

    return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
        if (m === "{{") { return "{"; }
        if (m === "}}") { return "}"; }
        return args[n];
    });
};

String.prototype.trimRight = function(charlist) {
    if (charlist === undefined)
      charlist = "\s";
  
    return this.replace(new RegExp("[" + charlist + "]+$"), "");
  };

  String.prototype.trimLeft = function(charlist) {
    if (charlist === undefined)
      charlist = "\s";
  
    return this.replace(new RegExp("^[" + charlist + "]+"), "");
  };

var MultipleLanguage = function () {
    this.languages = [];
    this.lang = {};
}

MultipleLanguage.prototype.AppendLanguage = function (dataObject) {
    var objectType = typeof (dataObject);
    var setDataObject = function (jsonObject, baseThis) {
        switch (Array.isArray(jsonObject)) {
            case true:
                {
                    for (let index = 0; index < jsonObject.length; index++) {
                        baseThis.languages.push(jsonObject[index]);
                    }
                }
                break;
            default:
                {
                    baseThis.languages.push(jsonObject);
                }
                break;
        }
    }
    switch (objectType) {
        case "string":
            {
                var jsonObject = undefined;
                try {
                    jsonObject = JSON.parse(dataObject);
                    setDataObject(jsonObject, this);
                } catch (err) {
                    try {
                        var parser = new DOMParser();
                        xmlDoc = parser.parseFromString(dataObject, "text/xml");
                        var newDataObject = [];
                        xmlDoc.getElementsByTagName("languages")[0].childNodes.forEach(function (value, index, currentArray) {
                            var dataName = value.tagName;
                            if (dataName != undefined) {
                                var dataLang = value.attributes["data-lang"].value;
                                var dataValue = value.innerHTML;
                                var newData = {};
                                newData[dataName] = dataValue;
                                newData["lang"] = dataLang;
                                newDataObject.push(newData);
                            }
                        });
                        setDataObject(newDataObject, this);
                    } catch (err) {
                        console.error("MULTIPLELANGUAGE ERROR: Invalid String format");
                    }
                }
            }
            break;
        case "object":
            {
                setDataObject(dataObject, this);
            }
            break;
        default:
            console.error("MULTIPLELANGUAGE ERROR: Invalid Object data");
            break;
    }
}

MultipleLanguage.prototype.SetLanguage = function (langKey) {
    for (let i = 0; i < this.languages.length; i++) {
        var currentLang = this.languages[i].lang;
        if (currentLang == langKey) {
            var keys = Object.keys(this.languages[i]);
            if (keys.length == 2 && this.languages[i].lang != undefined) {
                for (let index = 0; index < keys.length; index++) {
                    if (keys[index] != "lang") {
                        this.lang[keys[index]] = this.languages[i][keys[index]];
                    }
                }
            }
        }
    }
}

String.prototype.mlObjectFormat = function (requestReplaceObject) {
    return this.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        if (m === "{{") { return "{"; }
        if (m === "}}") { return "}"; }
        return requestReplaceObject[n];
    });
};


MultipleLanguage.prototype.SetLanguageElements = function () {
    var allHtmlLanguageElements = document.querySelectorAll('[data-lang]');
    var allStroageAttribute = [];
    for (let index = 0; index < allHtmlLanguageElements.length; index++) {
        var key = allHtmlLanguageElements[index].getAttribute("data-lang");
        if (this.lang[key] != undefined) {
            var allAttributes = allHtmlLanguageElements[index].attributes;
            var params = {};
            for (let attIndex = 0; attIndex < allAttributes.length; attIndex++) {
                var currentAttribute = String(allAttributes[attIndex].name);
                var isParamAttribute = currentAttribute.startsWith("data-lang-param-");
                if(isParamAttribute) {
                    var attributeIndex = currentAttribute.replace("data-lang-param-","");
                    var attributeValue = allAttributes[attIndex].value;
                    params[attributeIndex] = attributeValue;
                    allStroageAttribute.push(currentAttribute);
                }
            }
            var currentLanguageWord = "";
            if(params != undefined && params != "") {
                currentLanguageWord = this.lang[key].mlObjectFormat(params);
            } else {
                currentLanguageWord  = this.lang[key];
            }
            allHtmlLanguageElements[index].innerText = currentLanguageWord;
        } else {
            allHtmlLanguageElements[index].innerText = "{{Language Text Error}}";
        }
        for (let f = 0; f < allStroageAttribute.length; f++) {
            allHtmlLanguageElements[index].removeAttribute(allStroageAttribute[f]);
        }
        allHtmlLanguageElements[index].removeAttribute("data-lang");
    }
}
