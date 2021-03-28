# MultiLanguageJS
MultiLanguageJS is a JavaScript library that provides multi-language support for your web application with the using text, XML or JSON.

# Installation
Include the compiled files in your page.
```html
<script src="multilanguage.es5.js"></script>
```

# Usage
You can use Json String, Json Object and XML String data types to language convertion.

```html
  <!--
        XML Data Example
        -----------------------------------------------------------
        <?xml version='1.0' encoding='UTF-8'?>
        <languages>
            <Hello data-lang='tr-TR'>Merhaba</Hello>
            <UserName data-lang='tr-TR'>Kullanıcı Adı</UserName>
        </languages>
       

        JSON Data Example
        ------------------------------------------------------------
        [
            {"Hello":"Merhaba","lang":"tr-TR"},
            {"UserName":"Kullanıcı Adı","lang":"tr-TR"}
        ]
       
    --> 
```
Example of JSON Object Usage

```javascript
      var languageDataList = [
            { Hello:"Merhaba {0}.{sehir} şehrinden bağlanıyorsunuz.{1} yaşındasınız",lang:"tr-TR"},
            { UserName:"Kullanıcı Adı {0} Son Giriş: {1}",lang:"tr-TR" },
            { welcome: "Hoş Geldiniz", lang:"tr-TR"},
            { Hello:"Hello {0}. You are connecting from {sehir} city. You are {1} years old.",lang:"en-GB"},
            { UserName:"Username {0} Last Login: {1}",lang:"en-GB" },
            { welcome: "Welcome", lang:"en-GB"},
            { GoodMorning:"Günaydın", lang:"tr-TR"},
            { GoodMorning:"Good Morning", lang:"en-GB"}
        ];

        var language = new MultipleLanguage();
        language.AppendLanguage(languageDataList);
```
Example of XML Usage
```javascript
      var languageDataListXmlString = "<?xml version='1.0' encoding='UTF-8'?><languages><Hello data-lang='tr-TR'>Merhaba {0}.{sehir} şehrinden bağlanıyorsunuz.{1} yaşındasınız</Hello> <UserName data-lang='tr-TR'>Kullanıcı Adı {0} Son Giriş: {1}</UserName><welcome data-lang='tr-TR'>Hoş Geldiniz</welcome><Hello data-lang='en-GB'>Hello {0}. You are connecting from {sehir} city. You are {1} years old.</Hello> <UserName data-lang='en-GB'>Username {0} Last Login: {1}</UserName><welcome data-lang='en-GB'>Welcome</welcome></languages>";
      var language = new MultipleLanguage();
      language.AppendLanguage(languageDataListXmlString);
```

Don't forget to specify default language. Otherwise, language library will not work.
```javascript
   language.SetLanguage("en-GB"); // Default language specification
   language.SetLanguageElements(); // To view the selected language
```
> We developed html-tag structure for your comfortable coding. Define a keyword for each data element. and use data-{keyword} notation.


Add an Attribute named Data-Lang to any HTML tag and type the keyword you will translate its value.

```html
<div data-lang="GoodMorning"></div>
```

 If you are using html tag option and you have dynamic parameters in your data, use data-lang-{paramName} notation to text replace operation like string.Format Syntax
```javascript
 var languageDataList = [
            { Hello:"Merhaba {0}.{sehir} şehrinden bağlanıyorsunuz.{1} yaşındasınız",lang:"tr-TR"},
            { UserName:"Kullanıcı Adı {0} Son Giriş: {1}",lang:"tr-TR" }
  ]; // sample data
```
You need to use following html structure for above scenairo
```html
<div data-lang="Hello" data-lang-param-0="Fatih" data-lang-param-1="30" data-lang-param-sehir="Trabzon"></div>
<span data-lang="UserName" data-lang-param-0="Radley" data-lang-param-1="10.10.2010 16:30"></span>
```

Also, you can get values with using javascript.
```javascript
var getExampleData = language.lang.GoodMorning;
```

or

```javascript
var getExampleData = language.lang['GoodMorning'];
```

If you have dynamic data, you can use the <b>mlFormat()</b> and <b>mlObjectFormat()</b> prototype. 

Use <b>mlFormat()</b> for ordinal number specifications.
```javascript
var getExampleData = language.lang.UserName.mlFormat("Radley","10.10.2010 15:40");
```

Use <b>mlObjectFormat()</b> for others
```javascript
var getExampleData = language.lang["Hello"].mlObjectFormat({ 0:"Fatih", 1:30,sehir:"trabzon"} );
```
