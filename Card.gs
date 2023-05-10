function homepageCard(e, translatedText) {
  let sourceLanguageObj = config.sourceLanguage;
  let targetLanguageObj = config.targetLanguage;

  let cardSection1DecoratedText1Icon1 = CardService.newIconImage()
    .setIconUrl(config.translateIcon)
    .setAltText('Translate Icon');

  let cardSection1DecoratedText1 = CardService.newDecoratedText()
    .setText('Language Translator')
    .setStartIcon(cardSection1DecoratedText1Icon1);

  let cardSection1Divider1 = CardService.newDivider();

  let cardSection1TextInput1 = CardService.newTextInput()
    .setFieldName('content')
    .setTitle('Enter text you want to convert')
    .setMultiline(true);

  let cardSection1SelectionInput1;

  cardSection1SelectionInput1 = CardService.newSelectionInput()
    .setFieldName('source')
    .setTitle('Source language')
    .setType(CardService.SelectionInputType.DROPDOWN);

  sourceLanguageObj.forEach((elem) => {
    cardSection1SelectionInput1.addItem(elem.language, elem.code, false);
  })

  let cardSection1SelectionInput2;

  cardSection1SelectionInput2 = CardService.newSelectionInput()
    .setFieldName('target')
    .setTitle('Target language')
    .setType(CardService.SelectionInputType.DROPDOWN);

  targetLanguageObj.forEach((elem) => {
    cardSection1SelectionInput2.addItem(elem.language, elem.code, false);
  })

  let cardSection1Divider2 = CardService.newDivider();

  let cardSection1ButtonList1Button1Action1 = CardService.newAction()
    .setFunctionName('onTranslateBtn');

  let cardSection1ButtonList1Button1 = CardService.newTextButton()
    .setText('Translate')
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
    .setOnClickAction(cardSection1ButtonList1Button1Action1);

  let cardSection1ButtonList1 = CardService.newButtonSet()
    .addButton(cardSection1ButtonList1Button1);

  let cardSection1TextInput2;

  if (translatedText) {
    cardSection1TextInput2 = CardService.newTextInput()
      .setFieldName('translatedText')
      .setValue(translatedText)
      .setTitle('Translated Text')
      .setMultiline(true)
  }

  let cardSection1 = CardService.newCardSection()
    .addWidget(cardSection1DecoratedText1)
    .addWidget(cardSection1Divider1)
    .addWidget(cardSection1TextInput1)
    .addWidget(cardSection1SelectionInput1)
    .addWidget(cardSection1SelectionInput2)
    .addWidget(cardSection1Divider2)
    .addWidget(cardSection1ButtonList1);

  if (translatedText) {
    cardSection1.addWidget(cardSection1Divider1)
    cardSection1.addWidget(cardSection1TextInput2)
  }

  let card = CardService.newCardBuilder()
    .addSection(cardSection1)
    .build();
  return card;
}

function onTranslateBtn(e) {
  const sourceLanguage = e.formInput.source;
  const targetLanguage = e.formInput.target;
  const contentText = e.formInput.content;

  if (!contentText) {
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification()
        .setText("Please enter text you want to convert"))
      .build();
  } else if (sourceLanguage == targetLanguage) {
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification()
        .setText("Source and target language must be different"))
      .build();
  }

  let translatedText = LanguageApp.translate(contentText, sourceLanguage, targetLanguage);

  if (translatedText) {
    let nav = CardService.newNavigation().updateCard(homepageCard(e, translatedText));
    return CardService.newActionResponseBuilder()
      .setNavigation(nav)
      .build();
  }
}