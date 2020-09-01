# Contributing

Thanks for your interest in contributing to this project.
There are a few ways you can help:

- [Report a bug](#report-a-bug)
- [Suggest a feature](#suggest-a-feature)
- [Fix a bug](#fix-a-bug)
- [Implement a feature](#implement-a-feature)
- [Translations](#translations)

## Report a bug

Do not hesitate to create an issue if you found a bug.

## Suggest a feature

You can also create an issue if you have an idea on how to improve this project.

## Fix a bug

You can have a look at the existing issues to find bugs that need fixing.
Once you found something, you will have to [create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) with your fix.

Have a look at the [README's installation](./README.md#installation) instructions to get a development version of this project running on your machine.

## Implement a feature

Feature requests also come in the form of issues.
If you find anything of interest, feel free to [create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) with your changes.

Have a look at the [README's installation](./README.md#installation) instructions to get a development version of this project running on your machine.

## Translations

If you want to help and translate the game in your language, here's how you can do it:

1. Follow the instructions on how to [install a development version](./README.md#installation).
2. Create a copy of an existing folder in `src/app/i18n` and translate the messages in `messages.ts`. Note that the `cards.json` file is automatically generated so you don't have to edit it. Regarding the leaders taunts, you can get them from [Gwent.one](https://gwent.one/en/taunts/).
3. Update `src/app/i18n/LocaleContext` (the `SupportedLocale` type and the `SUPPORTED_LOCALES` constant).
4. Add your locale to the script in `scripts/downloadCards.js`.
5. Run the script to fetch the translated cards: `node ./scripts/downloadCards.js`

You should now be able to run the game and use your translations.
Feel free to open an early PR if you're having trouble with anything!
