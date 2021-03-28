# MultiLanguageJS
XML or JSON is a JavaScript library that provides multi-language support to your web application with the text format.

# Installation
Include the compiled files in your page.
```html
<script src="multilanguage.es5.js"></script>
```

# Usage
The language you will create is enough to have JSON String, JSON Object and XML String data types.

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
Example Let's add data to the JSON Object data type and then add this to the new Multilanguage library we will create it.

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
If we want to create a multilanguage of the XML string data type you can do as follows.
```javascript
      var languageDataListXmlString = "<?xml version='1.0' encoding='UTF-8'?><languages><Hello data-lang='tr-TR'>Merhaba {0}.{sehir} şehrinden bağlanıyorsunuz.{1} yaşındasınız</Hello> <UserName data-lang='tr-TR'>Kullanıcı Adı {0} Son Giriş: {1}</UserName><welcome data-lang='tr-TR'>Hoş Geldiniz</welcome><Hello data-lang='en-GB'>Hello {0}. You are connecting from {sehir} city. You are {1} years old.</Hello> <UserName data-lang='en-GB'>Username {0} Last Login: {1}</UserName><welcome data-lang='en-GB'>Welcome</welcome></languages>";
      var language = new MultipleLanguage();
      language.AppendLanguage(languageDataListXmlString);
```

After. By default, you must specify the language you will display on the page and then use the <b>SetLanguageElements()</b> prototype. Otherwise, the language selected on your page will not be displayed.
```javascript
   language.SetLanguage("en-GB"); // Specifies the default language.
   language.SetLanguageElements(); // Allows you to view the selected language.
```
> After making all of these, we need to specify the keywords of the language to the HTML tags we want.


Add an Attribute named Data-Lang to any HTML tag and type the keyword you will translate its value.

```html
<div data-lang="GoodMorning"></div>
```

If a dynamically is a data in the article, we need to specify this as ornate brackets in our object and then specify an Attribute that starts with <b>data-lang-param</b> on the HTML tag.
```javascript
 var languageDataList = [
            { Hello:"Merhaba {0}.{sehir} şehrinden bağlanıyorsunuz.{1} yaşındasınız",lang:"tr-TR"},
            { UserName:"Kullanıcı Adı {0} Son Giriş: {1}",lang:"tr-TR" }
  ]; // sample data
```
The setting of the HTML tag according to the above data is as follows.
```html
<div data-lang="Hello" data-lang-param-0="Fatih" data-lang-param-1="30" data-lang-param-sehir="Trabzon"></div>
<span data-lang="UserName" data-lang-param-0="Radley" data-lang-param-1="10.10.2010 16:30"></span>
```

If you want to assign the data to a variable as javascript, you can do it.
```javascript
var getExampleData = language.lang.GoodMorning;
```

or

```javascript
var getExampleData = language.lang['GoodMorning'];
```

If the language has a dynamic data, you can use the <b>mlFormat()</b> prototype.
```javascript
var getExampleData = language.lang.UserName.mlFormat("Radley","10.10.2010 15:40");
```

However, if your ornate bracket are not a numeric value, you must use the <b>mlObjectFormat()</b> prototype. Otherwise, the <i>mlFormat()</i> will not work the Prototype.

```javascript
var getExampleData = language.lang["Hello"].mlObjectFormat({ 0:"Fatih", 1:30,sehir:"trabzon"} );
```
